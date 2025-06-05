import React from 'react';
import './StatusCard.css';

const StatusCard = ({ title, value, icon, color }) => {
  return (
    <div className="status-card">
      <div className="status-card-content">
        <div className="status-icon" style={{ color: color }}>
          {icon}
        </div>
        <div className="status-info">
          <div className="status-value">{value}</div>
          <div className="status-title">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;