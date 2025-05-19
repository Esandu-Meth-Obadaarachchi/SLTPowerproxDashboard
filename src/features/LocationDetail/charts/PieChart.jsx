import React from 'react';
import { PieChart as RechartsPC, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#5DADE2'];

const PieChart = ({ data }) => {
  // Check if data exists and is an array
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="empty-chart">No data available for energy distribution</div>;
  }
  
  // Log the data for debugging
  console.log("Pie Chart Data:", data);

  return (
    <ResponsiveContainer width="100%" height={300}>
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
          formatter={(value) => [`${value} KW`, 'Value']}
        />
        <Legend />
      </RechartsPC>
    </ResponsiveContainer>
  );
};

export default PieChart;