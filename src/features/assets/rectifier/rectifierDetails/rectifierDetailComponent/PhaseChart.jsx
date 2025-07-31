import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const PhaseChart = ({ title, data, lineColor = "#38bdf8", height = 200, unit = "V" }) => {
  // Custom tooltip formatter
  const tooltipFormatter = (value, name) => [`${value} ${unit}`, name];

  return (
    <div className="panel-chart-card">
      <h4 className="text-white font-semibold mb-2">{title}</h4>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip formatter={tooltipFormatter} />
          <Legend />
          {/* Only one line */}
          <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PhaseChart;
