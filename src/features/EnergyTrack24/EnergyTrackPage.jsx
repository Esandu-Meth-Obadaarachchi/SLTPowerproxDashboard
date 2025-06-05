import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './EnergytrackPage.css';
import { powerData } from './EnergyTrackData';

const EnergyTrack = () => {
  const [activeSection, setActiveSection] = useState('power-usage');
  const [timeRange, setTimeRange] = useState('live');
  const [reportType, setReportType] = useState('Power Usage');
  const [reportTimeRange, setReportTimeRange] = useState('Last 7 Days');

  const subNavItems = [
    { id: 'power-usage', label: 'Power Usage' },
    { id: 'efficiency', label: 'Efficiency' },
    { id: 'alarms', label: 'Alarms' },
    { id: 'maintenance', label: 'maintenance' }
  ];

  const timeRangeOptions = [
    { value: 'live', label: 'Live' },
    { value: 'day', label: 'Past Day' },
    { value: 'week', label: 'Past Week' },
    { value: 'month', label: 'Past Month' },
    { value: 'year', label: 'Past Year' }
  ];

  const reportTypes = [
    'Power Usage',
    'Efficiency Report',
    'Maintenance Log',
    'Alarm History'
  ];

  const reportTimeRanges = [
    'Last 24 Hours',
    'Last 7 Days',
    'Last 30 Days',
    'Last 3 Months',
    'Last Year'
  ];

  const getCurrentData = () => {
    return powerData[timeRange] || powerData.live;
  };

  const renderPowerUsageSection = () => {
    const data = getCurrentData();
    
    return (
      <div className="power-usage-section">
        {/* Three Graph Containers */}
        <div className="graphs-container">
          {/* Power Consumption Graph */}
          <div className="graph-card">
            <h3>Power Consumption (Last 12 Months)</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data.consumption}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="hq" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    name="HQ"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="east" 
                    stroke="#06b6d4" 
                    strokeWidth={2}
                    dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                    name="East"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="west" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    name="West"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="north" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                    name="North"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Power Consumption by Location */}
          <div className="graph-card">
            <h3>Power Consumption by Location</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data.byLocation}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="hq" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    name="HQ"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="east" 
                    stroke="#06b6d4" 
                    strokeWidth={2}
                    dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                    name="East"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="west" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    name="West"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="north" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                    name="North"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Power Consumption by Asset Type */}
          <div className="graph-card">
            <h3>Power Consumption by Asset Type</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data.byAssetType}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="hq" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    name="HQ"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="east" 
                    stroke="#06b6d4" 
                    strokeWidth={2}
                    dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                    name="East"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="west" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    name="West"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="north" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                    name="North"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Generate Report Section */}
        <div className="generate-report-section">
          <h3>Generate A Report</h3>
          <div className="report-controls">
            <div className="report-control">
              <label>Report Type</label>
              <select 
                value={reportType} 
                onChange={(e) => setReportType(e.target.value)}
                className="report-select"
              >
                {reportTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="report-control">
              <label>Time Range</label>
              <select 
                value={reportTimeRange} 
                onChange={(e) => setReportTimeRange(e.target.value)}
                className="report-select"
              >
                {reportTimeRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <button className="generate-report-btn">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'power-usage':
        return renderPowerUsageSection();
      case 'efficiency':
        return (
          <div className="section-content">
            <h2>Efficiency Monitoring</h2>
            <p>Coming soon...</p>
          </div>
        );
      case 'alarms':
        return (
          <div className="section-content">
            <h2>System Alarms</h2>
            <p>Coming soon...</p>
          </div>
        );
      case 'maintenance':
        return (
          <div className="section-content">
            <h2>Maintenance Schedule</h2>
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