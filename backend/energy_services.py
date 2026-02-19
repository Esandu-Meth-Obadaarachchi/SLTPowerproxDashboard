# services/energy_services.py

from fastapi import APIRouter, HTTPException
from influxdb_client import InfluxDBClient
from influxdb_client.client.exceptions import InfluxDBError
import logging
from datetime import datetime, timedelta


# Set up logging for better debugging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/energy",            # all routes will start with /energy/...
    tags=["Energy Monitoring"]   # shows as a group in Swagger docs
)

# --------------------------------------------------
# InfluxDB Configuration
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
            logger.error(f"InfluxDB Connection Error: {str(e)}")
            raise HTTPException(status_code=503, detail="Energy Database unavailable")
    return client

# --------------------------------------------------
# Dynamic Timeframe Settings (The Fix)
# --------------------------------------------------
# We define total minutes for each range so we can calculate a dynamic window.
# Logic: Window Size = Total Minutes / 20.
TIMEFRAME_SETTINGS = {
    "Live":    {"range_str": "-15m",  "total_min": 15},     # ~45s window
    "Hourly":  {"range_str": "-24h",  "total_min": 1440},   # ~72m window
    "Daily":   {"range_str": "-7d",   "total_min": 10080},  # ~8.4h window
    "Weekly":  {"range_str": "-30d",  "total_min": 43200},  # ~36h window
    "Monthly": {"range_str": "-90d",  "total_min": 129600}, # ~4.5d window
    "Yearly":  {"range_str": "-365d", "total_min": 525600}  # ~18d window
}

# --------------------------------------------------
# Helper Functions
# --------------------------------------------------

async def get_raw_data_for_frontend(timeframe, measurement):
    """
    Fetches data from InfluxDB using dynamic aggregation to ensure ~20 points.
    Returns data in the format the Frontend's processApiData expects (flat array).
    """
    settings = TIMEFRAME_SETTINGS.get(timeframe, TIMEFRAME_SETTINGS["Live"])
    db_client = get_influxdb_client()
    
    # ✅ DYNAMIC AGGREGATION CALCULATION
    # Ensure we don't divide by zero or have windows < 1s
    total_min = max(settings["total_min"], 1) 
    window_min = int(total_min / 20)
    
    # Use 's' for seconds if window is small (like in Live view), otherwise 'm'
    if window_min < 1:
        # Fallback for very short durations (e.g. 15 mins / 20 = 0.75 min = 45s)
        window_seconds = int((total_min * 60) / 20)
        window_str = f"{window_seconds}s"
    else:
        window_str = f"{window_min}m"

    try:
        flux_query = f"""
        from(bucket: "{INFLUXDB_BUCKET}")
            |> range(start: {settings['range_str']})
            |> filter(fn: (r) => r["_measurement"] == "{measurement}")
            |> filter(fn: (r) => r["_field"] == "pue" or r["_field"] == "Total_load" or r["_field"] == "IT_load" or r["_field"] == "AC_load")
            |> aggregateWindow(every: {window_str}, fn: mean, createEmpty: false)
            |> yield(name: "mean")
        """
        
        result = db_client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
        
        # Flatten the data: Group by time to match the frontend's expectation
        grouped_data = {}
        for table in result:
            for record in table.records:
                time_str = record.get_time().isoformat()
                if time_str not in grouped_data:
                    grouped_data[time_str] = {"time": time_str}
                # The frontend specifically looks for keys: IT_load, AC_load, Total_load
                val = record.get_value()
                grouped_data[time_str][record.get_field()] = round(val, 3) if val is not None else 0
                
        # Return as list of objects, sorted by time
        return sorted(list(grouped_data.values()), key=lambda x: x['time'])
        
    except Exception as e:
        logger.error(f"Error querying InfluxDB: {str(e)}")
        # Return empty list on error so frontend doesn't crash
        return []

# In energy_services.py

async def get_carbon_tariff_data(timeframe, measurement):
    """
    Specific helper for Carbon and Tariff endpoints.
    FIX: Calculates Carbon and Energy from 'Total_load' if specific fields are missing.
    """
    settings = TIMEFRAME_SETTINGS.get(timeframe, TIMEFRAME_SETTINGS["Live"])
    db_client = get_influxdb_client()
    
    # Dynamic window calculation
    total_min = max(settings["total_min"], 1) 
    window_min = int(total_min / 20)
    if window_min < 1:
         window_str = f"{int((total_min * 60) / 20)}s"
    else:
         window_str = f"{window_min}m"

    # ✅ FIX: Fetch 'Total_load' along with 'tariff'
    flux_query = f"""
    from(bucket: "{INFLUXDB_BUCKET}")
        |> range(start: {settings['range_str']})
        |> filter(fn: (r) => r["_measurement"] == "{measurement}")
        |> filter(fn: (r) => r["_field"] == "tariff" or r["_field"] == "Total_load") 
        |> aggregateWindow(every: {window_str}, fn: mean, createEmpty: false)
    """
    
    try:
        result = db_client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
        processed = {"carbonEmission": [], "tariff": [], "energyConsumption": []}
        
        # Configuration constants (matched from your dataProcessing.js)
        CARBON_FACTOR = 0.25
        
        for table in result:
            for record in table.records:
                val = record.get_value()
                # Rounding for clean UI
                clean_val = round(val, 2) if val is not None else 0
                time_val = record.get_time().isoformat()
                
                field = record.get_field()
                
                # 1. Tariff: Use direct DB value
                if field == "tariff":
                    processed["tariff"].append({"time": time_val, "value": clean_val})
                
                # 2. Total_load: Use this to DERIVE Carbon and Energy
                elif field == "Total_load":
                    # Energy Consumption (Live view typically shows Load profile in KW)
                    processed["energyConsumption"].append({"time": time_val, "value": clean_val})
                    
                    # Carbon Emission calculation
                    processed["carbonEmission"].append({
                        "time": time_val, 
                        "value": round(clean_val * CARBON_FACTOR, 3)
                    })
                
        # Sort data to ensure chronological order
        for key in processed:
            processed[key].sort(key=lambda x: x["time"])
                
        return processed
    except Exception as e:
        logger.error(f"Error querying Carbon/Tariff: {str(e)}")
        return {"carbonEmission": [], "tariff": [], "energyConsumption": []}


