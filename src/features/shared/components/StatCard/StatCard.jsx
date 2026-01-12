import React from 'react';
import "../../../../styles/Components/StatCard.css";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-title">{title}</div>
      <div className={`stat-icon ${title.toLowerCase().includes('generator') ? 'generator-icon' : 'location-icon'}`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;