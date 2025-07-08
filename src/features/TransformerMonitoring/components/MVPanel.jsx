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

import StatusCard from './StatusCard'; // import at the top
import TransformerAlarm from './TransformerAlarm';
import { StatCircle, StatDigital } from './StatCard';

const MVPanel = () => {
  const data = {
    current: {
      phase1: 430.6,
      phase2: 435.1,
      phase3: 432.3,
    },
    voltage: {
      phase1: 11000,
      phase2: 10980,
      phase3: 11020,
    },
    pf: 0.97,
    frequency: 49.95,
    thd: 1.2,
    kwh: 53200,
    alarms: {
      'Earth Fault Trip': false,
      '86 OPTD Alarm': true,
      'TCS Unhealthy': false,
      'TF High Temp Trip': false,
      'AC Fail Alarm': false,
      'DC Fail Alarm': true,
    },
  };

  const currentData = [
    { phase: 'Phase 1', value: data.current.phase1 },
    { phase: 'Phase 2', value: data.current.phase2 },
    { phase: 'Phase 3', value: data.current.phase3 },
  ];

  const voltageData = [
    { phase: 'Phase 1', value: data.voltage.phase1 },
    { phase: 'Phase 2', value: data.voltage.phase2 },
    { phase: 'Phase 3', value: data.voltage.phase3 },
  ];

  return (
    <div>
      <div className="panel-chart-row">
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

      <section>
        <TransformerAlarm />
      </section>
      
    </div>
  );
};

export default MVPanel;