# Yearly Report Data Fetching

async def get_yearly_export_data(measurement, export_type):
    """
    Export last 365 days, DAILY resolution
    export_type: operational | tariff | live
    """
    db_client = get_influxdb_client()
    start_date = (datetime.utcnow() - timedelta(days=365)).isoformat() + "Z"

    if export_type == "operational":
        fields = '"pue" or r["_field"] == "Total_load"'
    elif export_type == "tariff":
        fields = '"tariff" or r["_field"] == "Total_load"'
    else:  # live
        fields = '"IT_load" or r["_field"] == "AC_load" or r["_field"] == "Total_load"'

    flux_query = f"""
    from(bucket: "{INFLUXDB_BUCKET}")
        |> range(start: time(v: "{start_date}"))
        |> filter(fn: (r) => r["_measurement"] == "{measurement}")
        |> filter(fn: (r) => r["_field"] == {fields})
        |> aggregateWindow(every: 1d, fn: mean, createEmpty: false)
    """

    result = db_client.query_api().query(org=INFLUXDB_ORG, query=flux_query)

    daily = {}

    for table in result:
        for record in table.records:
            date = record.get_time().date().isoformat()
            if date not in daily:
                daily[date] = {"date": date}

            daily[date][record.get_field()] = round(record.get_value() or 0, 2)

    return sorted(daily.values(), key=lambda x: x["date"])


# --------------------------------------------------
# API Routes (Endpoints)
# --------------------------------------------------

# 1. Frontend-Compatible "ChartData" endpoints (Legacy Names)
@router.get("/LiveData")
async def get_live_data(measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    data = await get_raw_data_for_frontend("Live", measurement)
    return {"data": data}

@router.get("/HourlyData")
async def get_hourly_data(measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    data = await get_raw_data_for_frontend("Hourly", measurement)
    return {"data": data}

@router.get("/DailyData")
async def get_daily_data(measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    data = await get_raw_data_for_frontend("Daily", measurement)
    return {"data": data}

@router.get("/Weekly")
async def get_weekly_data(measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    data = await get_raw_data_for_frontend("Weekly", measurement)
    return {"data": data}

@router.get("/Monthly")
async def get_monthly_data(measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    data = await get_raw_data_for_frontend("Monthly", measurement)
    return {"data": data}

@router.get("/Yearly")
async def get_yearly_data(measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    data = await get_raw_data_for_frontend("Yearly", measurement)
    return {"data": data}


# 2. Specific Data Endpoints
@router.get("/CarbonAndTariff/{timeframe}")
async def get_carbon_and_tariff(timeframe: str, measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    return await get_carbon_tariff_data(timeframe, measurement)


@router.get("/EnergyDistribution/{timeframe}")
async def get_energy_distribution(timeframe: str, measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    """
    Pie charts don't need history, just the current/latest state.
    We use 'last()' instead of aggregation.
    """
    settings = TIMEFRAME_SETTINGS.get(timeframe, TIMEFRAME_SETTINGS["Live"])
    db_client = get_influxdb_client()
    
    try:
        flux_query = f"""
        from(bucket: "{INFLUXDB_BUCKET}")
            |> range(start: {settings['range_str']})
            |> filter(fn: (r) => r["_measurement"] == "{measurement}")
            |> filter(fn: (r) => r["_field"] == "IT_load" or r["_field"] == "AC_load" or r["_field"] == "Total_load")
            |> last()
        """
        result = db_client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
        
        it = ac = tot = 0
        for table in result:
            for record in table.records:
                f, v = record.get_field(), record.get_value() or 0
                if f == "IT_load": it = v
                elif f == "AC_load": ac = v
                elif f == "Total_load": tot = v
                
        # Ensure no negative values
        other = max(tot - (it + ac), 0)
        
        return {"energyDistribution": [
            {"name": "IT Load", "value": round(it, 2)},
            {"name": "AC Load", "value": round(ac, 2)},
            {"name": "Other Systems", "value": round(other, 2)}
        ]}
    except Exception as e:
        logger.error(f"Error querying distribution: {str(e)}")
        # Return zeroed defaults on error
        return {"energyDistribution": [
            {"name": "IT Load", "value": 0},
            {"name": "AC Load", "value": 0},
            {"name": "Other Systems", "value": 0}
        ]}

@router.get("/health")
async def health_check():
    try:
        db_client = get_influxdb_client()
        health = db_client.health()
        return {"status": "healthy", "influxdb": health.status}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)} 

@router.get("/export/yearly/{export_type}")
async def export_yearly(
    export_type: str,
    measurement: str = "HQ-HQ-A-3-Data Center 3F"
):
    """
    export_type:
    - operational
    - tariff
    - live
    """
    return {
        "data": await get_yearly_export_data(measurement, export_type)
    }