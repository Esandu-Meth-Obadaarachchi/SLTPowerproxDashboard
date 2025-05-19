from fastapi import FastAPI, HTTPException, Depends
from influxdb_client import InfluxDBClient
from influxdb_client.client.exceptions import InfluxDBError
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional
import random
import datetime
import os

# Define USE_MOCK_DATA flag
USE_MOCK_DATA = True  # Set to True to use mock data, False to try connecting to InfluxDB

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure InfluxDB connection with environment variables or defaults
INFLUXDB_URL = "http://124.43.179.232:8086"
INFLUXDB_TOKEN = "UTQB3Ds2YpNE4O9BMJBPgAe16LZLjUChqTcGfbVtuurGVk94SVZeOzAS5_AUjAfHaRrZ8440yqxXw8exH0osfw=="
INFLUXDB_ORG = "SLT"
INFLUXDB_BUCKET = "energyMonitoring"


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
                print(f"Warning: InfluxDB health check returned status: {health.status}")
                print("Falling back to mock data")
                return None
            return client
        except Exception as e:
            print(f"Failed to connect to InfluxDB: {e}")
            print("Falling back to mock data")
            return None
    return client

def generate_mock_time_series(num_points=50, start_time_offset=-24, field_name="value"):
    """Generate mock time series data for testing"""
    now = datetime.datetime.now()
    start_time = now + datetime.timedelta(hours=start_time_offset)
    
    # Calculate time increment
    time_increment = abs(start_time_offset) * 60 / num_points
    
    data = []
    current_value = random.uniform(1.0, 5.0)
    
    for i in range(num_points):
        # Add some randomness but keep the trend
        if field_name == "pue":
            # PUE values typically between 1.1 and 2.0
            current_value = max(1.1, min(2.0, current_value + random.uniform(-0.05, 0.05)))
        elif "load" in field_name.lower():
            # Load values in kW
            current_value = max(5, min(200, current_value + random.uniform(-5, 5)))
        elif field_name == "CarbonEmission":
            # Carbon emission in kg CO2
            current_value = max(0.5, min(10, current_value + random.uniform(-0.2, 0.2)))
        elif field_name == "tariff":
            # Tariff in currency units
            current_value = max(0.1, min(0.5, current_value + random.uniform(-0.01, 0.01)))
        elif field_name == "kWh":
            # Energy consumption in kWh
            current_value = max(10, min(500, current_value + random.uniform(-10, 10)))
        
        timestamp = start_time + datetime.timedelta(minutes=i*time_increment)
        
        data.append({
            "time": timestamp.isoformat(),
            "value": current_value
        })
    
    return data

def get_mock_data(timeframe):
    """Generate mock data for all required metrics"""
    # Map timeframe to number of data points and time offset
    timeframe_map = {
        "Live": (20, -1),  # 20 points in the last hour
        "Hourly": (24, -24),  # 24 points in the last day
        "Daily": (7, -168),  # 7 points in the last week
        "Weekly": (4, -672),  # 4 points in the last month
        "Monthly": (3, -2160),  # 3 points in the last quarter
        "Yearly": (12, -8760),  # 12 points in the last year
    }
    
    num_points, offset = timeframe_map.get(timeframe, (20, -24))
    
    return {
        "pue": generate_mock_time_series(num_points, offset, "pue"),
        "totalLoad": generate_mock_time_series(num_points, offset, "Total_load"),
        "itLoad": generate_mock_time_series(num_points, offset, "IT_load"),
        "acLoad": generate_mock_time_series(num_points, offset, "AC_load"),
        "carbonEmission": generate_mock_time_series(num_points, offset, "CarbonEmission"),
        "tariff": generate_mock_time_series(num_points, offset, "tariff"),
        "energyConsumption": generate_mock_time_series(num_points, offset, "kWh")
    }

def process_query_results(records: List[Any]) -> Dict[str, Any]:
    """Process query results into time series data for charts"""
    # Create separate lists for each field
    pue_data = []
    total_load_data = []
    it_load_data = []
    ac_load_data = []
    
    for record in records:
        time = record.get_time()
        field = record.get_field()
        value = record.get_value()
        
        data_point = {
            "time": time.isoformat(),
            "value": value
        }
        
        # Append to appropriate list based on field
        if field == "pue":
            pue_data.append(data_point)
        elif field == "Total_load":
            total_load_data.append(data_point)
        elif field == "IT_load":
            it_load_data.append(data_point)
        elif field == "AC_load":
            ac_load_data.append(data_point)
    
    return {
        "pue": pue_data,
        "totalLoad": total_load_data,
        "itLoad": it_load_data,
        "acLoad": ac_load_data
    }

