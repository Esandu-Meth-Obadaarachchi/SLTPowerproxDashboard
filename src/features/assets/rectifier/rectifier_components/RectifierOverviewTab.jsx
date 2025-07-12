import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


// ✅ Mock data
const rectifierStatusData = [
  { name: 'Normal', value: 10, color: '#10b981' },
  { name: 'Warning', value: 2, color: '#f59e0b' },
  { name: 'Critical', value: 1, color: '#ef4444' }
];

const rectifierPerformanceData = [
  { location: 'East DC', voltage: 48, loadPercent: 70 },
  { location: 'HQ DC', voltage: 47, loadPercent: 85 },
  { location: 'North DC', voltage: 48, loadPercent: 75 },
  { location: 'West DC', voltage: 46, loadPercent: 65 },
  { location: 'South DC', voltage: 48, loadPercent: 80 }
];

// ✅ Pie Chart
const RectifierStatusChart = ({ data, height = 300 }) => (
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

// ✅ Bar Chart
const RectifierPerformanceChart = ({ data, height = 300 }) => (
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
        <Bar dataKey="voltage" fill="#bae6fd" name="Voltage (V)" />      // Light Blue  
<Bar dataKey="loadPercent" fill="#fde68a" name="Load (%)" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// ✅ Main Component
const RectifierOverviewTab = () => (
  <div className="tab-content-section">
    <div className="charts-grid">
      <div className="chart-section">
        <h3 className="chart-title">Rectifier Units Status Distribution</h3>
        <RectifierStatusChart data={rectifierStatusData} />
      </div>
      <div className="chart-section">
        <h3 className="chart-title">Voltage and Load by Location</h3>
        <RectifierPerformanceChart data={rectifierPerformanceData} />
      </div>
    </div>
  </div>
);

export default RectifierOverviewTab;
