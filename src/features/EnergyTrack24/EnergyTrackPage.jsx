import React, { useState } from 'react';
import './EnergytrackPage.css';
import { powerData } from './EnergyTrackData';
import PowerUsageSection from './PowerUsageSection';
import EfficiencySection from './EfficiencySection';
import MaintenanceSection from './MaintenanceSection';

const EnergyTrack = () => {
  const [activeSection, setActiveSection] = useState('power-usage');
  const [timeRange, setTimeRange] = useState('live');
  const [reportType, setReportType] = useState('Power Usage');
  const [reportTimeRange, setReportTimeRange] = useState('Last 7 Days');

  const subNavItems = [
    { id: 'power-usage', label: 'Power Usage' },
    { id: 'efficiency', label: 'Efficiency' },
    { id: 'alarms', label: 'Alarms' },
    { id: 'maintenance', label: 'Maintenance' }
  ];

  const timeRangeOptions = [
    { value: 'live', label: 'Live' },
    { value: 'day', label: 'Past Day' },
    { value: 'week', label: 'Past Week' },
    { value: 'month', label: 'Past Month' },
    { value: 'year', label: 'Past Year' }
  ];

  const getCurrentData = () => {
    return powerData[timeRange] || powerData.live;
  };

  // Mock data for efficiency and maintenance sections
  const getMockEfficiencyData = () => ({
    pueByLocation: [
      { time: 'Jan', hq: 1.2, east: 1.3, west: 1.1, north: 1.4 },
      { time: 'Feb', hq: 1.1, east: 1.2, west: 1.0, north: 1.3 },
      { time: 'Mar', hq: 1.3, east: 1.4, west: 1.2, north: 1.5 },
      { time: 'Apr', hq: 1.2, east: 1.3, west: 1.1, north: 1.4 },
      { time: 'May', hq: 1.4, east: 1.5, west: 1.3, north: 1.6 },
      { time: 'Jun', hq: 1.3, east: 1.4, west: 1.2, north: 1.5 }
    ],
    upsEfficiency: [
      { time: 'Jan', hq: 95, east: 94, west: 96, north: 93 },
      { time: 'Feb', hq: 96, east: 95, west: 97, north: 94 },
      { time: 'Mar', hq: 94, east: 93, west: 95, north: 92 },
      { time: 'Apr', hq: 95, east: 94, west: 96, north: 93 },
      { time: 'May', hq: 93, east: 92, west: 94, north: 91 },
      { time: 'Jun', hq: 94, east: 93, west: 95, north: 92 }
    ],
    coolingEfficiency: [
      { time: 'Jan', hq: 85, east: 84, west: 86, north: 83 },
      { time: 'Feb', hq: 86, east: 85, west: 87, north: 84 },
      { time: 'Mar', hq: 84, east: 83, west: 85, north: 82 },
      { time: 'Apr', hq: 85, east: 84, west: 86, north: 83 },
      { time: 'May', hq: 83, east: 82, west: 84, north: 81 },
      { time: 'Jun', hq: 84, east: 83, west: 85, north: 82 }
    ]
  });

  const getMockMaintenanceData = () => ({
    completionRate: [
      { time: 'Jan', completed: 85, pending: 15 },
      { time: 'Feb', completed: 90, pending: 10 },
      { time: 'Mar', completed: 88, pending: 12 },
      { time: 'Apr', completed: 92, pending: 8 },
      { time: 'May', completed: 87, pending: 13 },
      { time: 'Jun', completed: 89, pending: 11 }
    ],
    maintenanceByAssetType: [
      { time: 'Jan', hq: 12, east: 8, west: 10, north: 6 },
      { time: 'Feb', hq: 15, east: 10, west: 12, north: 8 },
      { time: 'Mar', hq: 11, east: 7, west: 9, north: 5 },
      { time: 'Apr', hq: 14, east: 9, west: 11, north: 7 },
      { time: 'May', hq: 13, east: 8, west: 10, north: 6 },
      { time: 'Jun', hq: 16, east: 11, west: 13, north: 9 }
    ],
    maintenanceByLocation: [
      { time: 'Jan', hq: 20, east: 15, west: 18, north: 12 },
      { time: 'Feb', hq: 22, east: 17, west: 20, north: 14 },
      { time: 'Mar', hq: 19, east: 14, west: 17, north: 11 },
      { time: 'Apr', hq: 21, east: 16, west: 19, north: 13 },
      { time: 'May', hq: 23, east: 18, west: 21, north: 15 },
      { time: 'Jun', hq: 24, east: 19, west: 22, north: 16 }
    ]
  });

  const renderSection = () => {
    const currentData = getCurrentData();
    
    switch (activeSection) {
      case 'power-usage':
        return (
          <PowerUsageSection
            data={currentData}
            reportType={reportType}
            setReportType={setReportType}
            reportTimeRange={reportTimeRange}
            setReportTimeRange={setReportTimeRange}
          />
        );
      case 'efficiency':
        return (
          <EfficiencySection
            data={getMockEfficiencyData()}
            reportType={reportType}
            setReportType={setReportType}
            reportTimeRange={reportTimeRange}
            setReportTimeRange={setReportTimeRange}
          />
        );
      case 'maintenance':
        return (
          <MaintenanceSection
            data={getMockMaintenanceData()}
            reportType={reportType}
            setReportType={setReportType}
            reportTimeRange={reportTimeRange}
            setReportTimeRange={setReportTimeRange}
          />
        );
      case 'alarms':
        return (
          <div className="section-content">
            <h2>System Alarms</h2>
            <p>Coming soon...</p>
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
      
      {/* Sub Navigation Bar with Time Range Dropdown */}
      <div className="sub-nav-container">
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
        
        <div className="time-range-dropdown">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="dropdown-arrow">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Dynamic Section Content */}
      <div className="section-container">
        {renderSection()}
      </div>
    </div>
  );
};

export default EnergyTrack;