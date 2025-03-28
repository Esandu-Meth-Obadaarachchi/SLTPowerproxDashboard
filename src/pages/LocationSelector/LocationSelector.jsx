import React, { useState, useMemo } from "react";
import "./LocationSelector.css";
import { useNavigate } from "react-router-dom";

const LocationSelector = () => {
  const navigate = useNavigate();
  const [expandedLocation, setExpandedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupByFilter, setGroupByFilter] = useState("All");

  // Mock data - replace with your actual data source
  const locationsData = [
    {
      id: 1,
      name: "SLT HQ",
      locationType: "Main",
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
      locationType: "Main",
      description: "Off-site Technical Station - Backup Power",
      assets: [
        { id: 201, name: "Gen_OTS_1", status: "Standby", lastChecked: "3 hours ago" },
        { id: 202, name: "Gen_OTS_2", status: "Running", lastChecked: "30 minutes ago" },
        { id: 203, name: "Gen_OTS_3", status: "Offline", lastChecked: "1 day ago" },
      ],
    },
    {
      id: 3,
      name: "SLT WELIKADA A",
      locationType: "Gateway",
      description: " - Welikada A Power Distribution Station",
      assets: [
        { id: 301, name: "Gen_WA_1", status: "Running", lastChecked: "1 hour ago" },
        { id: 302, name: "Gen_WA_2", status: "Running", lastChecked: "1 hour ago" },
        { id: 303, name: "Gen_WA_3", status: "Running", lastChecked: "1 hour ago" },
      ],
    },
    {
      id: 4,
      name: "SLT WELIKADA B",
      locationType: "Gateway",
      description: " - Welikada B Power Distribution Station",
      assets: [
        { id: 401, name: "Gen_WB_1", status: "Standby", lastChecked: "5 hours ago" },
        { id: 402, name: "Gen_WB_2", status: "Offline", lastChecked: "1 day ago" },
      ],
    },
    {
      id: 5,
      name: "SLT Thalawathugoda RSU",
      locationType: "Gateway",
      description: " - Thalawathugoda Remote Service Unit",
      assets: [
        { id: 501, name: "Gen_TR_1", status: "Standby", lastChecked: "6 hours ago" },
      ],
    },
    {
      id: 6,
      name: "SLT MATTAKKULIYA TELESHOP",
      locationType: "Gateway",
      description: " - Mattakkuliya Teleshop Backup Station",
      assets: [
        { id: 601, name: "Gen_MT_1", status: "Standby", lastChecked: "12 hours ago" },
      ],
    },
  ];

  // Function to handle navigation to generator dashboard
  const handleSelectAsset = (assetId) => {
    navigate(`/dashboard/${assetId}`);
  };

  const handleToggleLocation = (locationId) => {
    setExpandedLocation(expandedLocation === locationId ? null : locationId);
  };

  // Get status counts for a specific location
  const getLocationStatusCounts = (location) => {
    const running = location.assets.filter(asset => asset.status === "Running").length;
    const standby = location.assets.filter(asset => asset.status === "Standby").length;
    const offline = location.assets.filter(asset => asset.status === "Offline").length;
    
    return { running, standby, offline };
  };

  // Implement search filtering
  const filteredLocations = useMemo(() => {
    let filtered = locationsData;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        location => 
          location.name.toLowerCase().includes(query) || 
          location.description.toLowerCase().includes(query) ||
          location.assets.some(asset => 
            asset.name.toLowerCase().includes(query) || 
            asset.status.toLowerCase().includes(query)
          )
      );
    }
    
    // Apply groupBy filter
    if (groupByFilter !== "All") {
      if (groupByFilter === "Running") {
        filtered = filtered.filter(location => 
          location.assets.some(asset => asset.status === "Running")
        );
      } else if (groupByFilter === "Standby") {
        filtered = filtered.filter(location => 
          location.assets.some(asset => asset.status === "Standby")
        );
      } else if (groupByFilter === "Offline") {
        filtered = filtered.filter(location => 
          location.assets.some(asset => asset.status === "Offline")
        );
      } else if (groupByFilter === "Main") {
        filtered = filtered.filter(location => location.locationType === "Main");
      } else if (groupByFilter === "Gateway") {
        filtered = filtered.filter(location => location.locationType === "Gateway");
      }
    }
    
    return filtered;
  }, [locationsData, searchQuery, groupByFilter]);

  return (
    <div className="simplified-dashboard">
      <div className="simplified-header">
        <h1>Generator Monitoring System</h1>
        
        <div className="header-controls">
          {/* Legend */}
          <div className="status-legend">
            <div className="legend-item">
              <div className="legend-indicator running">⚡</div>
              <span>Running</span>
            </div>
            <div className="legend-item">
              <div className="legend-indicator standby">⏱️</div>
              <span>Standby</span>
            </div>
            <div className="legend-item">
              <div className="legend-indicator offline">⚠️</div>
              <span>Offline</span>
            </div>
          </div>
          
          {/* Filter dropdown */}
          <div className="filter-container">
            <select 
              className="filter-dropdown"
              value={groupByFilter}
              onChange={(e) => setGroupByFilter(e.target.value)}
            >
              <option value="All">Show All</option>
              <option value="Running">Running</option>
              <option value="Standby">Standby</option>
              <option value="Offline">Offline</option>
              <option value="Main">Main Locations</option>
              <option value="Gateway">Gateway Locations</option>
            </select>
          </div>
          
          {/* Search box */}
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="simplified-locations-grid">
        {filteredLocations.length === 0 ? (
          <div className="no-results">No matching locations found</div>
        ) : (
          filteredLocations.map((location) => {
            const statusCounts = getLocationStatusCounts(location);
            
            return (
              <div key={location.id} className="simplified-location-card">
                <div className="simplified-location-header">
                  <h2>{location.name + " " + location.description}</h2>
                  <div className="simplified-status-indicators">
                    {statusCounts.running > 0 && (
                      <div className="simplified-status running">
                        <span>⚡</span>
                        <span>{statusCounts.running}</span>
                      </div>
                    )}
                    {statusCounts.standby > 0 && (
                      <div className="simplified-status standby">
                        <span>⏱️</span>
                        <span>{statusCounts.standby}</span>
                      </div>
                    )}
                    {statusCounts.offline > 0 && (
                      <div className="simplified-status offline">
                        <span>⚠️</span>
                        <span>{statusCounts.offline}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Asset slots - now with hover effect */}
                <div className="simplified-asset-slots">
                  {location.assets.map((asset) => (
                    <div 
                      key={asset.id} 
                      className={`simplified-asset-slot ${asset.status.toLowerCase()}`}
                      onClick={() => handleSelectAsset(asset.id)}
                    >
                      {asset.name}
                      <span className="view-indicator">→</span>
                    </div>
                  ))}
                  {/* Add empty slots to maintain grid */}
                  {Array(3 - location.assets.length).fill().map((_, i) => (
                    <div key={`empty-${i}`} className="simplified-asset-slot empty"></div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LocationSelector;