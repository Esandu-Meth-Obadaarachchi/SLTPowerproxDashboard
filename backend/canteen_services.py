# services/canteen_services.py

from fastapi import APIRouter, HTTPException
from influxdb_client import InfluxDBClient
from influxdb_client.client.exceptions import InfluxDBError
import logging
from datetime import datetime, timedelta

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/canteens",
    tags=["Canteen Monitoring"]
)

# --------------------------------------------------
# InfluxDB Configuration
# --------------------------------------------------
INFLUXDB_URL = "http://124.43.179.232:8086"
INFLUXDB_TOKEN = "Jgf9u41SLRFPV-Zf8dqfl_ixiIYz2SzRqhHrfmHkpwGis7EOPRDmjBp9SGZsOhiV9ra1gjr2J1JLSW-1kDICOg=="
INFLUXDB_ORG = "SLT"
INFLUXDB_BUCKET = "SLT Canteens"

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
            raise HTTPException(status_code=503, detail="Canteen Database unavailable")
    return client

# --------------------------------------------------
# Canteen Configuration
# --------------------------------------------------
CANTEEN_MEASUREMENTS = {
    "Rajabojun Canteen": "Rajabojun_canteen",
    "SLT 1st Floor Canteen": "SLT 1st floor_canteen",
    "SLT 2nd Floor Canteen": "SLT 2nd floor_canteen",
    "SLT Juice Bar": "SLT Juice_Bar",
}

# Convention 1: Used by Rajabojun, SLT 1st Floor, SLT 2nd Floor
# These canteens use the "standard" naming convention
PRIMARY_FIELDS_V1 = [
    "total_kw",           # Active Power
    "total_kva",          # Apparent Power
    "Reactive_Power",     # Reactive Power (added from Juice Bar)
    "kw1", "kw2", "kw3",  # Phase-wise Active Power
    "current_i1", "current_i2", "current_i3",  # Phase currents
    "average_voltage_ln", # Average Line-to-Neutral Voltage
    "voltage_v1n", "voltage_v2n", "voltage_v3n",  # Phase voltages
    "average_pf",         # Power Factor
    "pf1", "pf2", "pf3",  # Phase power factors
    "frequency",          # Frequency
    "total_net_kwh",      # Total Energy
    "total_net_kvah"      # Total Reactive Energy
]

# Convention 2: Used by SLT Juice Bar ONLY
# Juice Bar uses completely different field names for EVERYTHING
PRIMARY_FIELDS_V2 = [
    "ActivePower",        # Active Power (instead of total_kw)
    "Apparent_Power",     # Apparent Power (instead of total_kva)
    "Reactive_Power",     # Reactive Power (unique to Juice Bar)
    "Current_",           # Current (instead of current_i1)
    "Voltage_L_N",        # Voltage (instead of average_voltage_ln)
    "power_factor1",         # Power Factor (same name)
    "Freequency_",        # Frequency (instead of frequency)
    "Total_KWh",          # Total Energy (instead of total_net_kwh)
    "Total_Kvarh"         # Total Reactive Energy (instead of total_net_kvah)
]

# Combined list - unique fields only
PRIMARY_FIELDS = list(set(PRIMARY_FIELDS_V1 + PRIMARY_FIELDS_V2))

# Phase-wise detailed parameters (for V1 canteens only)
PHASE_FIELDS = [
    "current_i1", "current_i2", "current_i3",
    "voltage_v1n", "voltage_v2n", "voltage_v3n",
    "kw1", "kw2", "kw3",
    "kva1", "kva2", "kva3",
    "pf1", "pf2", "pf3"
]

# Demand parameters
DEMAND_FIELDS = [
    "max_avg_i_demand",
    "max_i1_demand",
    "max_i2_demand",
    "max_i3_demand"
]

# All available fields combined
ALL_FIELDS = list(set(PRIMARY_FIELDS + PHASE_FIELDS + DEMAND_FIELDS + [
    "average_voltage_ln",
    "frequency",
    "power_factor1",
    "total_kva",
    "total_kw",
    "total_net_kvah",
    "total_net_kwh"
]))

