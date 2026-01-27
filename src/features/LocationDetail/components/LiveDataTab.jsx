import React from 'react';
import { Activity, Zap } from 'lucide-react';

// Available floors for the dropdown (easily configurable)
const AVAILABLE_FLOORS = ["1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor"];

// Mock function to modify metrics based on floor
const getFloorModifiedMetrics = (baseMetrics, selectedFloor) => {
  if (!baseMetrics) return baseMetrics;
  
  // Extract floor number from string (e.g., "3rd Floor" -> 3)
  const floorNumber = parseInt(selectedFloor.match(/\d+/)[0]);
  
  // Apply a multiplier based on floor (higher floors have slightly different loads)
  const floorMultiplier = 1 + (floorNumber - 3) * 0.1; // 3rd floor is baseline
  
  const parseValue = (str) => {
    const num = parseFloat(str);
    return isNaN(num) ? 0 : num;
  };
  
  return {
    itLoad: `${(parseValue(baseMetrics.itLoad) * floorMultiplier).toFixed(2)} KW`,
    acLoad: `${(parseValue(baseMetrics.acLoad) * floorMultiplier).toFixed(2)} KW`,
    totalLoad: `${(parseValue(baseMetrics.totalLoad) * floorMultiplier).toFixed(2)} KW`
  };
};

// MetricValue Helper Component
const MetricValue = ({ value, loading }) => {
  if (loading) {
    return <div className="metric-skeleton"></div>;
  }
  return <>{value}</>;
};

const LiveDataTab = ({ 
  locationData, 
  generatorStatusColors, 
  error, 
  loading = false,
  selectedFloor = "3rd Floor",
  setSelectedFloor
}) => {
  // Guard clause: Show loading state if data is not yet available
  if (!locationData) {
    return (
      <div className="loading-container">
        <div className="chart-loader-container">
          <div className="chart-spinner"></div>
          <p className="chart-loading-text">Loading location data...</p>
        </div>
      </div>
    );
  }

  // Ensure all required nested properties exist with safe defaults
  const generators = locationData.generators || [];
  const baseMetrics = locationData.metrics || {
    itLoad: '0.00 KW',
    acLoad: '0.00 KW',
    totalLoad: '0.00 KW'
  };
  
  // Apply floor-based modifications to metrics
  const metrics = getFloorModifiedMetrics(baseMetrics, selectedFloor);
  
  const locationName = locationData.name || 'Unknown Location';

  return (
    <div className="live-data-container">
      {/* Enhanced Generators Section */}
      <div className="generators-section-enhanced">
        <div className="section-header">
          <div className="section-title-wrapper">
            <Zap className="section-icon" size={28} />
            <h2 className="section-title-main">Floor Overview</h2>
          </div>
          {/* Floor Selector Dropdown with Label */}
          <div className="floor-selector-wrapper">
            <span className="floor-selector-label">Floor:</span>
            <select 
              className="floor-selector"
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
            >
              {AVAILABLE_FLOORS.map((floor) => (
                <option key={floor} value={floor}>
                  {floor}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Facility Metrics Overview */}
        <div className="facility-metrics-card">
          <h3 className="metrics-title">Facility Load Overview</h3>
          <div className="load-circles-enhanced">
            <div className="load-circle-enhanced it-load">
              <div className="load-icon-wrapper">
                <Activity size={24} />
              </div>
              <div className="load-value-large">
                <MetricValue 
                  value={metrics.itLoad}
                  loading={loading}
                />
              </div>
              <div className="load-label-enhanced">IT Load</div>
            </div>
            <div className="load-circle-enhanced ac-load">
              <div className="load-icon-wrapper">
                <Zap size={24} />
              </div>
              <div className="load-value-large">
                <MetricValue 
                  value={metrics.acLoad}
                  loading={loading}
                />
              </div>
              <div className="load-label-enhanced">AC Load</div>
            </div>
            <div className="load-circle-enhanced total-load">
              <div className="load-icon-wrapper">
                <Activity size={24} />
              </div>
              <div className="load-value-large">
                <MetricValue 
                  value={metrics.totalLoad}
                  loading={loading}
                />
              </div>
              <div className="load-label-enhanced">Total Load</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message-enhanced">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveDataTab;