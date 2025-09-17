
import React from "react";

const MetricCard = ({ label, value, unit }) => (
  <div className="metric-card">
    <div className="metric-label">{label}</div>
    <div className="metric-value">
      {value} <span className="metric-unit">{unit}</span>
    </div>
  </div>
);

export default MetricCard;
