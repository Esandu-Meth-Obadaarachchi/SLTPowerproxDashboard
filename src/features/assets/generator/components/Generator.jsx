import React, { useState } from 'react';
import { Home, AlertTriangle, Zap, Activity, Settings, Power, Fuel, Battery, Thermometer } from 'lucide-react';
import './GeneratorDashboard.css';

const GeneratorDashboard = () => {
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  const tabs = ['OVERVIEW', 'ELECTRICAL', 'MECHANICAL', 'ALARMS'];

  // Mock data
  const alarmData = [
    { time: '2025-03-27 10:30', originator: 'Gen_HQb2_1', type: 'Overheating', severity: 'High', status: 'Active', assignee: 'Admin' },
    { time: '2025-03-27 09:15', originator: 'Gen_DRii2', type: 'Disk Failure', severity: 'Critical', status: 'Acknowledged', assignee: 'Admin' },
    { time: '2025-03-27 08:45', originator: 'Gen_WPN2_2', type: 'Offline', severity: 'Medium', status: 'Resolved', assignee: 'Tech Team' }
  ];

  const StatusCard = ({ icon: Icon, value, label, color = 'blue' }) => (
    <div className="status-card">
      <div className="status-card-content">
        <div className={`status-icon ${color}`}>
          <Icon size={32} />
        </div>
        <div className="status-info">
          <div className="status-value">{value}</div>
          <div className="status-label">{label}</div>
        </div>
      </div>
    </div>
  );

  const CircularGauge = ({ value, max, label, unit, color = 'blue' }) => {
    const percentage = (value / max) * 100;
    const strokeDasharray = `${percentage * 2.83} 283`;
    
    return (
      <div className="circular-gauge">
        <div className="gauge-content">
          <div className="gauge-circle">
            <svg viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#374151" 
                strokeWidth="6"
              />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke={getColorValue(color)}
                strokeWidth="6" 
                strokeDasharray={strokeDasharray}
                strokeLinecap="round"
                className="gauge-progress"
              />
            </svg>
            <div className="gauge-center">
              <div className="gauge-value">{value}</div>
              <div className="gauge-unit">{unit}</div>
            </div>
          </div>
          <div className="gauge-label">{label}</div>
        </div>
      </div>
    );
  };

  const MetricCard = ({ label, value, unit }) => (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">
        {value} <span className="metric-unit">{unit}</span>
      </div>
    </div>
  );

  const getColorValue = (color) => {
    const colors = {
      blue: '#60A5FA',
      green: '#34D399',
      yellow: '#FBBF24',
      red: '#F87171',
      purple: '#A78BFA'
    };
    return colors[color] || colors.blue;
  };

  const getSeverityClass = (severity) => {
    switch(severity) {
      case 'Critical': return 'critical';
      case 'High': return 'high';
      case 'Medium': return 'medium';
      default: return 'low';
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Active': return 'active';
      case 'Acknowledged': return 'acknowledged';
      case 'Resolved': return 'resolved';
      default: return 'unknown';
    }
  };

  const OverviewTab = () => (
    <div className="tab-content-dashboard">
      <div className="status-grid">
        <StatusCard icon={Fuel} value="38%" label="Day Tank Fuel" color="yellow" />
        <StatusCard icon={Battery} value="9V" label="Battery Status" color="blue" />
        <StatusCard icon={Thermometer} value="197°C" label="Coolant Temp" color="red" />
      </div>
      
      <div className="overview-grid">
        <div className="card">
          <h3 className="card-title">
            <Activity size={20} />
            System Status
          </h3>
          <div className="gauge-grid">
            <CircularGauge value={1200} max={3000} label="RPM" unit="RPM" color="blue" />
            <CircularGauge value={49} max={60} label="Frequency" unit="Hz" color="green" />
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">
            <AlertTriangle size={20} />
            Recent Alarms
          </h3>
          <div className="alarm-list">
            {alarmData.slice(0, 3).map((alarm, index) => (
              <div key={index} className="alarm-item">
                <div className="alarm-info">
                  <AlertTriangle size={20} className={`alarm-icon ${getSeverityClass(alarm.severity)}`} />
                  <div className="alarm-details">
                    <div className="alarm-type">{alarm.type}</div>
                    <div className="alarm-originator">{alarm.originator}</div>
                  </div>
                </div>
                <div className={`alarm-status ${getStatusClass(alarm.status)}`}>
                  {alarm.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ElectricalTab = () => (
    <div className="tab-content-dashboard">
      <div className="gauge-grid-3">
        <CircularGauge value={214} max={450} label="L1-N" unit="V" color="blue" />
        <CircularGauge value={291} max={450} label="L2-N" unit="V" color="blue" />
        <CircularGauge value={269} max={450} label="L3-N" unit="V" color="blue" />
      </div>

      <div className="electrical-grid">
        <div className="card">
          <h3 className="card-title">Line Voltages</h3>
          <div className="metrics-grid">
            <MetricCard label="L1_L2" value="219.00" unit="V" />
            <MetricCard label="L2_L3" value="213.00" unit="V" />
            <MetricCard label="L3_L1" value="283.00" unit="V" />
            <MetricCard label="L1" value="41.00" unit="V" />
            <MetricCard label="L2" value="43.00" unit="V" />
            <MetricCard label="L3" value="28.00" unit="V" />
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Power Metrics</h3>
          <div className="gauge-grid-3">
            <CircularGauge value={106} max={2000} label="Active Power" unit="kW" color="green" />
            <CircularGauge value={750} max={2000} label="Apparent Power" unit="kVA" color="yellow" />
            <CircularGauge value={610} max={2000} label="Reactive Power" unit="kVAr" color="purple" />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Power Factor</h3>
        <div className="power-factor-grid">
          <MetricCard label="L1" value="0.65" unit="" />
          <MetricCard label="L2" value="0.11" unit="" />
          <MetricCard label="L3" value="0.30" unit="" />
        </div>
      </div>
    </div>
  );

  const MechanicalTab = () => (
    <div className="tab-content-dashboard">
      <div className="gauge-grid-4">
        <CircularGauge value={1200} max={3000} label="RPM" unit="RPM" color="blue" />
        <CircularGauge value={197} max={250} label="Coolant Temp" unit="°C" color="red" />
        <CircularGauge value={288} max={400} label="Oil Pressure" unit="bar" color="yellow" />
        <CircularGauge value={49} max={60} label="Frequency" unit="Hz" color="green" />
      </div>

      <div className="mechanical-grid">
        <div className="card">
          <h3 className="card-title">Fuel System</h3>
          <div className="fuel-grid">
            <CircularGauge value={38} max={100} label="Day Tank" unit="%" color="yellow" />
            <MetricCard label="Number of Starts" value="0" unit="" />
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Energy Metrics</h3>
          <div className="energy-grid">
            <MetricCard label="kWh" value="706.00" unit="kWh" />
            <MetricCard label="kVAh" value="751.00" unit="kVAh" />
            <MetricCard label="kVarh" value="818.00" unit="kVarh" />
          </div>
        </div>
      </div>
    </div>
  );

  const AlarmsTab = () => (
    <div className="tab-content-dashboard">
      <div className="card">
        <div className="alarm-header">
          <h3 className="card-title">Alarms - Real Time (Last Day)</h3>
          <div className="alarm-actions">
            <button className="action-button">
              <Activity size={16} />
            </button>
            <button className="action-button">
              <Settings size={16} />
            </button>
          </div>
        </div>
        
        <div className="alarm-table-container">
          <table className="alarm-table">
            <thead>
              <tr>
                <th>Created Time</th>
                <th>Originator</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Assignee</th>
              </tr>
            </thead>
            <tbody>
              {alarmData.map((alarm, index) => (
                <tr key={index}>
                  <td>{alarm.time}</td>
                  <td>{alarm.originator}</td>
                  <td>{alarm.type}</td>
                  <td>
                    <span className={`severity-badge ${getSeverityClass(alarm.severity)}`}>
                      {alarm.severity}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(alarm.status)}`}>
                      {alarm.status}
                    </span>
                  </td>
                  <td>{alarm.assignee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'OVERVIEW':
        return <OverviewTab />;
      case 'ELECTRICAL':
        return <ElectricalTab />;
      case 'MECHANICAL':
        return <MechanicalTab />;
      case 'ALARMS':
        return <AlarmsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-icon">
              <Home size={32} />
            </div>
            <div className="header-text">
              <h1>Generator Dashboard</h1>
              <p>Monitor and manage generator systems across all locations</p>
            </div>
          </div>
          <div className="header-right">
            <div className="last-update">
              <div className="update-label">Last Update</div>
              <div className="update-time">1w ago</div>
            </div>
            <div className="power-icon">
              <Power size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-dashboard">
        {/* Summary Cards */}
        <div className="summary-cards">
          <StatusCard icon={Power} value="Standby" label="Generator Status" color="green" />
          <StatusCard icon={AlertTriangle} value="3" label="Active Alarms" color="yellow" />
          <StatusCard icon={Thermometer} value="197°C" label="Average Temp" color="blue" />
          <StatusCard icon={Zap} value="630 kW" label="Total Capacity" color="green" />
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default GeneratorDashboard;