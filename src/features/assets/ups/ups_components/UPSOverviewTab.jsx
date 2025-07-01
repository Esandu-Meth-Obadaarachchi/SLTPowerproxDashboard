import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './UPSOverviewTab.css';

// Mock data for UPS charts
const upsStatusData = [
  { name: 'Normal', value: 12, color: '#10b981' },    // green
  { name: 'Warning', value: 3, color: '#f59e0b' },    // amber
  { name: 'Critical', value: 1, color: '#ef4444' }    // red
];

const batteryHealthData = [
  { location: 'East DC', batteryHealth: 92, loadPercent: 75 },
  { location: 'HQ DC', batteryHealth: 85, loadPercent: 60 },
  { location: 'North DC', batteryHealth: 78, loadPercent: 80 },
  { location: 'West DC', batteryHealth: 88, loadPercent: 65 },
  { location: 'South DC', batteryHealth: 90, loadPercent: 70 }
];

// Pie Chart for UPS Status Distribution
const UPSStatusChart = ({ data, height = 300 }) => (
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

// Bar Chart for Battery Health and Load Percentage
const BatteryHealthChart = ({ data, height = 300 }) => (
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
        <Bar dataKey="batteryHealth" fill="#3b82f6" name="Battery Health (%)" />
        <Bar dataKey="loadPercent" fill="#6366f1" name="Load (%)" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const UPSOverviewTab = () => (
  <div className="tab-content-section">
    <div className="charts-grid">
      <div className="chart-section">
        <h3 className="chart-title">UPS Units Status Distribution</h3>
        <UPSStatusChart data={upsStatusData} height={300} />
      </div>
      <div className="chart-section">
        <h3 className="chart-title">Battery Health and Load by Location</h3>
        <BatteryHealthChart data={batteryHealthData} height={300} />
      </div>
    </div>
  </div>
);

export default UPSOverviewTab;
