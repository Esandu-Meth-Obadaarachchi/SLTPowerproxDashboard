import React from "react";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const BarChart = ({ data, color = "#00f7ff", yAxisLabel, loading = false }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      {loading ? (
        <div className="chart-loader-container">
          <div className="chart-spinner"></div>
          <p className="chart-loading-text">Loading {yAxisLabel}...</p>
        </div>
      ) : data && data.length > 0 ? (
        <RechartsBarChart data={data} margin={{ bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />

          <XAxis
            dataKey="time"
            label={{
              value: "Time",
              position: "insideBottomRight",
              offset: -5,
              offsetRight: -10,
              fill: "white",
            }}
            tick={{ fill: "white", fontSize: 10 }}
            axisLine={{ stroke: "white" }}
          />

          <YAxis
            label={{
              value: yAxisLabel,
              angle: -90,
              position: "insideLeft",
              fill: "white",
            }}
            tick={{ fill: "white", fontSize: 10 }}
            axisLine={{ stroke: "white" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.8)",
              border: "none",
              color: "white",
            }}
            labelStyle={{ color: "white" }}
          />

          <Bar dataKey="value" fill={color} />

          {/* 👇 ADD THIS FOR VALUE TEXT */}
          <text x={10} y={220} fill="white" fontSize="16" fontWeight="bold">
            {`Value: ${data[data.length - 1]?.value ?? ""}`}
          </text>
        </RechartsBarChart>
      ) : (
        <div className="no-data-message">
          No {yAxisLabel} data available from InfluxDB
        </div>
      )}
    </ResponsiveContainer>
  );
};

export default BarChart;
