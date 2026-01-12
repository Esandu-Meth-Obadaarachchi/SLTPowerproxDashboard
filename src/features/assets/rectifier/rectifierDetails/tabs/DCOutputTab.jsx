import React from "react";
import StatusCard from "../../../../shared/components/StatCard/StatCard.jsx";
import PhaseChart from "../rectifierDetailComponent/PhaseChart";
import { Battery, Zap } from "lucide-react";
import "../../../../../styles/assets/rectifier/RectifierDetails.css";

const DCOutputTab = () => {
  // DC Voltage raw data
  const rawVoltageData = [
    { time: "10:00", DC: 53.2 },
    { time: "10:01", DC: 53.5 },
    { time: "10:02", DC: 53.3 },
    { time: "10:03", DC: 53.7 },
    { time: "10:04", DC: 53.4 },
  ];

  // DC Current raw data
  const rawCurrentData = [
    { time: "10:00", DC: 28.5 },
    { time: "10:01", DC: 28.7 },
    { time: "10:02", DC: 28.9 },
    { time: "10:03", DC: 28.6 },
    { time: "10:04", DC: 28.8 },
  ];

  // Format to { time, value }
  const voltageData = rawVoltageData.map(({ time, DC }) => ({
    time,
    value: DC,
  }));

  const currentData = rawCurrentData.map(({ time, DC }) => ({
    time,
    value: DC,
  }));

  return (
    <div className="ac-input-container">
      {/* DC Voltage Section */}
      <div className="ac-input-section">
        <div className="ac-input-header">
          <Zap size={24} className="ac-input-icon dc-voltage-icon" />
          <span className="ac-input-title dc-voltage-title">DC Voltage</span>
        </div>

        <div className="dc-output-status-grid">
          <StatusCard
            icon={Zap}
            value="53.5V"
            label="DC Voltage"
            color="blue"
          />
        </div>

        <div className="ac-input-charts">
          <PhaseChart
            title="DC Voltage (V)"
            data={voltageData}
            lineColor="#3B82F6"
          />
        </div>
      </div>

      {/* DC Current Section */}
      <div className="ac-input-section">
        <div className="ac-input-header">
          <Battery size={24} className="ac-input-icon dc-current-icon" />
          <span className="ac-input-title dc-current-title">DC Current</span>
        </div>

        <div className="dc-output-status-grid">
          <StatusCard
            icon={Battery}
            value="28.7A"
            label="DC Current"
            color="green"
          />
        </div>

        <div className="ac-input-charts">
          <PhaseChart
            title="DC Current (A)"
            data={currentData}
            lineColor="#10B981"
          />
        </div>
      </div>
    </div>
  );
};

export default DCOutputTab;