def process_carbon_and_tariff_results(records: List[Any]) -> Dict[str, Any]:
    """Process carbon emission and tariff data for charts"""
    carbon_emission_data = []
    tariff_data = []
    energy_consumption_data = []
    
    for record in records:
        time = record.get_time()
        field = record.get_field()
        value = record.get_value()
        
        data_point = {
            "time": time.isoformat(),
            "value": value
        }
        
        # Append to appropriate list based on field
        if field == "CarbonEmission":
            carbon_emission_data.append(data_point)
        elif field == "tariff":
            tariff_data.append(data_point)
        elif field == "kWh":
            energy_consumption_data.append(data_point)
    
    return {
        "carbonEmission": carbon_emission_data,
        "tariff": tariff_data,
        "energyConsumption": energy_consumption_data
    }

def get_data_with_range(range_expr):
    """Get data with a specific range expression, with mock data fallback"""
    db_client = get_influxdb_client()
    
    if not db_client:
        # Determine timeframe from range expression
        timeframe_map = {
            "-15m": "Live",
            "-24h": "Hourly",
            "-7d": "Daily",
            "-30d": "Weekly",
            "-90d": "Monthly",
            "-365d": "Yearly"
        }
        timeframe = timeframe_map.get(range_expr, "Hourly")
        mock_data = get_mock_data(timeframe)
        grouped_data = {}
        
        # Convert mock time series data to format expected by API
        for category, data_points in mock_data.items():
            for point in data_points:
                time = point["time"]
                value = point["value"]
                
                # Map category back to field name
                field_map = {
                    "pue": "pue",
                    "totalLoad": "Total_load",
                    "itLoad": "IT_load",
                    "acLoad": "AC_load",
                    "carbonEmission": "CarbonEmission",
                    "tariff": "tariff",
                    "energyConsumption": "kWh"
                }
                
                field = field_map.get(category, category)
                
                if time not in grouped_data:
                    grouped_data[time] = {"time": time}
                
                grouped_data[time][field] = value
        
        # Convert to list of objects
        return {"data": list(grouped_data.values())}
    
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
                    # Initialize the dictionary for this timestamp
                    grouped_data[time] = {"time": time.isoformat()}
                
                # Add the field and value
                grouped_data[time][field] = value
        
        # Convert grouped_data to a list of objects
        data_points = list(grouped_data.values())

        return {"data": data_points}
    except Exception as e:
        print(f"Error querying InfluxDB: {e}")
        # Fall back to mock data
        return get_data_with_range(range_expr)

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
        measurement: The measurement to query (default: HQ-HQ-A-3-Data Center 3F)
    """
    # Map timeframe to range expression
    range_map = {
        "Live": "-15m",
        "Hourly": "-24h",
        "Daily": "-7d",
        "Weekly": "-30d",
        "Monthly": "-90d",
        "Yearly": "-365d"
    }
    
    range_expr = range_map.get(timeframe, "-1h")
    
    # Check if we should use mock data
    if USE_MOCK_DATA or not get_influxdb_client():
        mock_data = get_mock_data(timeframe)
        return {
            "pue": mock_data["pue"],
            "totalLoad": mock_data["totalLoad"],
            "itLoad": mock_data["itLoad"],
            "acLoad": mock_data["acLoad"]
        }
    
    try:
        # Construct flux query
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
        
        result = client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
        
        # Process results
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
                
                # Append to appropriate list based on field
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
        print(f"Error querying InfluxDB: {e}")
        # Fall back to mock data
        mock_data = get_mock_data(timeframe)
        return {
            "pue": mock_data["pue"],
            "totalLoad": mock_data["totalLoad"],
            "itLoad": mock_data["itLoad"],
            "acLoad": mock_data["acLoad"]
        }

@app.get("/CarbonAndTariff/{timeframe}")
async def get_carbon_and_tariff(timeframe: str, measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    """
    Get carbon emission and tariff data for charts
    
    Args:
        timeframe: Live, Hourly, Daily, Weekly, Monthly, or Yearly
        measurement: The measurement to query (default: HQ-HQ-A-3-Data Center 3F)
    """
    # Map timeframe to range expression
    range_map = {
        "Live": "-15m",
        "Hourly": "-24h",
        "Daily": "-7d",
        "Weekly": "-30d",
        "Monthly": "-90d",
        "Yearly": "-365d"
    }
    
    range_expr = range_map.get(timeframe, "-1h")
    
    # Check if we should use mock data
    if USE_MOCK_DATA or not get_influxdb_client():
        mock_data = get_mock_data(timeframe)
        return {
            "carbonEmission": mock_data["carbonEmission"],
            "tariff": mock_data["tariff"],
            "energyConsumption": mock_data["energyConsumption"]
        }
    
    try:
        # Construct flux query
        flux_query = f"""
        from(bucket: "{INFLUXDB_BUCKET}")
            |> range(start: {range_expr})
            |> filter(fn: (r) => r["_measurement"] == "{measurement}")
            |> filter(fn: (r) => r["_field"] == "tariff" or r["_field"] == "CarbonEmission" or r["_field"] == "kWh")
        |> keep(columns: ["_time", "_field", "_value"])
        """
        
        result = client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
        
        # Process results
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
                
                # Append to appropriate list based on field
                if field == "CarbonEmission":
                    processed_data["carbonEmission"].append(data_point)
                elif field == "tariff":
                    processed_data["tariff"].append(data_point)
                elif field == "kWh":
                    processed_data["energyConsumption"].append(data_point)
        
        return processed_data
    except Exception as e:
        print(f"Error querying InfluxDB: {e}")
        # Fall back to mock data
        mock_data = get_mock_data(timeframe)
        return {
            "carbonEmission": mock_data["carbonEmission"],
            "tariff": mock_data["tariff"],
            "energyConsumption": mock_data["energyConsumption"]
        }

@app.get("/EnergyDistribution/{timeframe}")
async def get_energy_distribution(timeframe: str, measurement: str = "HQ-HQ-A-3-Data Center 3F"):
    """
    Get energy distribution data for pie charts
    
    Args:
        timeframe: Live, Hourly, Daily, Weekly, Monthly, or Yearly
        measurement: The measurement to query (default: HQ-HQ-A-3-Data Center 3F)
    """
    # Map timeframe to range expression
    range_map = {
        "Live": "-15m",
        "Hourly": "-24h",
        "Daily": "-7d",
        "Weekly": "-30d",
        "Monthly": "-90d",
        "Yearly": "-365d"
    }
    
    range_expr = range_map.get(timeframe, "-1h")
    
    # Check if we should use mock data
    if USE_MOCK_DATA or not get_influxdb_client():
        # Generate random but realistic energy distribution values
        it_load = random.uniform(40, 60)
        ac_load = random.uniform(20, 30)
        total_load = it_load + ac_load + random.uniform(5, 15)
        
        other_systems = total_load - (it_load + ac_load)
        if other_systems < 0:
            other_systems = 0
        
        # Format for pie chart
        energy_distribution = [
            {"name": "IT Load", "value": round(it_load, 2)},
            {"name": "AC Load", "value": round(ac_load, 2)},
            {"name": "Other Systems", "value": round(other_systems, 2)}
        ]
        
        return {"energyDistribution": energy_distribution}
    
    try:
        # Construct flux query to get latest values
        flux_query = f"""
        from(bucket: "{INFLUXDB_BUCKET}")
            |> range(start: {range_expr})
            |> filter(fn: (r) => r["_measurement"] == "{measurement}")
            |> filter(fn: (r) => r["_field"] == "IT_load" or r["_field"] == "AC_load" or r["_field"] == "Total_load")
            |> last()
        """
        
        result = client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
        
        # Extract values
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
        
        # Calculate other systems load
        other_systems = total_load - (it_load + ac_load)
        if other_systems < 0:
            other_systems = 0
        
        # Format for pie chart
        energy_distribution = [
            {"name": "IT Load", "value": it_load},
            {"name": "AC Load", "value": ac_load},
            {"name": "Other Systems", "value": other_systems}
        ]
        
        return {"energyDistribution": energy_distribution}
    except Exception as e:
        print(f"Error querying InfluxDB: {e}")
        # Fall back to mock data
        it_load = random.uniform(40, 60)
        ac_load = random.uniform(20, 30)
        total_load = it_load + ac_load + random.uniform(5, 15)
        
        other_systems = total_load - (it_load + ac_load)
        if other_systems < 0:
            other_systems = 0
        
        # Format for pie chart
        energy_distribution = [
            {"name": "IT Load", "value": round(it_load, 2)},
            {"name": "AC Load", "value": round(ac_load, 2)},
            {"name": "Other Systems", "value": round(other_systems, 2)}
        ]
        
        return {"energyDistribution": energy_distribution}

@app.get("/health")
async def health_check():
    """API health check endpoint"""
    # Check if InfluxDB is available
    db_client = get_influxdb_client()
    if db_client and not USE_MOCK_DATA:
        try:
            health = db_client.health()
            if health.status == "pass":
                return {
                    "status": "healthy", 
                    "database": "connected",
                    "mode": "production"
                }
            else:
                return {
                    "status": "degraded", 
                    "database": f"unhealthy: {health.status}",
                    "mode": "mock data"
                }
        except Exception as e:
            return {
                "status": "degraded", 
                "database": f"error: {str(e)}",
                "mode": "mock data"
            }
    
    return {
        "status": "healthy", 
        "database": "disconnected",
        "mode": "mock data"
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
        "mode": "mock data" if USE_MOCK_DATA else "production"
    }

# For development use only - these are not needed in production
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)