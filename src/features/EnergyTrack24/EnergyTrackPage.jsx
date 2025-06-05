import React, { useState } from 'react';
import './EnergytrackPage.css';

const EnergyTrack = () => {
  const [activeSection, setActiveSection] = useState('power-usage');

  const subNavItems = [
    { id: 'power-usage', label: 'Power Usage' },
    { id: 'efficiency', label: 'Efficiency' },
    { id: 'alarms', label: 'Alarms' },
    { id: 'maintenance', label: 'Maintenance' }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'power-usage':
        return (
          <div className="section-content">
            <h2>Power Usage Dashboard</h2>
            <div className="cards-grid">
              <div className="info-card">
                <h3>Current Usage</h3>
                <p className="metric">1,250 kW</p>
              </div>
              <div className="info-card">
                <h3>Peak Usage Today</h3>
                <p className="metric">1,850 kW</p>
              </div>
              <div className="info-card">
                <h3>Average Usage</h3>
                <p className="metric">1,125 kW</p>
              </div>
            </div>
          </div>
        );
      case 'efficiency':
        return (
          <div className="section-content">
            <h2>Efficiency Monitoring</h2>
            <div className="cards-grid">
              <div className="info-card">
                <h3>Overall Efficiency</h3>
                <p className="metric">87.5%</p>
              </div>
              <div className="info-card">
                <h3>Fuel Efficiency</h3>
                <p className="metric">92.3%</p>
              </div>
              <div className="info-card">
                <h3>Performance Score</h3>
                <p className="metric">A+</p>
              </div>
            </div>
          </div>
        );
      case 'alarms':
        return (
          <div className="section-content">
            <h2>System Alarms</h2>
            <div className="alarms-list">
              <div className="alarm-item warning">
                <span className="alarm-icon">⚠️</span>
                <div className="alarm-details">
                  <h4>High Temperature Warning</h4>
                  <p>Generator 3 - Temperature exceeding normal range</p>
                  <small>2 minutes ago</small>
                </div>
              </div>
              <div className="alarm-item info">
                <span className="alarm-icon">ℹ️</span>
                <div className="alarm-details">
                  <h4>Maintenance Reminder</h4>
                  <p>Scheduled maintenance due in 48 hours</p>
                  <small>1 hour ago</small>
                </div>
              </div>
            </div>
          </div>
        );
      case 'maintenance':
        return (
          <div className="section-content">
            <h2>Maintenance Schedule</h2>
            <div className="maintenance-timeline">
              <div className="maintenance-item">
                <div className="maintenance-date">
                  <span className="date">Dec 15</span>
                  <span className="status upcoming">Upcoming</span>
                </div>
                <div className="maintenance-details">
                  <h4>Routine Inspection</h4>
                  <p>Generator 1 & 2 - Weekly maintenance check</p>
                </div>
              </div>
              <div className="maintenance-item">
                <div className="maintenance-date">
                  <span className="date">Dec 20</span>
                  <span className="status scheduled">Scheduled</span>
                </div>
                <div className="maintenance-details">
                  <h4>Oil Change</h4>
                  <p>All generators - Quarterly oil replacement</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="energy-track-container">
      <div className="energy-track-header">
        <h1>Energy Track 24/7</h1>
      </div>
      
      {/* Sub Navigation Bar */}
      <div className="sub-nav-bar">
        {subNavItems.map((item) => (
          <button
            key={item.id}
            className={`sub-nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Dynamic Section Content */}
      <div className="section-container">
        {renderSection()}
      </div>
    </div>
  );
};

export default EnergyTrack;