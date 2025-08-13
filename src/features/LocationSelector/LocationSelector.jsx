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
      name: "SLT HQ Headquarters Building",
      locationType: "Main",
      description: "Main Power Center",
      assets: [
        { id: 101, name: "GEN_HQb_1", status: "Standby", lastChecked: "2 hours ago" },
        { id: 102, name: "GEN_HQb_2", status: "Standby", lastChecked: "4 hours ago" },
        { id: 103, name: "GEN_HQb_3", status: "Running", lastChecked: "1 hour ago" },
        { id: 104, name: "GEN_HQb_4", status: "Running", lastChecked: "30 minutes ago" },
        { id: 105, name: "GEN_HQb_5", status: "Offline", lastChecked: "8 hours ago" },
        { id: 106, name: "GEN_HQb_6", status: "Standby", lastChecked: "3 hours ago" },
      ],
    },
    {
      id: 2,
      name: "SLT OTS Off-site Technical Station",
      locationType: "Main",
      description: "Backup Power",
      assets: [
        { id: 201, name: "GEN_OTS_1", status: "Standby", lastChecked: "3 hours ago" },
        { id: 202, name: "GEN_OTS_2", status: "Running", lastChecked: "30 minutes ago" },
        { id: 203, name: "GEN_OTS_3", status: "Offline", lastChecked: "1 day ago" },
        { id: 204, name: "GEN_OTS_4", status: "Running", lastChecked: "1 hour ago" },
        { id: 205, name: "GEN_OTS_5", status: "Standby", lastChecked: "2 hours ago" },
        { id: 206, name: "GEN_OTS_6", status: "Running", lastChecked: "45 minutes ago" },
        { id: 207, name: "GEN_OTS_7", status: "Offline", lastChecked: "6 hours ago" },
      ],
    },
    {
      id: 3,
      name: "SLT WELIKADA A",
      locationType: "Gateway",
      description: "Welikada A Power Distribution Station",
      assets: [
        { id: 301, name: "GEN_WA_1", status: "Running", lastChecked: "1 hour ago" },
        { id: 302, name: "GEN_WA_2", status: "Running", lastChecked: "1 hour ago" },
        { id: 303, name: "GEN_WA_3", status: "Running", lastChecked: "1 hour ago" },
        { id: 304, name: "GEN_WA_4", status: "Standby", lastChecked: "2 hours ago" },
        { id: 305, name: "GEN_WA_5", status: "Offline", lastChecked: "4 hours ago" },
      ],
    },
    {
      id: 4,
      name: "SLT WELIKADA B",
      locationType: "Gateway",
      description: "Welikada B Power Distribution Station",
      assets: [
        { id: 401, name: "GEN_WB_1", status: "Standby", lastChecked: "5 hours ago" },
        { id: 402, name: "GEN_WB_2", status: "Offline", lastChecked: "1 day ago" },
        { id: 403, name: "GEN_WB_3", status: "Running", lastChecked: "20 minutes ago" },
        { id: 404, name: "GEN_WB_4", status: "Running", lastChecked: "1 hour ago" },
        { id: 405, name: "GEN_WB_5", status: "Standby", lastChecked: "3 hours ago" },
        { id: 406, name: "GEN_WB_6", status: "Running", lastChecked: "40 minutes ago" },
      ],
    },
    {
      id: 5,
      name: "SLT Thalawathugoda RSU",
      locationType: "Gateway",
      description: "Thalawathugoda Remote Service Unit",
      assets: [
        { id: 501, name: "GEN_TR_1", status: "Standby", lastChecked: "6 hours ago" },
        { id: 502, name: "GEN_TR_2", status: "Running", lastChecked: "2 hours ago" },
        { id: 503, name: "GEN_TR_3", status: "Offline", lastChecked: "10 hours ago" },
        { id: 504, name: "GEN_TR_4", status: "Running", lastChecked: "1 hour ago" },
      ],
    },
    {
      id: 6,
      name: "SLT MATTAKKULIYA TELESHOP",
      locationType: "Gateway",
      description: "Mattakkuliya Teleshop Backup Station",
      assets: [
        { id: 601, name: "GEN_MT_1", status: "Standby", lastChecked: "12 hours ago" },
        { id: 602, name: "GEN_MT_2", status: "Running", lastChecked: "3 hours ago" },
        { id: 603, name: "GEN_MT_3", status: "Offline", lastChecked: "1 day ago" },
        { id: 604, name: "GEN_MT_4", status: "Running", lastChecked: "2 hours ago" },
        { id: 605, name: "GEN_MT_5", status: "Standby", lastChecked: "5 hours ago" },
        { id: 606, name: "GEN_MT_6", status: "Running", lastChecked: "1 hour ago" },
        { id: 607, name: "GEN_MT_7", status: "Offline", lastChecked: "8 hours ago" },
      ],
    },
  ];

  // Function to handle navigation to generator dashboard with asset ID
  const handleSelectAsset = (assetId, assetName) => {
    // Navigate to dashboard with asset ID as URL parameter
    navigate(`/app/dashboard/${assetId}`);
    
    // Alternative: Navigate with query parameter
    // navigate(`/app/dashboard?genId=${assetId}`);
    
    // You can also pass additional data via state if needed
    // navigate(`/app/dashboard/${assetId}`, { 
    //   state: { 
    //     assetId, 
    //     assetName,
    //     // Add any other data you want to pass
    //   } 
    // });
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

  // Implement search filtering and asset filtering
  const filteredLocations = useMemo(() => {
    let filtered = locationsData.map(location => ({ ...location, assets: [...location.assets] }));
    
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
      
      // Also filter assets within locations based on search
      filtered = filtered.map(location => ({
        ...location,
        assets: location.assets.filter(asset => 
          location.name.toLowerCase().includes(query) || 
          location.description.toLowerCase().includes(query) ||
          asset.name.toLowerCase().includes(query) || 
          asset.status.toLowerCase().includes(query)
        )
      }));
    }
    
    // Apply groupBy filter
    if (groupByFilter !== "All") {
      if (groupByFilter === "Running") {
        // Filter locations that have running generators
        filtered = filtered.filter(location => 
          location.assets.some(asset => asset.status === "Running")
        );
        // Only show running generators
        filtered = filtered.map(location => ({
          ...location,
          assets: location.assets.filter(asset => asset.status === "Running")
        }));
      } else if (groupByFilter === "Standby") {
        // Filter locations that have standby generators
        filtered = filtered.filter(location => 
          location.assets.some(asset => asset.status === "Standby")
        );
        // Only show standby generators
        filtered = filtered.map(location => ({
          ...location,
          assets: location.assets.filter(asset => asset.status === "Standby")
        }));
      } else if (groupByFilter === "Offline") {
        // Filter locations that have offline generators
        filtered = filtered.filter(location => 
          location.assets.some(asset => asset.status === "Offline")
        );
        // Only show offline generators
        filtered = filtered.map(location => ({
          ...location,
          assets: location.assets.filter(asset => asset.status === "Offline")
        }));
      } else if (groupByFilter === "Main") {
        filtered = filtered.filter(location => location.locationType === "Main");
      } else if (groupByFilter === "Gateway") {
        filtered = filtered.filter(location => location.locationType === "Gateway");
      }
    }
    
    // Remove locations that have no assets after filtering
    filtered = filtered.filter(location => location.assets.length > 0);
    
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
                {/* Left side - Location information */}
                <div className="simplified-location-info">
                  <div className="simplified-location-header">
                    <h2>{location.name}</h2>
                    <div className="simplified-location-description">
                      {location.description}
                    </div>
                  </div>
                </div>
                
                {/* Right side - Generator buttons */}
                <div className="simplified-asset-buttons">
                  {location.assets.map((asset) => (
                    <button 
                      key={asset.id} 
                      className={`simplified-asset-button ${asset.status.toLowerCase()}`}
                      onClick={() => handleSelectAsset(asset.id, asset.name)}
                    >
                      <span>{asset.name}</span>
                    </button>
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