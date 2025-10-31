# services/energy_services.py
# --------------------------------------------------
# ✅ This version is ready to plug into main.py
# --------------------------------------------------

from fastapi import APIRouter, HTTPException
from influxdb_client import InfluxDBClient
from influxdb_client.client.exceptions import InfluxDBError

# --------------------------------------------------
# Create a router instead of FastAPI app
# --------------------------------------------------
router = APIRouter(
    prefix="/energy",            # all routes will start with /energy/...
    tags=["Energy Monitoring"]   # shows as a group in Swagger docs
)

# --------------------------------------------------
# InfluxDB configuration
# --------------------------------------------------
INFLUXDB_URL = "http://124.43.179.232:8086"
INFLUXDB_TOKEN = "_phPfq5OJuhlioGMcerZSyRqkCAuksGThcxHIV3H_D-J-ru8Eww5s0iq_CFTt46zWJ-g4iYFA6e__IXcYyetXQ=="
INFLUXDB_ORG = "SLT"
INFLUXDB_BUCKET = "3F Energy Monitoring"

client = None

def get_influxdb_client():
    """Get or create an InfluxDB client"""
    global client
    if client is None:
        try:
            client = InfluxDBClient(
                url=INFLUXDB_URL,
                token=INFLUXDB_TOKEN,
                org=INFLUXDB_ORG,
                timeout=10000
            )
            health = client.health()
            if health.status != "pass":
                raise Exception(f"InfluxDB health check failed: {health.status}")
        except Exception as e:
            raise HTTPException(status_code=503, detail=f"Failed to connect to InfluxDB: {str(e)}")
    return client


def get_data_with_range(range_expr):
    """Get data with a specific range expression"""
    db_client = get_influxdb_client()
    try:
        query = f'from(bucket: "{INFLUXDB_BUCKET}") |> range(start: {range_expr})'
        result = db_client.query_api().query(org=INFLUXDB_ORG, query=query)
        grouped_data = {}
        for table in result:
            for record in table.records:
                time = record.get_time()
                field = record.get_field()
                value = record.get_value()
                if time not in grouped_data:
                    grouped_data[time] = {"time": time.isoformat()}
                grouped_data[time][field] = value
        return {"data": list(grouped_data.values())}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying InfluxDB: {str(e)}")


# --------------------------------------------------
# Routes (Endpoints)
# --------------------------------------------------

@router.get("/LiveData")
async def get_data():
    return get_data_with_range("-15m")

@router.get("/HourlyData")
async def get_hourly_data():
    return get_data_with_range("-24h")

@router.get("/DailyData")
async def get_daily_data():
    return get_data_with_range("-7d")

@router.get("/Weekly")
async def get_weekly_data():
    return get_data_with_range("-30d")

@router.get("/Monthly")
async def get_monthly_data():
    return get_data_with_range("-90d")

@router.get("/Yearly")
async def get_yearly_data():
    return get_data_with_range("-365d")


@router.get("/ChartData/{timeframe}")
async def get_chart_data(timeframe: str, measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    """Get PUE, Total load, IT load, and AC load data for charts"""
    range_map = {
        "Live": "-15m", "Hourly": "-24h", "Daily": "-7d",
        "Weekly": "-30d", "Monthly": "-90d", "Yearly": "-365d"
    }
    range_expr = range_map.get(timeframe, "-1h")
    db_client = get_influxdb_client()
    try:
        flux_query = f"""
        from(bucket: "{INFLUXDB_BUCKET}")
            |> range(start: {range_expr})
            |> filter(fn: (r) => r["_measurement"] == "{measurement}"
                            and (r["_field"] == "pue"
                                or r["_field"] == "Total_load"
                                or r["_field"] == "IT_load"
                                or r["_field"] == "AC_load"))
            |> keep(columns: ["_time", "_field", "_value"])
        """
        result = db_client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
        processed_data = {"pue": [], "totalLoad": [], "itLoad": [], "acLoad": []}
        for table in result:
            for record in table.records:
                data_point = {"time": record.get_time().isoformat(), "value": record.get_value()}
                if record.get_field() == "pue":
                    processed_data["pue"].append(data_point)
                elif record.get_field() == "Total_load":
                    processed_data["totalLoad"].append(data_point)
                elif record.get_field() == "IT_load":
                    processed_data["itLoad"].append(data_point)
                elif record.get_field() == "AC_load":
                    processed_data["acLoad"].append(data_point)
        return processed_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying InfluxDB: {str(e)}")


@router.get("/CarbonAndTariff/{timeframe}")
async def get_carbon_and_tariff(timeframe: str, measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    """Get carbon emission and tariff data for charts"""
    range_map = {
        "Live": "-15m", "Hourly": "-24h", "Daily": "-7d",
        "Weekly": "-30d", "Monthly": "-90d", "Yearly": "-365d"
    }
    range_expr = range_map.get(timeframe, "-1h")
    db_client = get_influxdb_client()
    try:
        flux_query = f"""
        from(bucket: "{INFLUXDB_BUCKET}")
            |> range(start: {range_expr})
            |> filter(fn: (r) => r["_measurement"] == "{measurement}")
            |> filter(fn: (r) => r["_field"] == "tariff" or r["_field"] == "CarbonEmission" or r["_field"] == "kWh")
            |> keep(columns: ["_time", "_field", "_value"])
        """
        result = db_client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
        processed_data = {"carbonEmission": [], "tariff": [], "energyConsumption": []}
        for table in result:
            for record in table.records:
                data_point = {"time": record.get_time().isoformat(), "value": record.get_value()}
                if record.get_field() == "CarbonEmission":
                    processed_data["carbonEmission"].append(data_point)
                elif record.get_field() == "tariff":
                    processed_data["tariff"].append(data_point)
                elif record.get_field() == "kWh":
                    processed_data["energyConsumption"].append(data_point)
        return processed_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying InfluxDB: {str(e)}")


@router.get("/EnergyDistribution/{timeframe}")
async def get_energy_distribution(timeframe: str, measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    """Get energy distribution data for pie charts"""
    range_map = {
        "Live": "-15m", "Hourly": "-24h", "Daily": "-7d",
        "Weekly": "-30d", "Monthly": "-90d", "Yearly": "-365d"
    }
    range_expr = range_map.get(timeframe, "-1h")
    db_client = get_influxdb_client()
    try:
        flux_query = f"""
        from(bucket: "{INFLUXDB_BUCKET}")
            |> range(start: {range_expr})
            |> filter(fn: (r) => r["_measurement"] == "{measurement}")
            |> filter(fn: (r) => r["_field"] == "IT_load" or r["_field"] == "AC_load" or r["_field"] == "Total_load")
            |> last()
        """
        result = db_client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
        it_load = ac_load = total_load = 0
        for table in result:
            for record in table.records:
                field = record.get_field()
                value = record.get_value()
                if field == "IT_load":
                    it_load = value
                elif field == "AC_load":
                    ac_load = value
                elif field == "Total_load":
                    total_load = value
        other_systems = max(total_load - (it_load + ac_load), 0)
        return {"energyDistribution": [
            {"name": "IT Load", "value": it_load},
            {"name": "AC Load", "value": ac_load},
            {"name": "Other Systems", "value": other_systems}
        ]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying InfluxDB: {str(e)}")


@router.get("/health")
async def health_check():
    """API health check endpoint"""
    try:
        db_client = get_influxdb_client()
        health = db_client.health()
        return {
            "status": "healthy",
            "database": "connected",
            "influxdb_status": health.status,
            "mode": "production"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e),
            "mode": "production"
        }
