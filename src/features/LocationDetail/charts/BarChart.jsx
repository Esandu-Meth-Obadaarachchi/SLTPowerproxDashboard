import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

const BarChart = ({ data, color = '#00f7ff', yAxisLabel }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      {data && data.length > 0 ? (
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="time" 
            label={{ 
              value: 'Time', 
              position: 'insideBottomRight', 
              offset: -10,
              fill: 'white' 
            }}
            tick={{ fill: 'white', fontSize: 10 }} 
            axisLine={{ stroke: 'white' }}
          />
          <YAxis 
            label={{ 
              value: yAxisLabel, 
              angle: -90, 
              position: 'insideLeft', 
              fill: 'white' 
            }}
            tick={{ fill: 'white', fontSize: 10 }} 
            axisLine={{ stroke: 'white' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              border: 'none', 
              color: 'white' 
            }}
            labelStyle={{ color: 'white' }}
          />
          <Bar dataKey="value" fill={color} />
        </RechartsBarChart>
      ) : (
        <div className="no-data-message">No {yAxisLabel} data available from InfluxDB</div>
      )}
    </ResponsiveContainer>
  );
};

export default BarChart;