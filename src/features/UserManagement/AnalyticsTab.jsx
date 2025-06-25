import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a29bfe"];

const AnalyticsTab = () => {
  const roleData = [
    { name: "Admin", value: 2 },
    { name: "HQ Staff", value: 3 },
    { name: "Technician", value: 1 },
    { name: "Regional Staff", value: 1 },
    { name: "Viewer", value: 4 },
  ];

  const regionData = [
    { name: "All", value: 2 },
    { name: "HQ", value: 2 },
    { name: "East", value: 1 },
    { name: "West", value: 1 },
    { name: "South", value: 1 },
    { name: "North", value: 1 },
  ];

  const statusData = [
    { name: "Active", value: 6 },
    { name: "Inactive", value: 1 },
  ];

  const barData = [
    { day: "Mon", count: 12 },
    { day: "Tue", count: 18 },
    { day: "Wed", count: 22 },
    { day: "Thu", count: 16 },
    { day: "Fri", count: 28 },
    { day: "Sat", count: 9 },
    { day: "Sun", count: 5 },
  ];

  return (
    <div className="analytics-wrapper">
      <div className="chart-card hover-lift-glow">
        <h4>Users by Role</h4>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={roleData} dataKey="value" outerRadius={60}>
              {roleData.map((entry, i) => (
                <Cell key={`role-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card hover-lift-glow">
        <h4>Users by Region</h4>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={regionData} dataKey="value" outerRadius={60}>
              {regionData.map((entry, i) => (
                <Cell key={`region-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card hover-lift-glow">
        <h4>Users by Status</h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={statusData} dataKey="value" outerRadius={60}>
              {statusData.map((entry, i) => (
                <Cell key={`status-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card hover-lift-glow">
        <h4>User Activity by Day</h4>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsTab;
