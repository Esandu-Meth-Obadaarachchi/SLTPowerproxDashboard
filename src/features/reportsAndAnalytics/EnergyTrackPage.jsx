import React, { useState } from 'react';
import '../../styles/Pages/reportsAndAnalytics/EnergytrackPage.css';
import { powerData, efficiencyData, maintenanceData, alarmsData, statCardsData } from './EnergyTrackData';
import PowerUsageSection from './PowerUsageSection';
import EfficiencySection from './EfficiencySection';
import MaintenanceSection from './MaintenanceSection';
import AlarmsSection from './AlarmsSection';
import StatCard from '../shared/components/StatCard/StatCard';

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
    { value: 'day', label: 'Days' },
    { value: 'week', label: 'Weeks' },
    { value: 'month', label: 'Months' },
    { value: 'year', label: 'Years' }
  ];

  // Icon components for stat cards
  const PowerIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  );

  const PUEIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  );

  const EmissionsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18"/>
      <path d="M6 6l12 12"/>
      <circle cx="12" cy="12" r="10"/>
    </svg>
  );

  const UptimeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  );

  const getCurrentData = () => {
    return powerData[timeRange] || powerData.live;
  };

  const getCurrentEfficiencyData = () => {
    return efficiencyData[timeRange] || efficiencyData.live;
  };

  const getCurrentMaintenanceData = () => {
    return maintenanceData[timeRange] || maintenanceData.live;
  };

  const getCurrentAlarmsData = () => {
    return alarmsData[timeRange] || alarmsData.live;
  };

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
            data={getCurrentEfficiencyData()}
            reportType={reportType}
            setReportType={setReportType}
            reportTimeRange={reportTimeRange}
            setReportTimeRange={setReportTimeRange}
          />
        );
      case 'alarms':
        return (
          <AlarmsSection
            data={getCurrentAlarmsData()}
            reportType={reportType}
            setReportType={setReportType}
            reportTimeRange={reportTimeRange}
            setReportTimeRange={setReportTimeRange}
          />
        );
      case 'maintenance':
        return (
          <MaintenanceSection
            data={getCurrentMaintenanceData()}
            reportType={reportType}
            setReportType={setReportType}
            reportTimeRange={reportTimeRange}
            setReportTimeRange={setReportTimeRange}
          />
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="energy-track-container">
      <div className="energy-track-header">
        <div className="header-left">
          <h1>Reports And Analysis</h1>
        </div>
        <div className="header-right">
          <div className="stat-cards-container">
            <StatCard 
              title="Total Power" 
              value={statCardsData.totalPower}
              icon={<PowerIcon />}
            />
            <StatCard 
              title="Average PUE" 
              value={statCardsData.averagePUE}
              icon={<PUEIcon />}
            />
            <StatCard 
              title="Carbon Emissions" 
              value={statCardsData.carbonEmissions}
              icon={<EmissionsIcon />}
            />
            <StatCard 
              title="Uptime" 
              value={statCardsData.uptime}
              icon={<UptimeIcon />}
            />
          </div>
        </div>
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
      <div className="recent-reports-section">
  <h3>Recent Reports</h3>
  <div className="reports-list">
    <div className="report-item">
      <div className="report-info">
        <h4>Monthly Power Consumption Report</h4>
        <p>Generated on May 15, 2025</p>
      </div>
      <button className="download-btn">
        <svg className="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7,10 12,15 17,10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download
      </button>
    </div>
    <div className="report-item">
      <div className="report-info">
        <h4>UPS System Performance Report</h4>
        <p>Generated on May 10, 2025</p>
      </div>
      <button className="download-btn">
        <svg className="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7,10 12,15 17,10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download
      </button>
    </div>
    <div className="report-item">
      <div className="report-info">
        <h4>Quaterly PUE Analysis</h4>
        <p>Generated on April 30, 2025</p>
      </div>
      <button className="download-btn">
        <svg className="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7,10 12,15 17,10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download
      </button>
    </div>
    <div className="report-item">
      <div className="report-info">
        <h4>Annual Carbon Emissions Report</h4>
        <p>Generated on April 15, 2025</p>
      </div>
      <button className="download-btn">
        <svg className="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7,10 12,15 17,10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download
      </button>
    </div>
    {/* Add more report items as needed */}
  </div>
</div>
    </div>
    
  );
  
};

export default EnergyTrack;