# --------------------------------------------------
# Helper Functions
# --------------------------------------------------

async def get_canteen_chart_data(measurement: str, time_range: str = "-24h"):
    """
    Fetch chart data for a specific canteen
    Returns ~20 data points for the frontend charts
    """
    db_client = get_influxdb_client()
    
    # Calculate dynamic window for ~20 points
    range_minutes = {
        "-15m": 15,
        "-1h": 60,
        "-24h": 1440,
        "-7d": 10080,
    }
    
    total_min = range_minutes.get(time_range, 1440)
    window_min = max(1, int(total_min / 20))
    window_str = f"{window_min}m"
    
    # Build filter for ALL primary electrical fields
    field_filters = ' or '.join([f'r["_field"] == "{field}"' for field in PRIMARY_FIELDS])
    
    flux_query = f"""
    from(bucket: "{INFLUXDB_BUCKET}")
        |> range(start: {time_range})
        |> filter(fn: (r) => r["_measurement"] == "{measurement}")
        |> filter(fn: (r) => {field_filters})
        |> aggregateWindow(every: {window_str}, fn: mean, createEmpty: false)
        |> yield(name: "mean")
    """
    
    logger.info(f"Querying measurement: {measurement} in bucket: {INFLUXDB_BUCKET}")
    
    try:
        result = db_client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
        
        # Group data by timestamp
        grouped_data = {}
        record_count = 0
        fields_found = set()
        
        for table in result:
            for record in table.records:
                record_count += 1
                time_str = record.get_time().isoformat()
                if time_str not in grouped_data:
                    grouped_data[time_str] = {"time": time_str}
                
                field_name = record.get_field()
                value = record.get_value()
                fields_found.add(field_name)
                grouped_data[time_str][field_name] = round(value, 3) if value is not None else 0
        
        logger.info(f"Found {record_count} records, {len(grouped_data)} time points for {measurement}")
        logger.info(f"Fields found: {sorted(fields_found)}")
        
        # Return sorted list
        sorted_data = sorted(list(grouped_data.values()), key=lambda x: x['time'])
        
        if len(sorted_data) > 0:
            logger.info(f"Sample data fields: {list(sorted_data[0].keys())}")
        else:
            logger.warning(f"No data found for measurement: {measurement}")
        
        return sorted_data
        
    except Exception as e:
        logger.error(f"Error querying canteen data for {measurement}: {str(e)}")
        return []


async def get_canteen_summary(measurement: str):
    """
    Get latest values for a canteen (for summary cards)
    """
    db_client = get_influxdb_client()
    
    # Get all fields for comprehensive summary
    field_filters = ' or '.join([f'r["_field"] == "{field}"' for field in ALL_FIELDS])
    
    flux_query = f"""
    from(bucket: "{INFLUXDB_BUCKET}")
        |> range(start: -1h)
        |> filter(fn: (r) => r["_measurement"] == "{measurement}")
        |> filter(fn: (r) => {field_filters})
        |> last()
    """
    
    try:
        result = db_client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
        
        summary = {}
        for table in result:
            for record in table.records:
                field_name = record.get_field()
                value = record.get_value()
                summary[field_name] = round(value, 2) if value is not None else 0
        
        logger.info(f"Summary fields for {measurement}: {sorted(summary.keys())}")
        
        return summary
        
    except Exception as e:
        logger.error(f"Error querying canteen summary: {str(e)}")
        return {}


