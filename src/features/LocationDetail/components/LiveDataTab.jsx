import React from 'react';
import { Activity, Zap } from 'lucide-react';

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
  loading = false
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
  const metrics = locationData.metrics || {
    itLoad: '0.00 KW',
    acLoad: '0.00 KW',
    totalLoad: '0.00 KW'
  };
  const locationName = locationData.name || 'Unknown Location';

  return (
    <div className="live-data-container">
      {/* Enhanced Generators Section */}
      <div className="generators-section-enhanced">
        <div className="section-header">
          <div className="section-title-wrapper">
            <Zap className="section-icon" size={28} />
            <h2 className="section-title-main">Generator Status Monitor</h2>
          </div>
          <div className="facility-badge">
            {locationName}
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