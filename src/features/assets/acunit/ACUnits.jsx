import React, { useState } from 'react';
import { Snowflake, AlertTriangle, Thermometer, Zap, Activity, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import "./ACUnits.css"
// Mock data for charts
const assetDistributionData = [
  { name: 'Normal', value: 16, color: '#10b981' },
  { name: 'Warning', value: 2, color: '#f59e0b' },
  { name: 'Critical', value: 0, color: '#ef4444' }
];

const acTemperatureData = [
  { location: 'East DC', temperature: 22.5, humidity: 45 },
  { location: 'HQ DC', temperature: 21.8, humidity: 42 },
  { location: 'North DC', temperature: 24.8, humidity: 48 },
  { location: 'West DC', temperature: 22.2, humidity: 43 },
  { location: 'South DC', temperature: 23.1, humidity: 46 }
];

const powerConsumptionData = [
  { time: '00:00', power: 420 },
  { time: '04:00', power: 380 },
  { time: '08:00', power: 450 },
  { time: '12:00', power: 520 },
  { time: '16:00', power: 580 },
  { time: '20:00', power: 490 },
  { time: '24:00', power: 430 }
];

const temperatureTrendData = [
  { time: '00:00', avgTemp: 22.1, targetTemp: 22.0 },
  { time: '04:00', avgTemp: 21.8, targetTemp: 22.0 },
  { time: '08:00', avgTemp: 22.3, targetTemp: 22.0 },
  { time: '12:00', avgTemp: 22.8, targetTemp: 22.0 },
  { time: '16:00', avgTemp: 23.2, targetTemp: 22.0 },
  { time: '20:00', avgTemp: 22.6, targetTemp: 22.0 },
  { time: '24:00', avgTemp: 22.4, targetTemp: 22.0 }
];

const StatusCard = ({ title, value, icon, color }) => (
 <div 
   className="status-card" 
   style={{ 
     borderLeftColor: color,
     transition: 'all 0.3s ease'
   }}
   onMouseEnter={(e) => {
     e.target.style.boxShadow = `0 16px 48px ${color}40`;
   }}
   onMouseLeave={(e) => {
     e.target.style.boxShadow = 'none';
   }}
 >
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

//  // Status Card component
// const StatusCard = ({ title, value, icon, color }) => (
//   <div className="status-card" style={{ borderLeftColor: color,box-shadow: 0 16px 48px color}}>
//     <div className="status-card-content">
//       <div className="status-card-header">
//         <div className="status-card-icon" style={{ color }}>
//           {icon}
//         </div>
//         <div className="status-card-info">
//           <h3 className="status-card-value">{value}</h3>
//           <p className="status-card-title">{title}</p>
//         </div>
//       </div>
//     </div>
//   </div>
);

// Chart Components
const AssetDistributionChart = ({ data, height = 300 }) => (
  <div className="chart-container" style={{ height }}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const ACTemperatureChart = ({ data, height = 300 }) => (
  <div className="chart-container" style={{ height }}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="location" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1a2235', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#ffffff'
          }} 
        />
        <Legend />
        <Bar dataKey="temperature" fill="#0077ff" name="Temperature (°C)" />
        <Bar dataKey="humidity" fill="#00f7ff" name="Humidity (%)" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const PowerConsumptionChart = ({ data = powerConsumptionData, height = 300 }) => (
  <div className="chart-container" style={{ height }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="time" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1a2235', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#ffffff'
          }} 
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="power" 
          stroke="#10b981" 
          strokeWidth={3}
          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
          name="Power (kW)"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const TemperatureTrendChart = ({ data = temperatureTrendData, height = 300 }) => (
  <div className="chart-container" style={{ height }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="time" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1a2235', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#ffffff'
          }} 
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="avgTemp" 
          stroke="#0077ff" 
          strokeWidth={3}
          dot={{ fill: '#0077ff', strokeWidth: 2, r: 4 }}
          name="Average Temperature (°C)"
        />
        <Line 
          type="monotone" 
          dataKey="targetTemp" 
          stroke="#00f7ff" 
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: '#00f7ff', strokeWidth: 2, r: 3 }}
          name="Target Temperature (°C)"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Tab Components
const ACOverviewTab = () => (
  <div className="tab-content-section">
    <div className="charts-grid">
      <div className="chart-section">
        <h3 className="chart-title">AC Units Status Distribution</h3>
        <AssetDistributionChart data={assetDistributionData} height={300} />
      </div>
      <div className="chart-section">
        <h3 className="chart-title">Temperature Distribution by Location</h3>
        <ACTemperatureChart data={acTemperatureData} height={300} />
      </div>
    </div>
  </div>
);

const ACCoolingTab = () => (
  <div className="tab-content-section">
    <div className="charts-grid single-column">
      <div className="chart-section">
        <h3 className="chart-title">Temperature Trends (Last 24 Hours)</h3>
        <TemperatureTrendChart data={temperatureTrendData} height={300} />
      </div>
      <div className="chart-section">
        <h3 className="chart-title">Humidity Trends (Last 24 Hours)</h3>
        <PowerConsumptionChart data={acTemperatureData.map(item => ({ time: item.location, power: item.humidity }))} height={300} />
      </div>
    </div>
  </div>
);

