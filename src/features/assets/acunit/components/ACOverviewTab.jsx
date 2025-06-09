import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ACOverviewTab.css';

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

export default ACOverviewTab;