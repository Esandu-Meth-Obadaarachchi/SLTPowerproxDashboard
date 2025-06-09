import React from 'react';
import './StatusCard.css';

const StatusCard = ({ title, value, icon, color }) => (
  <div className="status-card" style={{ borderLeftColor: color}}>
    <div className="status-card-content">
      <div className="status-card-header">
        <div className="status-card-icon" style={{ color }}>
          {icon}
        </div>
        <div className="status-card-info">
          <h3 className="status-card-value">{value}</h3>
          <p className="status-card-title">{title}</p>
        </div>
      </div>
    </div>
  </div>
);

export default StatusCard;