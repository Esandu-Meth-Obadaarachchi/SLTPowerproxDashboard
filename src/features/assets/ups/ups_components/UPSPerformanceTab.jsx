import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

const upsEfficiencyData = months.map((month, index) => ({
  month,
  HQ: 400 + index * 10,
  East: 300 + index * 5,
  West: 310 + index * 7,
  North: 290 + index * 6
}));

const upsLoadData = months.map((month, index) => ({
  month,
  HQ: 420 + index * 12,
  East: 280 + index * 6,
  West: 300 + index * 5,
  North: 270 + index * 8
}));

const UPSMultiLineChart = ({ data, title, dataKeys, colors }) => (
  <div className="chart-section">
    <h3 className="chart-title">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="month" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" domain={[0, 600]} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1a2235',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#ffffff'
          }}
        />
        <Legend />
        {dataKeys.map((key, i) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i]}
            strokeWidth={2.5}
            dot={{ fill: colors[i], strokeWidth: 1.5, r: 3 }}
            name={key}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const UPSPerformanceTab = () => (
  <div className="tab-content-section">
    <div className="charts-grid two-column">
      <UPSMultiLineChart
        data={upsEfficiencyData}
        title="UPS Efficiency Trends (Last 30 Days)"
        dataKeys={['HQ', 'East', 'West', 'North']}
        colors={['#6366f1', '#34d399', '#f59e0b', '#ef4444']}
      />
      <UPSMultiLineChart
        data={upsLoadData}
        title="UPS Load Trends (Last 30 Days)"
        dataKeys={['HQ', 'East', 'West', 'North']}
        colors={['#6366f1', '#34d399', '#f59e0b', '#ef4444']}
      />
    </div>
  </div>
);

export default UPSPerformanceTab;
