import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LocationSelector.css";

const locationsData = [
  {
    id: 1,
    name: "SLT HQ",
    description: "Headquarters Building - Main Power Center",
    assets: [
      { id: 101, name: "Gen_HQb_1", status: "Standby", lastChecked: "2 hours ago" },
      { id: 102, name: "Gen_HQb_2", status: "Standby", lastChecked: "4 hours ago" },
      { id: 103, name: "Gen_HQb_3", status: "Running", lastChecked: "1 hour ago" },
    ],
  },
  {
    id: 2,
    name: "SLT OTS",
    description: "Off-site Technical Station - Backup Power",
    assets: [
      { id: 201, name: "Gen_OTS_1", status: "Standby", lastChecked: "3 hours ago" },
      { id: 202, name: "Gen_OTS_2", status: "Running", lastChecked: "30 minutes ago" },
      { id: 203, name: "Gen_OTS_3", status: "Offline", lastChecked: "1 day ago" },
    ],
  },
];

const LocationSelector = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedLocation, setExpandedLocation] = useState(null);

  const handleSelectAsset = (assetId) => {
    navigate(`/dashboard/${assetId}`);
  };

  const handleToggleLocation = (locationId) => {
    setExpandedLocation(expandedLocation === locationId ? null : locationId);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "running":
        return "#4caf50"; // Green
      case "standby":
        return "#2196f3"; // Blue
      case "offline":
        return "#f44336"; // Red
      default:
        return "#ff9800"; // Orange
    }
  };

  const filteredLocations = locationsData.filter((location) => {
    return (
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.assets.some((asset) =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <div className="location-container">
      <div className="location-header-bar">
        <h1>Generator Monitoring System</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search locations or generators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="location-summary">
        <div className="summary-card">
          <div className="summary-title">Total Generators</div>
          <div className="summary-value">{locationsData.reduce((sum, loc) => sum + loc.assets.length, 0)}</div>
        </div>
        <div className="summary-card">
          <div className="summary-title">Running</div>
          <div className="summary-value running">
            {locationsData.reduce(
              (sum, loc) => sum + loc.assets.filter(a => a.status === "Running").length, 
              0
            )}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-title">Standby</div>
          <div className="summary-value standby">
            {locationsData.reduce(
              (sum, loc) => sum + loc.assets.filter(a => a.status === "Standby").length, 
              0
            )}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-title">Offline</div>
          <div className="summary-value offline">
            {locationsData.reduce(
              (sum, loc) => sum + loc.assets.filter(a => a.status === "Offline").length, 
              0
            )}
          </div>
        </div>
      </div>

      <div className="location-list">
        {filteredLocations.length === 0 ? (
          <div className="no-results">No locations or generators found matching "{searchTerm}"</div>
        ) : (
          filteredLocations.map((location) => (
            <div key={location.id} className="location-card">
              <div 
                className="location-card-header" 
                onClick={() => handleToggleLocation(location.id)}
              >
                <div className="location-title-container">
                  <h2 className="location-title">{location.name}</h2>
                  <span className="location-description">{location.description}</span>
                </div>
                <div className="location-stats">
                  <span className="asset-count">{location.assets.length} Generators</span>
                  <span className={`expand-icon ${expandedLocation === location.id ? 'expanded' : ''}`}>
                    ▼
                  </span>
                </div>
              </div>

              <div className={`asset-list ${expandedLocation === location.id ? 'expanded' : ''}`}>
                {location.assets.map((asset) => (
                  <div 
                    key={asset.id} 
                    className="asset-card" 
                    onClick={() => handleSelectAsset(asset.id)}
                  >
                    <div className="asset-card-content">
                      <div className="asset-info">
                        <h3 className="asset-name">{asset.name}</h3>
                        <span className="asset-last-checked">Last check: {asset.lastChecked}</span>
                      </div>
                      <div className="asset-status-container">
                        <span 
                          className="asset-status-indicator" 
                          style={{ backgroundColor: getStatusColor(asset.status) }}
                        ></span>
                        <span className="asset-status">{asset.status}</span>
                      </div>
                    </div>
                    <div className="view-dashboard-button">
                      View Dashboard →
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LocationSelector;