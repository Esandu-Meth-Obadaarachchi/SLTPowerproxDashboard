import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const GraphBuilder = ({ title, data, lines, height = 200 }) => {
  const colors = {
    hq: '#3b82f6',
    east: '#06b6d4',
    west: '#8b5cf6',
    north: '#f59e0b',
    completed: '#10b981',
    pending: '#f59e0b',
    critical: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };

  return (
    <div className="graph-card">
      <h3>{title}</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
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
            {lines.map((line, index) => (
              <Line 
                key={line.dataKey}
                type="monotone" 
                dataKey={line.dataKey} 
                stroke={colors[line.dataKey] || colors[Object.keys(colors)[index % Object.keys(colors).length]]} 
                strokeWidth={2}
                dot={{ fill: colors[line.dataKey] || colors[Object.keys(colors)[index % Object.keys(colors).length]], strokeWidth: 2, r: 4 }}
                name={line.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphBuilder;