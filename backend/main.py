# main.py
# -----------------------------
# 🔹 This is the main entry point of your backend.
# 🔹 It starts the FastAPI app and connects all service routers (APIs).
# 🔹 Currently, it includes only the `energy_services.py` file.
# 🔹 When you add new services, just import and include them like shown below.
# -----------------------------

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ✅ Import the router(s) from your services folder
# Example: from services.<filename> import router as <alias>
from energy_services import router as energy_router

# ------------------------------------------------
# 🚀 Initialize the FastAPI app
# ------------------------------------------------
app = FastAPI(
    title="Unified Energy Monitoring API",
    version="1.0",
    description="Backend that integrates multiple energy monitoring services (Generator, UPS, Battery, etc.)."
)

# ------------------------------------------------
# 🌍 Enable CORS (so frontend apps can access the API)
# ------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ For production, replace '*' with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------
# 🔗 Register Routers (API Modules)
# ------------------------------------------------
# Each service file (like energy_services.py) defines its own router.
# Include them here so their routes become available under the same server.
app.include_router(energy_router)  # current energy service routes

# ------------------------------------------------
# 💡 Example: Adding new service later
# ------------------------------------------------
# from services.ups_service import router as ups_router
# app.include_router(ups_router)

# from services.battery_service import router as battery_router
# app.include_router(battery_router)

# ------------------------------------------------
# 🏠 Root route
# ------------------------------------------------
@app.get("/")
async def root():
    """
    Root endpoint - basic info about the API.
    """
    return {
        "api": "Unified Energy Monitoring API",
        "available_services": [
            "/energy",  # from energy_services.py
            # "/ups", "/battery", "/generator" ← add here when new ones are added
        ]
    }

# ------------------------------------------------
# ▶️ Run the FastAPI app
# ------------------------------------------------
# Run this file directly with:  python main.py
# It will start the server on http://localhost:8001
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)