import React from "react";
import StatusCard from "../rectifierDetailComponent/StatusCard";
import PhaseChart from "../rectifierDetailComponent/PhaseChart";
import {
  Battery,
  Zap,
  Thermometer,
  Activity,
  Gauge,
  Plug,
  Settings,
  Wrench,
} from "lucide-react";
import "../RectifierDetails.css";

const BatteryTab = () => {
  // Battery System data
  const batteryVoltageData = [
    { time: "10:00", value: 48.2 },
    { time: "10:01", value: 48.5 },
    { time: "10:02", value: 48.3 },
    { time: "10:03", value: 48.7 },
    { time: "10:04", value: 48.4 },
  ];

  const batteryTemperatureData = [
    { time: "10:00", value: 35.2 },
    { time: "10:01", value: 35.5 },
    { time: "10:02", value: 35.3 },
    { time: "10:03", value: 35.7 },
    { time: "10:04", value: 35.4 },
  ];

  const stateOfChargeData = [
    { time: "10:00", value: 76 },
    { time: "10:01", value: 76.2 },
    { time: "10:02", value: 76.1 },
    { time: "10:03", value: 76.3 },
    { time: "10:04", value: 76.2 },
  ];

  // Battery Charging data
  const chargingCurrentData = [
    { time: "10:00", value: 12.5 },
    { time: "10:01", value: 12.7 },
    { time: "10:02", value: 12.9 },
    { time: "10:03", value: 12.6 },
    { time: "10:04", value: 12.8 },
  ];

  const chargingVoltageData = [
    { time: "10:00", value: 54.2 },
    { time: "10:01", value: 54.5 },
    { time: "10:02", value: 54.3 },
    { time: "10:03", value: 54.7 },
    { time: "10:04", value: 54.4 },
  ];

  return (
    <div className="battery-tab-container">
      {/* Battery System Row */}
      <div className="battery-row">
        <div className="battery-row-header">
          <Battery size={24} className="battery-row-icon" />
          <span className="battery-row-title">Battery System</span>
        </div>

        <div className="battery-system-grid">
          <div className="battery-metric-card">
            <StatusCard
              icon={Zap}
              value="48.4V"
              label="Battery Voltage"
              color="blue"
            />
            <div className="battery-chart">
              <PhaseChart
                title="Battery Voltage (V)"
                data={batteryVoltageData}
                lineColor="#3B82F6"
              />
            </div>
          </div>

          

          <div className="battery-metric-card">
            <StatusCard
              icon={Thermometer}
              value="35.4°C"
              label="Battery Temperature"
              color="orange"
            />
            <div className="battery-chart">
              <PhaseChart
                title="Battery Temperature (°C)"
                data={batteryTemperatureData}
                lineColor="#F59E0B"
              />
            </div>
          </div>

          <div className="battery-metric-card">
            <StatusCard
              icon={Gauge}
              value="76.2%"
              label="State of Charge"
              color="green"
            />
            <div className="battery-chart">
              <PhaseChart
                title="State of Charge (%)"
                data={stateOfChargeData}
                lineColor="#10B981"
              />
            </div>
          </div>
          <div className="battery-metric-card">
            <StatusCard
              icon={Settings}
              value="2"
              label="Battery Set Count"
              color="purple"
            />
          </div>
        </div>
      </div>

      {/* Battery Charging Row */}
      <div className="battery-row">
        <div className="battery-row-header">
          <Plug size={24} className="battery-row-icon" />
          <span className="battery-row-title">Battery Charging</span>
        </div>

        <div className="battery-charging-grid">
          <div className="battery-metric-card">
            <StatusCard
              icon={Activity}
              value="12.8A"
              label="Charging Current"
              color="cyan"
            />
            <div className="battery-chart">
              <PhaseChart
                title="Charging Current (A)"
                data={chargingCurrentData}
                lineColor="#06B6D4"
              />
            </div>
          </div>

          <div className="battery-metric-card">
            <StatusCard
              icon={Zap}
              value="54.4V"
              label="Charging Voltage"
              color="blue"
            />
            <div className="battery-chart">
              <PhaseChart
                title="Charging Voltage (V)"
                data={chargingVoltageData}
                lineColor="#3B82F6"
              />
            </div>
          </div>

          <div className="battery-metric-card">
            <StatusCard
              icon={Wrench}
              value="Float"
              label="Charging Mode"
              color="indigo"
            />
          </div>

          <div className="battery-metric-card">
            <StatusCard
              icon={Battery}
              value="Active"
              label="Charging State"
              color="green"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryTab;
