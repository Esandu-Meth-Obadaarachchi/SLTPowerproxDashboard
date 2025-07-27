import React from "react";
import StatusCard from "../rectifierDetailComponent/StatusCard";
import PhaseChart from "../rectifierDetailComponent/PhaseChart";
import { Battery, Cable } from "lucide-react";
import "../RectifierDetails.css";

const ACInputTab = () => {
  // Voltage raw data
  const rawVoltageL1 = [
    { time: "10:00", L1: 245 },
    { time: "10:01", L1: 246 },
    { time: "10:02", L1: 244 },
  ];
  const rawVoltageL2 = [
    { time: "10:00", L2: 250 },
    { time: "10:01", L2: 251 },
    { time: "10:02", L2: 249 },
  ];
  const rawVoltageL3 = [
    { time: "10:00", L3: 255 },
    { time: "10:01", L3: 254 },
    { time: "10:02", L3: 256 },
  ];

  // Current raw data
  const rawCurrentL1 = [
    { time: "10:00", L1: 85 },
    { time: "10:01", L1: 87 },
    { time: "10:02", L1: 86 },
  ];
  const rawCurrentL2 = [
    { time: "10:00", L2: 80 },
    { time: "10:01", L2: 82 },
    { time: "10:02", L2: 81 },
  ];
  const rawCurrentL3 = [
    { time: "10:00", L3: 88 },
    { time: "10:01", L3: 90 },
    { time: "10:02", L3: 89 },
  ];

  // Format to { time, value }
  const voltageDataL1 = rawVoltageL1.map(({ time, L1 }) => ({
    time,
    value: L1,
  }));
  const voltageDataL2 = rawVoltageL2.map(({ time, L2 }) => ({
    time,
    value: L2,
  }));
  const voltageDataL3 = rawVoltageL3.map(({ time, L3 }) => ({
    time,
    value: L3,
  }));

  const currentDataL1 = rawCurrentL1.map(({ time, L1 }) => ({
    time,
    value: L1,
  }));
  const currentDataL2 = rawCurrentL2.map(({ time, L2 }) => ({
    time,
    value: L2,
  }));
  const currentDataL3 = rawCurrentL3.map(({ time, L3 }) => ({
    time,
    value: L3,
  }));

  return (
    <div className="ac-input-container">
      {/* Voltage Section */}
      <div className="ac-input-section">
        <div className="ac-input-header">
          <Cable size={24} className="ac-input-icon voltage-icon" />
          <span className="ac-input-title voltage-title">Live Voltage</span>
        </div>

        <div className="ac-input-status-grid">
          <StatusCard icon={Cable} value="245V" label="L1" color="yellow" />
          <StatusCard icon={Cable} value="250V" label="L2" color="yellow" />
          <StatusCard icon={Cable} value="255V" label="L3" color="yellow" />
        </div>

        <div className="ac-input-charts">
          <PhaseChart
            title="Voltage L1 (V)"
            data={voltageDataL1}
            lineColor="#FBBF24"
          />
          <PhaseChart
            title="Voltage L2 (V)"
            data={voltageDataL2}
            lineColor="#3B82F6"
          />
          <PhaseChart
            title="Voltage L3 (V)"
            data={voltageDataL3}
            lineColor="#10B981"
          />
        </div>
      </div>

      {/* Current Section */}
      <div className="ac-input-section">
        <div className="ac-input-header">
          <Battery size={24} className="ac-input-icon current-icon" />
          <span className="ac-input-title current-title">Live Current</span>
        </div>

        <div className="ac-input-status-grid">
          <StatusCard icon={Battery} value="85A" label="L1" color="green" />
          <StatusCard icon={Battery} value="80A" label="L2" color="green" />
          <StatusCard icon={Battery} value="88A" label="L3" color="green" />
        </div>

        <div className="ac-input-charts">
          <PhaseChart
            title="Current L1 (A)"
            data={currentDataL1}
            lineColor="#10B981"
          />
          <PhaseChart
            title="Current L2 (A)"
            data={currentDataL2}
            lineColor="#3B82F6"
          />
          <PhaseChart
            title="Current L3 (A)"
            data={currentDataL3}
            lineColor="#FBBF24"
          />
        </div>
      </div>
    </div>
  );
};

export default ACInputTab;
