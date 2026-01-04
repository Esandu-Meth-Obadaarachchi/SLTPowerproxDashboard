# main.py
# -----------------------------
# 🔹 This is the main entry point of your backend.
# 🔹 It starts the FastAPI app and connects all service routers (APIs).
# -----------------------------

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ✅ Import the router(s) from your services folder
from backend.energy_services import router as energy_router
from backend.canteen_services import router as canteen_router  # NEW

# ------------------------------------------------
# 🚀 Initialize the FastAPI app
# ------------------------------------------------
app = FastAPI(
    title="Unified Energy Monitoring API",
    version="1.0",
    description="Backend that integrates multiple energy monitoring services (Energy, Canteens, etc.)."
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
app.include_router(energy_router)    # /energy routes
app.include_router(canteen_router)   # /canteens routes (NEW)

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
            "/energy",     # Energy monitoring routes
            "/canteens",   # Canteen monitoring routes
        ],
        "docs": "/docs"  # Swagger UI documentation
    }

# ------------------------------------------------
# ▶️ Run the FastAPI app
# ------------------------------------------------
# Run this file directly with:  python main.py
# It will start the server on http://localhost:8001
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8001, reload=True)