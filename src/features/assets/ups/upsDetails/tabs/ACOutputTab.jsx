import React from "react";
import StatusCard from "../upsDetailComponent/StatusCard";
import { Zap, Activity, Gauge, Power, TrendingUp } from "lucide-react";
import "../UPSDetails.css";

const ACOutputTab = ({ upsData }) => {
  // Generate realistic AC Output data based on UPS load and status
  const generateOutputData = () => {
    const baseVoltage = 230;
    const baseFrequency = 50;
    const loadFactor = upsData.load / 100;

    // Output voltage should be stable regardless of input
    const voltage =
      upsData.status === "Maintenance"
        ? 0
        : baseVoltage + (Math.random() - 0.5) * 1; // More stable than input

    // Current based on actual load
    const current =
      upsData.status === "Maintenance"
        ? 0
        : upsData.load * 0.48 + (Math.random() - 0.5) * 1;

    // Power calculation
    const power =
      upsData.status === "Maintenance" ? 0 : (voltage * current) / 1000;

    return {
      voltage: voltage.toFixed(1),
      frequency: (baseFrequency + (Math.random() - 0.5) * 0.05).toFixed(2), // More stable frequency
      current: Math.max(0, current).toFixed(1),
      power: Math.max(0, power).toFixed(2),
      loadLevel: upsData.load,
    };
  };

  const outputData = generateOutputData();

  return (
    <div className="ups-container">
      {/* AC Output Section */}
      <div className="ups-row">
        <div className="ups-row-header">
          <Power size={24} className="ups-row-icon output-icon" />
          <span className="ups-row-title output-title">
            AC Output Parameters
          </span>
          <span className="ups-status-indicator">
            {upsData.status === "Maintenance"
              ? "🔧 Output Disabled"
              : "✅ Output Active"}
          </span>
        </div>

        <div className="ups-input-grid">
          <StatusCard
            icon={Zap}
            value={outputData.voltage}
            label="Output Voltage"
            color={upsData.status === "Maintenance" ? "red" : "green"}
            unit="V"
          />

          <StatusCard
            icon={Activity}
            value={outputData.frequency}
            label="Output Frequency"
            color={upsData.status === "Maintenance" ? "red" : "blue"}
            unit="Hz"
          />

          <StatusCard
            icon={Gauge}
            value={outputData.current}
            label="Output Current"
            color={
              upsData.status === "Maintenance"
                ? "red"
                : outputData.current > 40
                ? "yellow"
                : "green"
            }
            unit="A"
          />

          <StatusCard
            icon={Power}
            value={outputData.power}
            label="Output Power"
            color={upsData.status === "Maintenance" ? "red" : "purple"}
            unit="kW"
          />

          <StatusCard
            icon={TrendingUp}
            value={`${outputData.loadLevel}%`}
            label="Load Level"
            color={
              outputData.loadLevel > 90
                ? "red"
                : outputData.loadLevel > 75
                ? "yellow"
                : "green"
            }
            unit=""
          />
        </div>

        {/* Additional Output Information */}
        <div className="ups-info-section">
          <h3>Output Status Information</h3>
          <div className="ups-info-grid">
            <div className="ups-info-item">
              <span className="ups-info-label">Output Status:</span>
              <span
                className={`ups-info-value ${
                  upsData.status === "Maintenance"
                    ? "status-warning"
                    : "status-normal"
                }`}
              >
                {upsData.status === "Maintenance"
                  ? "Disabled for Maintenance"
                  : "Active"}
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Load Condition:</span>
              <span
                className={`ups-info-value ${
                  outputData.loadLevel > 90
                    ? "status-critical"
                    : outputData.loadLevel > 75
                    ? "status-warning"
                    : "status-normal"
                }`}
              >
                {outputData.loadLevel > 90
                  ? "Overloaded"
                  : outputData.loadLevel > 75
                  ? "High Load"
                  : "Normal Load"}
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Power Factor:</span>
              <span className="ups-info-value">0.95 (Leading)</span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Output Source:</span>
              <span className="ups-info-value">
                {upsData.status === "On Battery"
                  ? "Battery Inverter"
                  : upsData.status === "Bypass"
                  ? "Bypass (Direct Utility)"
                  : "Online (Inverter)"}
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Available Capacity:</span>
              <span className="ups-info-value">
                {100 - outputData.loadLevel}% remaining
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Rated Output:</span>
              <span className="ups-info-value">{upsData.ratedCapacity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACOutputTab;