async def get_phase_data(measurement: str, time_range: str = "-1h"):
    """
    Get phase-wise data for detailed analysis
    """
    db_client = get_influxdb_client()
    
    total_min = 60  # 1 hour default
    window_min = max(1, int(total_min / 20))
    window_str = f"{window_min}m"
    
    field_filters = ' or '.join([f'r["_field"] == "{field}"' for field in PHASE_FIELDS])
    
    flux_query = f"""
    from(bucket: "{INFLUXDB_BUCKET}")
        |> range(start: {time_range})
        |> filter(fn: (r) => r["_measurement"] == "{measurement}")
        |> filter(fn: (r) => {field_filters})
        |> aggregateWindow(every: {window_str}, fn: mean, createEmpty: false)
    """
    
    try:
        result = db_client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
        
        grouped_data = {}
        for table in result:
            for record in table.records:
                time_str = record.get_time().isoformat()
                if time_str not in grouped_data:
                    grouped_data[time_str] = {"time": time_str}
                
                field_name = record.get_field()
                value = record.get_value()
                grouped_data[time_str][field_name] = round(value, 3) if value is not None else 0
        
        return sorted(list(grouped_data.values()), key=lambda x: x['time'])
        
    except Exception as e:
        logger.error(f"Error querying phase data: {str(e)}")
        return []


# --------------------------------------------------
# API Routes
# --------------------------------------------------

@router.get("")
async def get_all_canteens():
    """
    Main endpoint: Returns all canteens with their chart data and summaries
    Format expected by frontend
    """
    canteens_data = {}
    
    for canteen_name, measurement in CANTEEN_MEASUREMENTS.items():
        try:
            # Get chart data (last 24 hours by default)
            chart_data = await get_canteen_chart_data(measurement, "-24h")
            
            # Get summary statistics
            summary = await get_canteen_summary(measurement)
            
            canteens_data[canteen_name] = {
                "chart": chart_data,
                "summary": summary
            }
            
        except Exception as e:
            logger.error(f"Error fetching data for {canteen_name}: {str(e)}")
            canteens_data[canteen_name] = {
                "chart": [],
                "summary": {}
            }
    
    return canteens_data


@router.get("/{canteen_name}")
async def get_single_canteen(canteen_name: str, time_range: str = "-24h"):
    """
    Get data for a specific canteen with custom time range
    """
    if canteen_name not in CANTEEN_MEASUREMENTS:
        raise HTTPException(status_code=404, detail=f"Canteen '{canteen_name}' not found")
    
    measurement = CANTEEN_MEASUREMENTS[canteen_name]
    
    try:
        chart_data = await get_canteen_chart_data(measurement, time_range)
        summary = await get_canteen_summary(measurement)
        
        return {
            "canteen": canteen_name,
            "chart": chart_data,
            "summary": summary
        }
        
    except Exception as e:
        logger.error(f"Error fetching {canteen_name}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{canteen_name}/phases")
async def get_canteen_phases(canteen_name: str, time_range: str = "-1h"):
    """
    Get phase-wise detailed data for a specific canteen
    """
    if canteen_name not in CANTEEN_MEASUREMENTS:
        raise HTTPException(status_code=404, detail=f"Canteen '{canteen_name}' not found")
    
    measurement = CANTEEN_MEASUREMENTS[canteen_name]
    
    try:
        phase_data = await get_phase_data(measurement, time_range)
        
        return {
            "canteen": canteen_name,
            "phase_data": phase_data
        }
        
    except Exception as e:
        logger.error(f"Error fetching phase data for {canteen_name}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/summary/totals")
