import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const powerConsumptionData = [
  { time: '00:00', power: 420 },
  { time: '04:00', power: 380 },
  { time: '08:00', power: 450 },
  { time: '12:00', power: 520 },
  { time: '16:00', power: 580 },
  { time: '20:00', power: 490 },
  { time: '24:00', power: 430 }
];

const PowerConsumptionChart = ({ data = powerConsumptionData, height = 300 }) => (
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

export default ACElectricalTab;