const ACElectricalTab = () => (
  <div className="tab-content-section">
    <div className="charts-grid single-column">
      <div className="chart-section">
        <h3 className="chart-title">Power Consumption Trends (Last 24 Hours)</h3>
        <PowerConsumptionChart data={powerConsumptionData} height={300} />
      </div>
      <div className="chart-section">
        <h3 className="chart-title">Efficiency Metrics (Last 24 Hours)</h3>
        <PowerConsumptionChart data={powerConsumptionData.map(item => ({ ...item, power: item.power * 0.92 }))} height={300} />
      </div>
    </div>
  </div>
);

const ACAlarmsTab = () => (
  <div className="tab-content-section">
    <div className="alarms-list">
      <div className="alarm-item warning">
        <div className="alarm-icon">
          <AlertTriangle size={20} />
        </div>
        <div className="alarm-content">
          <h4>High Temperature - CRAC-07</h4>
          <p>North Data Center - 09:45 AM</p>
        </div>
        <div className="alarm-status warning">Warning</div>
      </div>
      
      <div className="alarm-item warning">
        <div className="alarm-icon">
          <AlertTriangle size={20} />
        </div>
        <div className="alarm-content">
          <h4>Filter Replacement Due - CRAC-02</h4>
          <p>HQ Data Center - 3 days remaining</p>
        </div>
        <div className="alarm-status warning">Warning</div>
      </div>
      
      <div className="alarm-item resolved">
        <div className="alarm-icon">
          <Snowflake size={20} />
        </div>
        <div className="alarm-content">
          <h4>Maintenance Complete - CRAC-05</h4>
          <p>East Data Center - System restored</p>
        </div>
        <div className="alarm-status resolved">Resolved</div>
      </div>
    </div>
  </div>
);

const ACUnitsList = () => {
  const acUnits = [
    { id: 'CRAC-01', location: 'East Data Center', temp: 22.5, humidity: 45, status: 'Normal' },
    { id: 'CRAC-02', location: 'HQ Data Center', temp: 21.8, humidity: 42, status: 'Warning', issue: 'Filter' },
    { id: 'CRAC-03', location: 'HQ Data Center', temp: 22.2, humidity: 43, status: 'Normal' },
    { id: 'CRAC-07', location: 'North Data Center', temp: 24.8, humidity: 48, status: 'Warning', issue: 'High Temp' },
    { id: 'CRAC-08', location: 'North Data Center', temp: 22.6, humidity: 44, status: 'Normal' },
    ...Array.from({ length: 13 }, (_, i) => ({
      id: `CRAC-${String(i + 9).padStart(2, '0')}`,
      location: ['East Data Center', 'West Data Center', 'South Data Center'][i % 3],
      temp: (21 + Math.random() * 2).toFixed(1),
      humidity: Math.floor(40 + Math.random() * 10),
      status: 'Normal'
    }))
  ];

  return (
    <div className="ac-units-list-section">
      <h3 className="section-title">Precision AC Units</h3>
      <div className="units-list">
        {acUnits.map((unit, index) => (
          <div key={unit.id} className={`unit-item ${unit.status.toLowerCase()}`}>
            <div className="unit-info">
              <h4>{unit.id}</h4>
              <p>{unit.location} - {unit.temp}°C / {unit.humidity}% RH - {unit.status}{unit.issue ? ` (${unit.issue})` : ''}</p>
            </div>
            <div className={`unit-status ${unit.status.toLowerCase()}`}>
              {unit.status === 'Normal' ? <Snowflake size={16} /> : <AlertTriangle size={16} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ACUnits = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: 'Overview' },
    { id: 1, label: 'Cooling' },
    { id: 2, label: 'Electrical' },
    { id: 3, label: 'Alarms' }
  ];

  const statusCards = [
    {
      title: "Total AC Units",
      value: "18",
      icon: <Snowflake size={32} />,
      color: "#0077ff"
    },
    {
      title: "Warning Status",
      value: "2",
      icon: <AlertTriangle size={32} />,
      color: "#f59e0b"
    },
    {
      title: "Average Temp",
      value: "22.4°C",
      icon: <Thermometer size={32} />,
      color: "#06b6d4"
    },
    {
      title: "Total Capacity",
      value: "630 kW",
      icon: <Zap size={32} />,
      color: "#10b981"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <ACOverviewTab />;
      case 1:
        return <ACCoolingTab />;
      case 2:
        return <ACElectricalTab />;
      case 3:
        return <ACAlarmsTab />;
      default:
        return <ACOverviewTab />;
    }
  };

  return (
    <div className="ac-units-page">
      <div className="page-header">
        <h1 className="page-title">Precision AC Units</h1>
        <p className="page-subtitle">
          Monitor and manage all precision AC units across all locations
        </p>
      </div>

      {/* Status Cards */}
      <div className="status-cards-grid">
        {statusCards.map((card, index) => (
          <StatusCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      {/* AC Units Overview with Tabs */}
      <div className="ac-overview-section">
        <div className="tabs-container">
          <div className="tabs-header">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="tab-content">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* AC Units List */}
      <ACUnitsList />
    </div>
  );
};

export default ACUnits;