async def get_totals_summary():
    """
    Get aggregated totals across all canteens
    Handles BOTH naming conventions
    V1: total_kw, total_kva, total_net_kwh, total_net_kvah
    V2: ActivePower, Apparent_Power, Total_KWh, Total_Kvarh, Reactive_Power
    """
    total_energy = 0
    total_reactive_energy = 0
    total_power = 0
    total_apparent_power = 0
    total_reactive_power = 0
    
    for canteen_name, measurement in CANTEEN_MEASUREMENTS.items():
        try:
            summary = await get_canteen_summary(measurement)
            
            # Energy (kWh) - V1: total_net_kwh, V2: Total_KWh
            total_energy += summary.get("total_net_kwh", summary.get("Total_KWh", 0))
            
            # Reactive Energy (kvarh) - V1: total_net_kvah, V2: Total_Kvarh
            total_reactive_energy += summary.get("total_net_kvah", summary.get("Total_Kvarh", 0))
            
            # Active Power (kW) - V1: total_kw, V2: ActivePower
            total_power += summary.get("total_kw", summary.get("ActivePower", 0))
            
            # Apparent Power (kVA) - V1: total_kva, V2: Apparent_Power
            total_apparent_power += summary.get("total_kva", summary.get("Apparent_Power", 0))
            
            # Reactive Power (kVAr) - V2 ONLY: Reactive_Power
            total_reactive_power += summary.get("Reactive_Power", 0)
            
        except Exception as e:
            logger.error(f"Error getting summary for {canteen_name}: {str(e)}")
    
    return {
        "totalCanteens": len(CANTEEN_MEASUREMENTS),
        "totalEnergy": round(total_energy, 2),
        "totalReactiveEnergy": round(total_reactive_energy, 2),
        "totalPower": round(total_power, 2),
        "totalApparentPower": round(total_apparent_power, 2),
        "totalReactivePower": round(total_reactive_power, 2)
    }


@router.get("/health")
async def health_check():
    """
    Check if the canteen service and InfluxDB are healthy
    """
    try:
        db_client = get_influxdb_client()
        health = db_client.health()
        return {
            "status": "healthy",
            "influxdb": health.status,
            "bucket": INFLUXDB_BUCKET,
            "canteens_configured": len(CANTEEN_MEASUREMENTS),
            "canteens": list(CANTEEN_MEASUREMENTS.keys())
        }
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}


@router.get("/debug/measurements")
async def list_all_measurements():
    """
    Debug endpoint: List all available measurements in the SLT Canteens bucket
    """
    db_client = get_influxdb_client()
    
    flux_query = f"""
    import "influxdata/influxdb/schema"
    schema.measurements(bucket: "{INFLUXDB_BUCKET}")
    """
    
    try:
        result = db_client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
        
        measurements = []
        for table in result:
            for record in table.records:
                measurements.append(record.get_value())
        
        return {
            "bucket": INFLUXDB_BUCKET,
            "measurements": measurements,
            "configured_canteens": CANTEEN_MEASUREMENTS
        }
        
    except Exception as e:
        logger.error(f"Error listing measurements: {str(e)}")
        return {"error": str(e)}


@router.get("/debug/fields/{measurement}")
async def list_fields_for_measurement(measurement: str):
    """
    Debug endpoint: List all fields available for a specific measurement
    """
    db_client = get_influxdb_client()
    
    flux_query = f"""
    import "influxdata/influxdb/schema"
    schema.measurementFieldKeys(
        bucket: "{INFLUXDB_BUCKET}",
        measurement: "{measurement}"
    )
    """
    
    try:
        result = db_client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
        
        fields = []
        for table in result:
            for record in table.records:
                fields.append(record.get_value())
        
        return {
            "measurement": measurement,
            "bucket": INFLUXDB_BUCKET,
            "fields": sorted(fields),
            "expected_fields_v1": PRIMARY_FIELDS_V1,
            "expected_fields_v2": PRIMARY_FIELDS_V2
        }
        
    except Exception as e:
        logger.error(f"Error listing fields: {str(e)}")
        return {"error": str(e)}


