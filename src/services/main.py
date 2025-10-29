from fastapi import FastAPI, HTTPException
from influxdb_client import InfluxDBClient
from influxdb_client.client.exceptions import InfluxDBError
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure InfluxDB connection
INFLUXDB_URL = "http://124.43.179.232:8086"
INFLUXDB_TOKEN = "_phPfq5OJuhlioGMcerZSyRqkCAuksGThcxHIV3H_D-J-ru8Eww5s0iq_CFTt46zWJ-g4iYFA6e__IXcYyetXQ=="
INFLUXDB_ORG = "SLT"
INFLUXDB_BUCKET = "3F Energy Monitoring"

# Global variable to hold the client connection
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
            # Test the connection
            health = client.health()
            if health.status != "pass":
                raise Exception(f"InfluxDB health check failed: {health.status}")
            return client
        except Exception as e:
            raise HTTPException(status_code=503, detail=f"Failed to connect to InfluxDB: {str(e)}")
    return client

def get_data_with_range(range_expr):
    """Get data with a specific range expression"""
    db_client = get_influxdb_client()
    
    try:
        query = f'from(bucket: "{INFLUXDB_BUCKET}") |> range(start: {range_expr})'
        result = db_client.query_api().query(org=INFLUXDB_ORG, query=query)

        # Create a dictionary to group data by time
        grouped_data = {}

        for table in result:
            for record in table.records:
                time = record.get_time()
                field = record.get_field()
                value = record.get_value()
                
                if time not in grouped_data:
                    grouped_data[time] = {"time": time.isoformat()}
                
                grouped_data[time][field] = value
        
        data_points = list(grouped_data.values())
        return {"data": data_points}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying InfluxDB: {str(e)}")

@app.get("/LiveData")
async def get_data():
    return get_data_with_range("-15m")

@app.get("/HourlyData")
async def get_hourly_data():
    return get_data_with_range("-24h")

@app.get("/DailyData")
async def get_daily_data():
    return get_data_with_range("-7d")

@app.get("/Weekly")
async def get_weekly_data():
    return get_data_with_range("-30d")

@app.get("/Monthly")
async def get_monthly_data():
    return get_data_with_range("-90d")

@app.get("/Yearly")
async def get_yearly_data():
    return get_data_with_range("-365d")

@app.get("/ChartData/{timeframe}")
async def get_chart_data(timeframe: str, measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    """
    Get PUE, Total load, IT load, and AC load data for charts
    
    Args:
        timeframe: Live, Hourly, Daily, Weekly, Monthly, or Yearly
        measurement: The measurement to query
    """
    range_map = {
        "Live": "-15m",
        "Hourly": "-24h",
        "Daily": "-7d",
        "Weekly": "-30d",
        "Monthly": "-90d",
        "Yearly": "-365d"
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
        
        processed_data = {
            "pue": [],
            "totalLoad": [],
            "itLoad": [],
            "acLoad": []
        }
        
        for table in result:
            for record in table.records:
                time = record.get_time()
                field = record.get_field()
                value = record.get_value()
                
                data_point = {
                    "time": time.isoformat(),
                    "value": value
                }
                
                if field == "pue":
                    processed_data["pue"].append(data_point)
                elif field == "Total_load":
                    processed_data["totalLoad"].append(data_point)
                elif field == "IT_load":
                    processed_data["itLoad"].append(data_point)
                elif field == "AC_load":
                    processed_data["acLoad"].append(data_point)
        
        return processed_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying InfluxDB: {str(e)}")

@app.get("/CarbonAndTariff/{timeframe}")
async def get_carbon_and_tariff(timeframe: str, measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    """
    Get carbon emission and tariff data for charts
    
    Args:
        timeframe: Live, Hourly, Daily, Weekly, Monthly, or Yearly
        measurement: The measurement to query
    """
    range_map = {
        "Live": "-15m",
        "Hourly": "-24h",
        "Daily": "-7d",
        "Weekly": "-30d",
        "Monthly": "-90d",
        "Yearly": "-365d"
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
        
        processed_data = {
            "carbonEmission": [],
            "tariff": [],
            "energyConsumption": []
        }
        
        for table in result:
            for record in table.records:
                time = record.get_time()
                field = record.get_field()
                value = record.get_value()
                
                data_point = {
                    "time": time.isoformat(),
                    "value": value
                }
                
                if field == "CarbonEmission":
                    processed_data["carbonEmission"].append(data_point)
                elif field == "tariff":
                    processed_data["tariff"].append(data_point)
                elif field == "kWh":
                    processed_data["energyConsumption"].append(data_point)
        
        return processed_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying InfluxDB: {str(e)}")

@app.get("/EnergyDistribution/{timeframe}")
async def get_energy_distribution(timeframe: str, measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    """
    Get energy distribution data for pie charts
    
    Args:
        timeframe: Live, Hourly, Daily, Weekly, Monthly, or Yearly
        measurement: The measurement to query
    """
    range_map = {
        "Live": "-15m",
        "Hourly": "-24h",
        "Daily": "-7d",
        "Weekly": "-30d",
        "Monthly": "-90d",
        "Yearly": "-365d"
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
        
        it_load = 0
        ac_load = 0
        total_load = 0
        
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
        
        other_systems = total_load - (it_load + ac_load)
        if other_systems < 0:
            other_systems = 0
        
        energy_distribution = [
            {"name": "IT Load", "value": it_load},
            {"name": "AC Load", "value": ac_load},
            {"name": "Other Systems", "value": other_systems}
        ]
        
        return {"energyDistribution": energy_distribution}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying InfluxDB: {str(e)}")

@app.get("/health")
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

@app.get("/")
async def root():
    """Root endpoint with basic API info"""
    return {
        "api": "Data Center Energy Monitoring API",
        "version": "1.0",
        "endpoints": [
            "/health",
            "/LiveData",
            "/HourlyData",
            "/DailyData",
            "/Weekly",
            "/Monthly",
            "/Yearly",
            "/ChartData/{timeframe}",
            "/CarbonAndTariff/{timeframe}",
            "/EnergyDistribution/{timeframe}"
        ],
        "mode": "production"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)