import React from "react";
import StatusCard from "../upsDetailComponent/StatusCard";
import { Zap, Activity, Gauge, Power } from "lucide-react";
import "../UPSDetails.css";

const ACInputTab = ({ upsData }) => {
  const generateInputData = () => {
    const baseVoltage = 230;
    const baseFrequency = 50;

    const voltage =
      upsData.status === "Normal"
        ? baseVoltage + (Math.random() - 0.5) * 2
        : upsData.status === "On Battery"
        ? 0
        : baseVoltage + (Math.random() - 0.5) * 5;

    const current =
      upsData.status === "On Battery"
        ? 0
        : upsData.load * 0.5 + (Math.random() - 0.5) * 2;

    const power =
      upsData.status === "On Battery" ? 0 : (voltage * current) / 1000;

    return {
      voltage: voltage.toFixed(1),
      frequency: (baseFrequency + (Math.random() - 0.5) * 0.1).toFixed(2),
      current: Math.max(0, current).toFixed(1),
      power: Math.max(0, power).toFixed(2),
    };
  };

  const inputData = generateInputData();

  return (
<div className="ups-container">
  {/* AC Input Section */}
  <div className="ups-row">
    <div className="ups-row-header">
      <Zap size={24}  className="ups-row-icon input-icon2" />
      <span className="ups-row-title input-title">
        AC Input Parameters
      </span>
      <span className="ups-status-indicator">
        {upsData.status === "On Battery"
          ? "⚠️ No AC Input"
          : "✅ AC Input Normal"}
      </span>
    </div>

        {/* Status Cards */}
        <div className="ups-input-grid">
          <StatusCard
            icon={Zap}
            value={inputData.voltage}
            label="Input Voltage"
            color={upsData.status === "On Battery" ? "red" : "green"}
            unit="V"
          />
          <StatusCard
            icon={Activity}
            value={inputData.frequency}
            label="Input Frequency"
            color={upsData.status === "On Battery" ? "red" : "blue"}
            unit="Hz"
          />
          <StatusCard
            icon={Gauge}
            value={inputData.current}
            label="Input Current"
            color={upsData.status === "On Battery" ? "red" : "yellow"}
            unit="A"
          />
          <StatusCard
            icon={Power}
            value={inputData.power}
            label="Input Power"
            color={upsData.status === "On Battery" ? "red" : "purple"}
            unit="kW"
          />
        </div>

        {/* Info Section */}
        <div className="ups-info-section">
          <h3>Input Status Information</h3>
          <div className="ups-info-grid">
            <div className="ups-info-item">
              <span className="ups-info-label">Power Source:</span>
              <span
                className={`ups-info-value ${
                  upsData.status === "On Battery"
                    ? "status-warning"
                    : "status-normal"
                }`}
              >
                {upsData.status === "On Battery"
                  ? "Battery Backup"
                  : "Utility Power"}
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Input Quality:</span>
              <span
                className={`ups-info-value ${
                  upsData.status === "Normal"
                    ? "status-normal"
                    : "status-warning"
                }`}
              >
                {upsData.status === "Normal"
                  ? "Good"
                  : upsData.status === "On Battery"
                  ? "No Input"
                  : "Poor"}
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Load on Input:</span>
              <span className="ups-info-value">
                {upsData.load}% of rated capacity
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Rated Capacity:</span>
              <span className="ups-info-value">
                {upsData.ratedCapacity}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACInputTab;
