import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// --- Sample Data ---

// AC to DC Conversion Data
const conversionData = [
  { time: '00:00', acInput: 300, dcOutput: 270 },
  { time: '04:00', acInput: 280, dcOutput: 252 },
  { time: '08:00', acInput: 320, dcOutput: 288 },
  { time: '12:00', acInput: 310, dcOutput: 280 },
  { time: '16:00', acInput: 330, dcOutput: 295 },
  { time: '20:00', acInput: 305, dcOutput: 278 },
  { time: '24:00', acInput: 295, dcOutput: 268 }
];

// Voltage Trends Data
const voltageTrendData = [
  { time: '00:00', voltage: 48.5, targetVoltage: 48 },
  { time: '04:00', voltage: 47.9, targetVoltage: 48 },
  { time: '08:00', voltage: 48.3, targetVoltage: 48 },
  { time: '12:00', voltage: 48.8, targetVoltage: 48 },
  { time: '16:00', voltage: 49.2, targetVoltage: 48 },
  { time: '20:00', voltage: 48.6, targetVoltage: 48 },
  { time: '24:00', voltage: 48.4, targetVoltage: 48 }
];

// --- Chart Components ---

const ConversionChart = () => (
  <div className="chart-container" style={{ height: 300 }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={conversionData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="time" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1a2235',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#ffffff'
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="acInput"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          name="AC Input (W)"
        />
        <Line
          type="monotone"
          dataKey="dcOutput"
          stroke="#10b981"
          strokeWidth={3}
          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
          name="DC Output (W)"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const VoltageTrendChart = () => (
  <div className="chart-container" style={{ height: 300 }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={voltageTrendData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="time" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1a2235',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#ffffff'
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="voltage"
          stroke="#60a5fa"
          strokeWidth={3}
          dot={{ fill: '#60a5fa', strokeWidth: 2, r: 4 }}
          name="Measured Voltage (V)"
        />
        <Line
          type="monotone"
          dataKey="targetVoltage"
          stroke="#a5f3fc"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: '#a5f3fc', strokeWidth: 2, r: 3 }}
          name="Target Voltage (V)"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// --- Main Component ---

const RectifierAnalyticsTab = () => (
  <div className="tab-content-section">
    <div className="charts-grid single-column">
      <div className="chart-section">
        <h3 className="chart-title">AC vs DC Conversion (Last 24 Hours)</h3>
        <ConversionChart />
      </div>
      <div className="chart-section">
        <h3 className="chart-title">Rectifier Voltage Trends</h3>
        <VoltageTrendChart />
      </div>
    </div>
  </div>
);

export default RectifierAnalyticsTab;
