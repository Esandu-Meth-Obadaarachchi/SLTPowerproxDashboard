import React from "react";
import { useParams } from "react-router-dom";
import "./Dashboard.css";
import GaugeChart from "react-gauge-chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GeneratorDashboard = () => {
  const { assetId } = useParams();

  // Hardcoded asset data (replace with API data later)
  const assetData = {
    101: { 
      name: "Gen_HQb_1", 
      status: "Standby",
      rpm: 824, 
      temperature: 197, 
      pressure: 288, 
      fuel: 38, 
      battery: 9,
      frequency: 50,
      starts: 5,
      powerFactor: {L1: 0.65, L2: 0.11, L3: 0.30},
      voltages: {L1_L2: 219, L2_L3: 214, L3_L1: 283},
      phaseCurrent: {L1: 41, L2: 43, L3: 28},
      activePower: {L1: 35, L2: 62, L3: 68, total: 705},
      apparentPower: {L1: 75, L2: 96, L3: 89, total: 751},
      reactivePower: {L1: 5, L2: 40, L3: 38, total: 818},
    },
    102: { 
      name: "Gen_HQb_2", 
      status: "Running",
      rpm: 900, 
      temperature: 200, 
      pressure: 300, 
      fuel: 50, 
      battery: 20,
      frequency: 49.8,
      starts: 8,
      powerFactor: {L1: 0.70, L2: 0.25, L3: 0.45},
      voltages: {L1_L2: 220, L2_L3: 221, L3_L1: 219},
      phaseCurrent: {L1: 45, L2: 47, L3: 44},
      activePower: {L1: 42, L2: 58, L3: 62, total: 742},
      apparentPower: {L1: 79, L2: 98, L3: 86, total: 776},
      reactivePower: {L1: 12, L2: 38, L3: 35, total: 842},
    },
    201: { 
      name: "Gen_OTS_1", 
      status: "Off",
      rpm: 750, 
      temperature: 190, 
      pressure: 270, 
      fuel: 45, 
      battery: 15,
      frequency: 0,
      starts: 12,
      powerFactor: {L1: 0.62, L2: 0.13, L3: 0.32},
      voltages: {L1_L2: 0, L2_L3: 0, L3_L1: 0},
      phaseCurrent: {L1: 0, L2: 0, L3: 0},
      activePower: {L1: 0, L2: 0, L3: 0, total: 0},
      apparentPower: {L1: 0, L2: 0, L3: 0, total: 0},
      reactivePower: {L1: 0, L2: 0, L3: 0, total: 0},
    },
  };

  const asset = assetData[assetId] || assetData[101]; // Default to first asset

  const getAlarmColor = (value, thresholds) => {
    if (value <= thresholds.low) return "#d9534f"; // Critical - red
    if (value <= thresholds.medium) return "#f0ad4e"; // Warning - yellow
    return "#5cb85c"; // Normal - green
  };

  const getBatteryColor = (percentage) => {
    if (percentage < 20) return "#d9534f"; // Critical - red
    if (percentage < 50) return "#f0ad4e"; // Warning - yellow
    return "#5cb85c"; // Normal - green
  };

  // Energy metrics data for chart
  const energyData = [
    { name: 'L1', kWh: asset.activePower.L1 * 20, kVAh: asset.apparentPower.L1 * 10, kVArh: asset.reactivePower.L1 * 10 },
    { name: 'L2', kWh: asset.activePower.L2 * 20, kVAh: asset.apparentPower.L2 * 10, kVArh: asset.reactivePower.L2 * 10 },
    { name: 'L3', kWh: asset.activePower.L3 * 20, kVAh: asset.apparentPower.L3 * 10, kVArh: asset.reactivePower.L3 * 10 },
  ];

  // Power metrics data for gauges
  const powerMetrics = [
    { id: "active-power", title: "Active Power (kW)", value: asset.activePower.total, max: 1500 },
    { id: "apparent-power", title: "Apparent Power (kVA)", value: asset.apparentPower.total, max: 1500 },
    { id: "reactive-power", title: "Reactive Power (kVAr)", value: asset.reactivePower.total, max: 1500 }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Generator Dashboard</h1>
        <div className="dashboard-controls">
          <select className="dashboard-select">
            <option>Dash_Gen_HQb2</option>
          </select>
          <div className="dashboard-time">Realtime - last 1 minute</div>
          <button className="edit-button">Edit mode</button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Panel */}
        <div className="dashboard-panel sidebar">
          <div className="home-button">
            <span className="home-icon">⌂</span> Home
          </div>
          <div className="last-update">Last update: 1m ago</div>
          <div className="status-box">
            <h2>{asset.status}</h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Alarms Section */}
          <div className="panel alarms-panel">
            <div className="panel-header">
              <h3>Alarms</h3>
              <div className="panel-controls">
                <span className="realtime">Realtime - last day</span>
              </div>
            </div>
            <div className="alarms-table">
              <table>
                <thead>
                  <tr>
                    <th>Created time</th>
                    <th>Originator</th>
                    <th>Type</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Assignee</th>
                  </tr>
                </thead>
              </table>
              <div className="no-alarms">No alarms found</div>
            </div>
          </div>

          {/* Gauges Row */}
          <div className="gauges-row">
            <div className="gauge-panel temperature">
              <div className="temp-icon">🌡️</div>
              <div className="gauge-title">Coolant Temperature</div>
              <div className="gauge-value">{asset.temperature} °C</div>
            </div>
            
            <div className="gauge-panel pressure">
              <div className="pressure-icon">↕️</div>
              <div className="gauge-title">Oil Pressure</div>
              <div className="gauge-value">{asset.pressure} bar</div>
            </div>
            
            <div className="gauge-panel fuel">
              <div className="fuel-container">
                <div className="fuel-level" style={{height: `${asset.fuel}%`}}></div>
                <div className="fuel-text">{asset.fuel} %</div>
              </div>
              <div className="gauge-title">Fuel Status</div>
            </div>
            
            <div className="gauge-panel battery">
              <div className="battery-container" style={{backgroundColor: getBatteryColor(asset.battery)}}>
                <div className="battery-text">{asset.battery} %</div>
              </div>
              <div className="gauge-title">Battery Status</div>
            </div>
          </div>

          {/* RPM Gauge */}
          <div className="panel rpm-panel">
            <div className="rpm-gauge">
              <GaugeChart
                id="rpm-gauge"
                nrOfLevels={20}
                colors={["#FF5F6D", "#FFC371", "#5cb85c"]}
                arcWidth={0.3}
                percent={asset.rpm / 3000}
                textColor="#000000"
                formatTextValue={() => `${asset.rpm}`}
              />
              <div className="rpm-title">RPM</div>
            </div>
            
            <div className="frequency-box">
              <div className="metric-title">Frequency</div>
              <div className="metric-value">{asset.frequency} Hz</div>
            </div>
            
            <div className="starts-box">
              <div className="metric-title">Number of Starts</div>
              <div className="metric-value">{asset.starts}</div>
            </div>
          </div>

          {/* Voltage & Current Metrics */}
          <div className="panel metrics-panel">
            <div className="panel-header with-icon">
              <span className="panel-icon">↗</span>
              <h3>Voltage & Current Metrics</h3>
            </div>
            
            <div className="voltage-gauges">
              {/* Line Voltage Gauges */}
              <div className="gauge-group">
                <h4>Line voltages (V)</h4>
                <div className="gauge-row">
                  <div className="voltage-gauge">
                    <GaugeChart
                      id="l1-l2-gauge"
                      nrOfLevels={20}
                      colors={["#FF5F6D", "#FFC371", "#5cb85c"]}
                      arcWidth={0.3}
                      percent={asset.voltages.L1_L2 / 500}
                      hideText={true}
                    />
                    <div className="gauge-display">{asset.voltages.L1_L2}</div>
                  </div>
                  <div className="voltage-gauge">
                    <GaugeChart
                      id="l2-l3-gauge"
                      nrOfLevels={20}
                      colors={["#FF5F6D", "#FFC371", "#5cb85c"]}
                      arcWidth={0.3}
                      percent={asset.voltages.L2_L3 / 500}
                      hideText={true}
                    />
                    <div className="gauge-display">{asset.voltages.L2_L3}</div>
                  </div>
                  <div className="voltage-gauge">
                    <GaugeChart
                      id="l3-l1-gauge"
                      nrOfLevels={20}
                      colors={["#FF5F6D", "#FFC371", "#5cb85c"]}
                      arcWidth={0.3}
                      percent={asset.voltages.L3_L1 / 500}
                      hideText={true}
                    />
                    <div className="gauge-display">{asset.voltages.L3_L1}</div>
                  </div>
                </div>
                <div className="gauge-labels">
                  <div>L1-L2</div>
                  <div>L2-L3</div>
                  <div>L3-L1</div>
                </div>
                <div className="gauge-values">
                  <div>{asset.voltages.L1_L2}.00</div>
                  <div>{asset.voltages.L2_L3}.00</div>
                  <div>{asset.voltages.L3_L1}.00</div>
                </div>
              </div>
              
              {/* Phase Current */}
              <div className="gauge-group">
                <h4>Phase Current (A)</h4>
                <div className="phase-values">
                  <div>L1</div>
                  <div>L2</div>
                  <div>L3</div>
                </div>
                <div className="phase-current-values">
                  <div>{asset.phaseCurrent.L1}.00</div>
                  <div>{asset.phaseCurrent.L2}.00</div>
                  <div>{asset.phaseCurrent.L3}.00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Power Metrics */}
          <div className="panel metrics-panel">
            <div className="panel-header with-icon">
              <span className="panel-icon">↗</span>
              <h3>Power Metrics</h3>
            </div>
            
            <div className="power-gauges">
              {powerMetrics.map((metric) => (
                <div key={metric.id} className="power-gauge">
                  <GaugeChart
                    id={metric.id}
                    nrOfLevels={20}
                    colors={["#FF5F6D", "#FFC371", "#5cb85c"]}
                    arcWidth={0.3}
                    percent={metric.value / metric.max}
                    hideText={true}
                  />
                  <div className="gauge-display">{metric.value}</div>
                  <h4>{metric.title}</h4>
                  <div className="power-values">
                    <div className="power-labels">
                      <div>L1</div>
                      <div>L2</div>
                      <div>L3</div>
                    </div>
                    {metric.id === "active-power" && (
                      <div className="power-numbers">
                        <div>{asset.activePower.L1}.00</div>
                        <div>{asset.activePower.L2}.00</div>
                        <div>{asset.activePower.L3}.00</div>
                      </div>
                    )}
                    {metric.id === "apparent-power" && (
                      <div className="power-numbers">
                        <div>{asset.apparentPower.L1}.00</div>
                        <div>{asset.apparentPower.L2}.00</div>
                        <div>{asset.apparentPower.L3}.00</div>
                      </div>
                    )}
                    {metric.id === "reactive-power" && (
                      <div className="power-numbers">
                        <div>{asset.reactivePower.L1}.00</div>
                        <div>{asset.reactivePower.L2}.00</div>
                        <div>{asset.reactivePower.L3}.00</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Energy Metrics */}
          <div className="panel energy-panel">
            <div className="panel-header">
              <h3>Energy Metrics</h3>
            </div>
            <div className="energy-data">
              <table className="energy-table">
                <thead>
                  <tr>
                    <th>kWh</th>
                    <th>kVAh</th>
                    <th>kVArh</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{asset.activePower.total}.00</td>
                    <td>{asset.apparentPower.total}.00</td>
                    <td>{asset.reactivePower.total}.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Power Factor */}
          <div className="panel power-factor-panel">
            <div className="panel-header">
              <h3>Power Factor</h3>
            </div>
            <div className="power-factor-data">
              <div className="power-factor-labels">
                <div>L1</div>
                <div>L2</div>
                <div>L3</div>
              </div>
              <div className="power-factor-values">
                <div>{asset.powerFactor.L1}</div>
                <div>{asset.powerFactor.L2}</div>
                <div>{asset.powerFactor.L3}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-footer">
        Powered by Thingsboard v3.3.0
      </div>
    </div>
  );
};

export default GeneratorDashboard;