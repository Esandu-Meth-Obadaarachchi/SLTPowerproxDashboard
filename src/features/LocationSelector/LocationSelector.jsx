import React, { useState, useMemo } from "react";
import "../../styles/Pages/locationSelector/LocationSelector.css";
import { useNavigate } from "react-router-dom";
import {ReactComponent as GeneratorIcon} from "../../features/shared/images/generator6.svg"; // Import your generator icon

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
  };

  // Function to shorten generator names (e.g., GEN_HQb_1 -> HQ1)
  const shortenGeneratorName = (name) => {
    // Extract the part between underscores and the number
    const parts = name.split('_');
    if (parts.length >= 3) {
      const locationPart = parts[1]; // e.g., "HQb", "OTS", "WA"
      const numberPart = parts[2]; // e.g., "1", "2"
      
      // Remove 'b' or other suffixes and take first 2-3 characters
      const locationShort = locationPart.replace(/[a-z]/g, '').substring(0, 2) || 
                           locationPart.substring(0, 2).toUpperCase();
      
      return `${locationShort}${numberPart}`;
    }
    
    // Fallback: just take first 3 characters
    return name.substring(0, 3).toUpperCase();
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

  // Get all generators from all locations for the bottom section
  const getAllGenerators = () => {
    const allGenerators = [];
    locationsData.forEach(location => {
      location.assets.forEach(asset => {
        allGenerators.push({
          ...asset,
          locationName: location.name,
          locationId: location.id
        });
      });
    });
    return allGenerators;
  };

  // Implement filtering logic
  const { filteredLocations, remainingGenerators } = useMemo(() => {
  // Start with a copy of locations and their assets
  let filtered = locationsData.map(location => ({
    ...location,
    assets: [...location.assets],
  }));

  // Apply search filter (affects locations + assets)
  if (searchQuery) {
    const query = searchQuery.toLowerCase();

    filtered = filtered
      .filter(location =>
        location.name.toLowerCase().includes(query) ||
        location.description.toLowerCase().includes(query) ||
        location.assets.some(asset =>
          asset.name.toLowerCase().includes(query) ||
          asset.status.toLowerCase().includes(query)
        )
      )
      .map(location => ({
        ...location,
        assets: location.assets.filter(asset =>
          location.name.toLowerCase().includes(query) ||
          location.description.toLowerCase().includes(query) ||
          asset.name.toLowerCase().includes(query) ||
          asset.status.toLowerCase().includes(query)
        )
      }));
  }

  const allGenerators = getAllGenerators();
  let locationsToShow = [];
  let targetGenerators = [];

  switch (groupByFilter) {
    case "All":
      // Top: show all locations (empty assets array so no generator buttons)
      locationsToShow = filtered.map(loc => ({ ...loc, assets: [] }));

      // Bottom: all generators from all locations
      targetGenerators = allGenerators;
      break;

    case "Running":
    case "Standby":
    case "Offline":
      targetGenerators = allGenerators.filter(
        gen => gen.status === groupByFilter
      );
      break;

    case "Main":
    case "Gateway":
      const typeLocations = filtered.filter(
        location => location.locationType === groupByFilter
      );
      typeLocations.forEach(location => {
        location.assets.forEach(asset => {
          targetGenerators.push({
            ...asset,
            locationName: location.name,
            locationId: location.id,
          });
        });
      });
      break;

    default:
      targetGenerators = allGenerators;
  }

  // If not "All", group generators into locations for top section
  if (groupByFilter !== "All") {
    const targetIds = new Set(targetGenerators.map(gen => gen.id));
    locationsToShow = filtered
      .map(location => ({
        ...location,
        assets: location.assets.filter(asset => targetIds.has(asset.id)),
      }))
      .filter(location => location.assets.length > 0);
  }

  // Remaining generators (ones not shown in locations)
  let remaining = [];
  if (groupByFilter !== "All") {
    const shownIds = new Set();
    locationsToShow.forEach(location =>
      location.assets.forEach(asset => shownIds.add(asset.id))
    );

    remaining = allGenerators.filter(gen => !shownIds.has(gen.id));
  }

  // Apply search to remaining
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    remaining = remaining.filter(
      gen =>
        gen.name.toLowerCase().includes(query) ||
        gen.status.toLowerCase().includes(query) ||
        gen.locationName.toLowerCase().includes(query)
    );
  }

  return {
    filteredLocations: locationsToShow,
    remainingGenerators: groupByFilter === "All" ? targetGenerators : remaining,
  };
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
              <option value="All">General</option>
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
        {/* Filtered Locations Section */}
        {filteredLocations.length > 0 && (
          <div className="filtered-locations-section">
            <h3 className="section-title">
              {groupByFilter === "All" ? "All Locations" : `${groupByFilter} Generators`}
            </h3>
            {filteredLocations.map((location) => {
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
                  
                  {/* Right side - Generator cards */}
                  <div className="simplified-asset-buttons">
                    {location.assets.map((asset) => (
                      <div 
                        key={asset.id} 
                        className={`generator-card ${asset.status.toLowerCase()}`}
                        onClick={() => handleSelectAsset(asset.id, asset.name)}
                        title={`${asset.name} - ${asset.status} (Last checked: ${asset.lastChecked})`}
                      >
                        {/* Status indicator circle */}
                        <div className={`status-circle ${asset.status.toLowerCase()}`}></div>
                        
                        {/* Generator icon */}
                        <div className="generator-icon">
                          <GeneratorIcon className="w-6 h-6 text-current" />
                        </div>
                        
                        {/* Generator name */}
                        <div className="generator-name">
                          {shortenGeneratorName(asset.name)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* All Generators Section (Bottom) */}
        {remainingGenerators.length > 0 && (
          <div className="all-generators-section">
            <h3 className="section-title">
              {groupByFilter === "All" ? "All Generators" : "Other Generators"}
            </h3>
            <div className="generators-grid">
              {remainingGenerators.map((generator) => (
                <div 
                  key={generator.id} 
                  className={`generator-card ${generator.status.toLowerCase()}`}
                  onClick={() => handleSelectAsset(generator.id, generator.name)}
                  title={`${generator.name} - ${generator.status} (Last checked: ${generator.lastChecked}) - ${generator.locationName}`}
                >
                  {/* Status indicator circle */}
                  <div className={`status-circle ${generator.status.toLowerCase()}`}></div>
                  
                  {/* Generator icon */}
                  <div className="generator-icon">
                    <GeneratorIcon className="w-6 h-6 text-current" />
                  </div>
                  
                  {/* Generator name */}
                  <div className="generator-name">
                    {shortenGeneratorName(generator.name)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No results message */}
        {filteredLocations.length === 0 && remainingGenerators.length === 0 && (
          <div className="no-results">No matching generators found</div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;