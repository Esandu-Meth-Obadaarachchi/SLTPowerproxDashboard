import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

const LineChart = ({ data, domain = [1.7, 2.1], yAxisLabel = 'PUE' }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      {data && data.length > 0 ? (
        <RechartsLineChart data={data}>
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
            domain={domain}
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
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#00f7ff" 
            strokeWidth={3} 
            dot={{ r: 5, fill: '#00f7ff', stroke: 'white', strokeWidth: 2 }}
          />
        </RechartsLineChart>
      ) : (
        <div className="no-data-message">No {yAxisLabel} data available from InfluxDB</div>
      )}
    </ResponsiveContainer>
  );
};

export default LineChart;