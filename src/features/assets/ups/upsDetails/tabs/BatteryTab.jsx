import React from "react";
import StatusCard from "../upsDetailComponent/StatusCard";
import {
  Battery,
  Zap,
  Thermometer,
  Activity,
  Gauge,
  Clock,
  Settings,
  Heart,
  Hash,
} from "lucide-react";
import "../../../../../styles/assets/ups/UPSDetails.css";

const BatteryTab = ({ upsData }) => {
  // Generate realistic Battery data based on UPS status
  const generateBatteryData = () => {
    const isOnBattery = upsData.status === "On Battery";
    const isMaintenance = upsData.status === "Maintenance";

    // Battery voltage (DC)
    const batteryVoltage = isMaintenance
      ? 0
      : isOnBattery
      ? 48.5 + (Math.random() - 0.5) * 2 // Discharging voltage
      : 54.2 + (Math.random() - 0.5) * 0.5; // Charging/Float voltage

    // Battery current (negative when discharging, positive when charging)
    const batteryCurrent = isMaintenance
      ? 0
      : isOnBattery
      ? -(upsData.load * 0.3) + (Math.random() - 0.5) * 2 // Discharging
      : 2.5 + (Math.random() - 0.5) * 1; // Charging/Float

    // Charging percentage
    const chargingPercentage = isMaintenance
      ? 0
      : isOnBattery
      ? Math.max(30, 85 - Math.random() * 10) // Discharging
      : Math.min(100, 95 + Math.random() * 5); // Charging

    // Battery temperature
    const batteryTemp = isMaintenance ? 20 : 25 + (Math.random() - 0.5) * 8;

    // Battery health
    const batteryHealth = isMaintenance
      ? 0
      : Math.max(75, 95 - Math.random() * 10);

    return {
      voltage: batteryVoltage.toFixed(1),
      current: batteryCurrent.toFixed(1),
      chargingPercentage: chargingPercentage.toFixed(0),
      estimatedBackupTime: upsData.backupTime,
      batteryTemp: batteryTemp.toFixed(1),
      batteryHealth: batteryHealth.toFixed(0),
      setCount: 4,
      batteriesPerSet: 12,
      totalBatteries: 48,
    };
  };

  const batteryData = generateBatteryData();

  return (
    <div className="ups-container">
      {/* Battery Parameters Section */}
      <div className="ups-row">
        <div className="ups-row-header">
          <Battery size={24} className="ups-row-icon battery-icon" />
          <span className="ups-row-title battery-title">
            Battery System Parameters
          </span>
          <span className="ups-status-indicator">
            {upsData.status === "On Battery"
              ? "🔋 Discharging"
              : upsData.status === "Maintenance"
              ? "🔧 Offline"
              : "🔌 Charging/Float"}
          </span>
        </div>

        <div className="ups-input-grid">
          <StatusCard
            icon={Battery}
            value={batteryData.voltage}
            label="Battery DC Voltage"
            color={
              upsData.status === "Maintenance"
                ? "red"
                : upsData.status === "On Battery"
                ? "yellow"
                : "green"
            }
            unit="V"
          />

          <StatusCard
            icon={Zap}
            value={batteryData.current}
            label="Battery Current"
            color={
              upsData.status === "Maintenance"
                ? "red"
                : parseFloat(batteryData.current) < 0
                ? "orange"
                : "blue"
            }
            unit="A"
          />

          <StatusCard
            icon={Gauge}
            value={`${batteryData.chargingPercentage}%`}
            label="Charging Percentage"
            color={
              batteryData.chargingPercentage < 50
                ? "red"
                : batteryData.chargingPercentage < 80
                ? "yellow"
                : "green"
            }
            unit=""
          />

          <StatusCard
            icon={Clock}
            value={`${batteryData.estimatedBackupTime} min`}
            label="Estimated Backup Time"
            color={
              batteryData.estimatedBackupTime < 15
                ? "red"
                : batteryData.estimatedBackupTime < 30
                ? "yellow"
                : "green"
            }
            unit=""
          />

          <StatusCard
            icon={Thermometer}
            value={`${batteryData.batteryTemp}°C`}
            label="Battery Temperature"
            color={
              batteryData.batteryTemp > 35
                ? "red"
                : batteryData.batteryTemp > 30
                ? "yellow"
                : "green"
            }
            unit=""
          />

          <StatusCard
            icon={Heart}
            value={`${batteryData.batteryHealth}%`}
            label="Battery Health Status"
            color={
              batteryData.batteryHealth < 80
                ? "red"
                : batteryData.batteryHealth < 90
                ? "yellow"
                : "green"
            }
            unit=""
          />
        </div>

        {/* Battery Configuration Section */}
        <div className="ups-info-section">
          <h3>Battery Configuration</h3>
          <div className="ups-input-grid">
            <StatusCard
              icon={Settings}
              value={batteryData.setCount}
              label="Battery Set Count"
              color="blue"
              unit="sets"
            />

            <StatusCard
              icon={Hash}
              value={batteryData.batteriesPerSet}
              label="Batteries per Set"
              color="purple"
              unit="units"
            />

            <StatusCard
              icon={Activity}
              value={batteryData.totalBatteries}
              label="Total Battery Count"
              color="green"
              unit="units"
            />
          </div>
        </div>

        {/* Additional Battery Information */}
        <div className="ups-info-section">
          <h3>Battery Status Information</h3>
          <div className="ups-info-grid">
            <div className="ups-info-item">
              <span className="ups-info-label">Battery Mode:</span>
              <span
                className={`ups-info-value ${
                  upsData.status === "On Battery"
                    ? "status-warning"
                    : upsData.status === "Maintenance"
                    ? "status-critical"
                    : "status-normal"
                }`}
              >
                {upsData.status === "On Battery"
                  ? "Discharging (Utility Failed)"
                  : upsData.status === "Maintenance"
                  ? "Offline for Maintenance"
                  : "Float Charging (Standby)"}
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Charge Status:</span>
              <span
                className={`ups-info-value ${
                  parseFloat(batteryData.chargingPercentage) < 50
                    ? "status-critical"
                    : parseFloat(batteryData.chargingPercentage) < 80
                    ? "status-warning"
                    : "status-normal"
                }`}
              >
                {parseFloat(batteryData.chargingPercentage) < 50
                  ? "Low Charge"
                  : parseFloat(batteryData.chargingPercentage) < 80
                  ? "Partial Charge"
                  : "Fully Charged"}
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Current Flow:</span>
              <span className="ups-info-value">
                {parseFloat(batteryData.current) < 0
                  ? `Discharging at ${Math.abs(
                      parseFloat(batteryData.current)
                    )}A`
                  : `Charging at ${batteryData.current}A`}
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Battery Type:</span>
              <span className="ups-info-value">Sealed Lead Acid (VRLA)</span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Nominal Voltage:</span>
              <span className="ups-info-value">48V DC (4 x 12V sets)</span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Capacity Rating:</span>
              <span className="ups-info-value">75Ah per battery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryTab;
