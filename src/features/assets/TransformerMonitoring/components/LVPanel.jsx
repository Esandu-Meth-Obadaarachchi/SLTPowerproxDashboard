import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
 import './Panel.css'; // Make sure styles are applied

import StatusCard from './StatusCard'; // import at the top
import { StatCircle, StatDigital } from './StatCard';


const LVPanel = () => {
  const data = {
    current: {
      phase1: 85.3,
      phase2: 80.5,
      phase3: 88.7,
      neutral: 15.2,
    },
    voltage: {
      phase1: 230.5,
      phase2: 229.9,
      phase3: 231.1,
    },
    pf: 0.95,
    frequency: 50.01,
    thd: 2.5,
    kwh: 15420,
    alarms: {
      'DP 34 Overcurrent/Earth Fault': false,
      'ACB Trip Alarm': true,
    },
  };

  const currentData = [
    { phase: 'Phase 1', value: data.current.phase1 },
    { phase: 'Phase 2', value: data.current.phase2 },
    { phase: 'Phase 3', value: data.current.phase3 },
    { phase: 'Neutral', value: data.current.neutral },
  ];

  const voltageData = [
    { phase: 'Phase 1', value: data.voltage.phase1 },
    { phase: 'Phase 2', value: data.voltage.phase2 },
    { phase: 'Phase 3', value: data.voltage.phase3 },
  ];

  return (
    <div>
      {/* Chart Row */}
      <div className="panel-chart-row">
        {/* Current Chart Card */}
        <div className="panel-chart-card">
          <h4>Current (A)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={currentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="phase" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#00f7ff" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Voltage Chart Card */}
        <div className="panel-chart-card">
          <h4>Voltage (V) </h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={voltageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="phase" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#0077ff" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <section>
        <StatusCard />
      </section>

      <section className="panel-stats-row">
        <StatCircle label="Power Factor" value={data.pf} max={1.0} unit="" icon="⚡" color="#38bdf8" />
        <StatCircle label="Frequency" value={data.frequency} max={60} unit="Hz" icon="〰️" color="#10b981" />
        <StatCircle label="THD" value={data.thd} max={100} unit="%" icon="📉" color="#facc15" />
        <StatDigital label="kWh Reading" value={data.kwh} icon="🔋" />
      </section>

      {/* Alarm Card */}
      <section>
        <div className="lv-alarm-card">
          <h4 className="alarm-title">Alarm Status</h4>
          <div className="alarm-items">
            {Object.entries(data.alarms).map(([alarmName, active]) => (
              <div key={alarmName} className={`alarm-item ${active ? 'active' : 'ok'}`}>
                <span className="alarm-label">{alarmName}</span>
                <span className="alarm-icon">{active ? '⚠️' : '✓'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LVPanel;
