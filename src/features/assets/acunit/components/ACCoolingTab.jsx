import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const temperatureTrendData = [
  { time: '00:00', avgTemp: 22.1, targetTemp: 22.0 },
  { time: '04:00', avgTemp: 21.8, targetTemp: 22.0 },
  { time: '08:00', avgTemp: 22.3, targetTemp: 22.0 },
  { time: '12:00', avgTemp: 22.8, targetTemp: 22.0 },
  { time: '16:00', avgTemp: 23.2, targetTemp: 22.0 },
  { time: '20:00', avgTemp: 22.6, targetTemp: 22.0 },
  { time: '24:00', avgTemp: 22.4, targetTemp: 22.0 }
];

const acTemperatureData = [
  { location: 'East DC', temperature: 22.5, humidity: 45 },
  { location: 'HQ DC', temperature: 21.8, humidity: 42 },
  { location: 'North DC', temperature: 24.8, humidity: 48 },
  { location: 'West DC', temperature: 22.2, humidity: 43 },
  { location: 'South DC', temperature: 23.1, humidity: 46 }
];

const TemperatureTrendChart = ({ data = temperatureTrendData, height = 300 }) => (
  <div className="chart-container" style={{ height }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="time" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'var(--bg-color)', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'var(--text-color)'
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

const PowerConsumptionChart = ({ data, height = 300 }) => (
  <div className="chart-container" style={{ height }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="time" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'var(--bg-color)', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'var(--text-color)'
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

export default ACCoolingTab;