@router.get("/debug/all-canteen-fields")
async def list_all_canteen_fields():
    """
    Debug endpoint: List all fields for ALL configured canteens
    USE THIS TO VERIFY FIELD NAMES
    """
    db_client = get_influxdb_client()
    
    all_fields = {}
    
    for canteen_name, measurement in CANTEEN_MEASUREMENTS.items():
        flux_query = f"""
        import "influxdata/influxdb/schema"
        schema.measurementFieldKeys(
            bucket: "{INFLUXDB_BUCKET}",
            measurement: "{measurement}"
        )
        """
        
        try:
            result = db_client.query_api().query(org=INFLUXDB_ORG, query=flux_query)
            
            fields = []
            for table in result:
                for record in table.records:
                    fields.append(record.get_value())
            
            # Identify which convention this canteen uses
            is_v1 = any(field in fields for field in ["total_kw", "voltage_v1n", "current_i1"])
            is_v2 = any(field in fields for field in ["ActivePower", "Voltage_L_N", "Current_"])
            
            all_fields[canteen_name] = {
                "measurement": measurement,
                "fields": sorted(fields),
                "field_count": len(fields),
                "convention": "V1 (Standard)" if is_v1 else "V2 (Juice Bar)" if is_v2 else "Unknown"
            }
            
        except Exception as e:
            logger.error(f"Error listing fields for {canteen_name}: {str(e)}")
            all_fields[canteen_name] = {"error": str(e)}
    
    return {
        "bucket": INFLUXDB_BUCKET,
        "note": "V1 = Rajabojun/1st/2nd Floor, V2 = Juice Bar ONLY",
        "expected_fields_v1": PRIMARY_FIELDS_V1,
        "expected_fields_v2": PRIMARY_FIELDS_V2,
        "canteens": all_fields
    }


@router.get("/debug/search-canteens")
async def search_for_canteens():
    """
    Debug endpoint: Search for measurements that might contain canteen data
    """
    db_client = get_influxdb_client()
    
    # First, get all measurements
    measurements_query = f"""
    import "influxdata/influxdb/schema"
    schema.measurements(bucket: "{INFLUXDB_BUCKET}")
    """
    
    try:
        result = db_client.query_api().query(org=INFLUXDB_ORG, query=measurements_query)
        
        all_measurements = []
        for table in result:
            for record in table.records:
                all_measurements.append(record.get_value())
        
        # Now check fields for each measurement
        measurement_details = {}
        for measurement in all_measurements:
            fields_query = f"""
            import "influxdata/influxdb/schema"
            schema.measurementFieldKeys(
                bucket: "{INFLUXDB_BUCKET}",
                measurement: "{measurement}"
            )
            """
            fields_result = db_client.query_api().query(org=INFLUXDB_ORG, query=fields_query)
            fields = []
            for table in fields_result:
                for record in table.records:
                    fields.append(record.get_value())
            
            # Check if this measurement has canteen-related fields
            has_canteen_fields = any(field in fields for field in [
                "ActivePower", "Voltage_L_N", "Current_", "Total_KWh",
                "total_kw", "voltage_v1n", "current_i1"
            ])
            
            measurement_details[measurement] = {
                "fields": fields,
                "might_be_canteen": has_canteen_fields,
                "field_count": len(fields)
            }
        
        return {
            "bucket": INFLUXDB_BUCKET,
            "total_measurements": len(all_measurements),
            "measurements": measurement_details,
            "looking_for_canteens": list(CANTEEN_MEASUREMENTS.values())
        }
        
    except Exception as e:
        logger.error(f"Error searching canteens: {str(e)}")
        return {"error": str(e)}


@router.get("/debug/list-buckets")
async def list_all_buckets():
    """
    Debug endpoint: List all available buckets in InfluxDB
    """
    db_client = get_influxdb_client()
    
    try:
        buckets_api = db_client.buckets_api()
        buckets = buckets_api.find_buckets()
        
        bucket_list = []
        for bucket in buckets.buckets:
            bucket_list.append({
                "name": bucket.name,
                "id": bucket.id,
                "org_id": bucket.org_id,
                "retention_rules": [rule.every_seconds for rule in bucket.retention_rules] if bucket.retention_rules else []
            })
        
        return {
            "current_bucket": INFLUXDB_BUCKET,
            "total_buckets": len(bucket_list),
            "buckets": bucket_list,
            "hint": "Check if canteen data is in a different bucket"
        }
        
    except Exception as e:
        logger.error(f"Error listing buckets: {str(e)}")
        return {"error": str(e)}