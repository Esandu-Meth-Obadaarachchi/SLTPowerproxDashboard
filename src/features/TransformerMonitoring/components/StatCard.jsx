import React from 'react';
import './StatCard.css';

export const StatCircle = ({ label, value, max, unit, icon, color }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="circle-stat-card">
      <div className="circle-wrap">
        <svg viewBox="0 0 36 36" className="circular-chart">
          <path
            className="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            stroke={color}
            strokeDasharray={`${percentage}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="circle-text">
          <span className="circle-icon">{icon}</span>
          <div className="circle-value">{value} {unit}</div>
        </div>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export const StatDigital = ({ label, value, icon }) => (
  <div className="panel-stat-card">
    <div className="icon-wrap">{icon}</div>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
  </div>
);
