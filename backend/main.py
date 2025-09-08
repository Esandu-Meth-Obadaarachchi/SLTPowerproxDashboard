from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import time

app = FastAPI()

# Enable CORS so React (http://localhost:3000) can fetch the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace "*" with ["http://localhost:3000"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Generator Dashboard Mock API is running 🚀"}

@app.get("/overview")
def get_overview():
    """Mock data for Overview tab"""
    return {
        "status": random.choice(["Running", "Standby", "Stopped"]),
        "fuel": f"{random.randint(20, 100)}%",
        "battery": f"{random.randint(9, 12)}V",
        "coolant_temp": f"{random.randint(150, 220)}°C",
        "rpm": random.randint(800, 1500),
        "frequency": random.randint(45, 50),
        "temperature": f"{random.randint(150, 220)}°C",
        "capacity": f"{random.randint(500, 800)} kW",
        "last_update": time.strftime("%Y-%m-%d %H:%M:%S"),
    }

@app.get("/electrical")
def get_electrical():
    """Mock data for Electrical tab"""
    return {
        "line": {
            "L1-N": round(random.uniform(210, 240), 2),
            "L2-N": round(random.uniform(210, 240), 2),
            "L3-N": round(random.uniform(210, 240), 2),
        #     "L1_L2": round(random.uniform(400, 430), 2),
        #     "L2_L3": round(random.uniform(400, 430), 2),
        #     "L3_L1": round(random.uniform(400, 430), 2),
        #     "L1": round(random.uniform(30, 50), 2),
        #     "L2": round(random.uniform(30, 50), 2),
        #     "L3": round(random.uniform(30, 50), 2),
         },

        "line_voltages": {
            "L1-L2": round(random.uniform(400, 430), 2),
            "L2-L3": round(random.uniform(400, 430), 2),
            "L3-L1": round(random.uniform(400, 430), 2),
            "L1": round(random.uniform(30, 50), 2),
            "L2": round(random.uniform(30, 50), 2),
            "L3": round(random.uniform(30, 50), 2),
         },

        "power_metrics": {
            "Active_Power": random.randint(100, 800),
            "Apparent_Power": random.randint(500, 1000),
            "Reactive_Power": random.randint(300, 800),
        },
        "power_factor": {
            "L1": round(random.uniform(0.1, 1.0), 2),
            "L2": round(random.uniform(0.1, 1.0), 2),
            "L3": round(random.uniform(0.1, 1.0), 2),
        }
    }

@app.get("/mechanical")
def get_mechanical():
    """Mock data for Mechanical tab"""
    return {
        "rpm": random.randint(800, 1500),
        "coolant_temp": random.randint(150, 220),
        "oil_pressure": random.randint(200, 350),
        "frequency": random.randint(45, 50),
        "fuel": {
            "day_tank": random.randint(20, 100),
            "num_starts": random.randint(0, 10),
        },
        "energy_metrics": {
            "kWh": random.randint(500, 1000),
            "kVAh": random.randint(600, 1100),
            "kVarh": random.randint(700, 1200),
        }
    }

@app.get("/alarms")
def get_alarms():
    """Mock data for Alarms tab"""
    severities = ["Critical", "High", "Medium", "Low"]
    statuses = ["Active", "Acknowledged", "Resolved"]

    alarms = []
    for _ in range(5):  # 5 mock alarms
        alarms.append({
            "time": time.strftime("%Y-%m-%d %H:%M:%S"),
            "originator": f"Gen_{random.randint(1, 3)}",
            "type": random.choice(["Overheating", "Disk Failure", "Offline", "Low Fuel"]),
            "severity": random.choice(severities),
            "status": random.choice(statuses),
            "assignee": random.choice(["Admin", "Tech Team", "Operator"])
        })

    return {"alarms": alarms}
