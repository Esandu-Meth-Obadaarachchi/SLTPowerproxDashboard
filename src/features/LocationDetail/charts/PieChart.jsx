import React from 'react';
import { PieChart as RechartsPC, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#5DADE2'];

const PieChart = ({ data, loading = false }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      {loading ? (
        <div className="chart-loader-container">
          <div className="chart-spinner"></div>
          <p className="chart-loading-text">Loading Energy Distribution...</p>
        </div>
      ) : !data || !Array.isArray(data) || data.length === 0 ? (
        <div className="empty-chart">No data available for energy distribution</div>
      ) : (
        <RechartsPC>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value} ksW`, 'Value']}
          />
          <Legend />
        </RechartsPC>
      )}
    </ResponsiveContainer>
  );
};

export default PieChart;