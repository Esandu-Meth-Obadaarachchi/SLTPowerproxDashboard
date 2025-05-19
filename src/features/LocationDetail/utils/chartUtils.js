import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

/**
 * Renders a PUE line chart.
 * @param {Array} data - The chart data array
 * @returns {JSX.Element} - The line chart component
 */
export const renderPUEChart = (data) => (
  <ResponsiveContainer width="100%" height={250}>
    {data && data.length > 0 ? (
      <LineChart data={data}>
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
          domain={[1.7, 2.1]} 
          label={{ 
            value: 'PUE', 
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
      </LineChart>
    ) : (
      <div className="no-data-message">No PUE data available from InfluxDB</div>
    )}
  </ResponsiveContainer>
);

/**
 * Renders a bar chart with customizable color and label.
 * @param {Array} data - The chart data array
 * @param {string} color - The color for the bars
 * @param {string} valueLabel - The Y-axis label
 * @returns {JSX.Element} - The bar chart component
 */
export const renderBarChart = (data, color = '#00f7ff', valueLabel = 'Value') => (
  <ResponsiveContainer width="100%" height={250}>
    {data && data.length > 0 ? (
      <BarChart data={data}>
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
            value: valueLabel, 
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
      </BarChart>
    ) : (
      <div className="no-data-message">No {valueLabel} data available from InfluxDB</div>
    )}
  </ResponsiveContainer>
);

/**
 * Renders a pie chart.
 * @param {Array} data - The chart data array
 * @returns {JSX.Element} - The pie chart component
 */
export const renderPieChart = (data) => {
  const COLORS = ['#00f7ff', '#8AE98A', '#ff6b6b', '#EDA566', '#5B7EC2'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]} 
            />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(0,0,0,0.8)', 
            border: 'none', 
            color: 'white' 
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

/**
 * Creates configuration for a fullscreen chart
 * @param {string} type - Chart type ('bar', 'line', or 'pie')
 * @param {Array} data - The chart data
 * @param {string} color - The chart color (for bar and line charts)
 * @param {string} valueLabel - The value label for the Y-axis
 * @returns {Object} - Chart configuration for fullscreen modal
 */
export const createFullscreenChartConfig = (type, data, color, valueLabel) => ({
  type,
  data,
  color,
  valueLabel
});

/**
 * Renders a chart based on its type
 * @param {Object} chartConfig - The chart configuration
 * @returns {JSX.Element} - The rendered chart
 */
export const renderChartByType = (chartConfig) => {
  const { type, data, color, valueLabel } = chartConfig;
  
  switch (type) {
    case 'line':
      return renderPUEChart(data);
    case 'bar':
      return renderBarChart(data, color, valueLabel);
    case 'pie':
      return renderPieChart(data);
    default:
      return <div>Unsupported chart type</div>;
  }
};