import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./CanteensPage.css";
import { MapPin, AlertTriangle, Zap, Activity, TrendingUp } from 'lucide-react';

// Helper function to get the correct field value from data
// PRIMARY KEY = V1 (Rajabojun, 1st Floor, 2nd Floor)
// ALT KEY = V2 (Juice Bar ONLY)
const getFieldValue = (dataPoint, primaryKey, altKey) => {
  if (dataPoint[primaryKey] !== undefined && dataPoint[primaryKey] !== null) {
    return dataPoint[primaryKey];
  }
  if (altKey && dataPoint[altKey] !== undefined && dataPoint[altKey] !== null) {
    return dataPoint[altKey];
  }
  return null;
};

const ChartCard = ({ title, data, dataKey, altKey, color, unit }) => {
  // Check if this parameter has any data
  const hasData = data.some(point => getFieldValue(point, dataKey, altKey) !== null);
  
  if (!hasData) {
    return null; // Don't render chart if no data available
  }

  // Transform data to use the correct field
  const transformedData = data.map(point => ({
    ...point,
    value: getFieldValue(point, dataKey, altKey) || 0
  }));

  return (
    <div className="chart-card">
      <h4>{title}</h4>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={transformedData}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            stroke="#aaa"
            tickFormatter={(time) => {
              const date = new Date(time);
              return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
            }}
          />
          <YAxis stroke="#aaa" />
          <Tooltip 
            labelFormatter={(time) => new Date(time).toLocaleString()}
            formatter={(value) => [`${value.toFixed(2)} ${unit || ''}`, title]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const CanteensPage = () => {
  const [canteensData, setCanteensData] = useState({});
  const [activeTab, setActiveTab] = useState("");
  const [totals, setTotals] = useState({
    totalCanteens: 0,
    totalEnergy: 0,
    totalReactiveEnergy: 0,
    totalPower: 0,
    totalApparentPower: 0,
    totalReactivePower: 0
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chart parameters with TWO SEPARATE naming conventions
  const parameters = [
    // ===== POWER PARAMETERS =====
    { key: "total_kw", altKey: "ActivePower", color: "#00bcd4", unit: "kW", label: "Active Power" },
    { key: "total_kva", altKey: "Apparent_Power", color: "#9c27b0", unit: "kVA", label: "Apparent Power" },
    { key: "Reactive_Power", altKey: "Reactive_Power", color: "#ff9800", unit: "kVAr", label: "Reactive Power" },
    
    // ===== CURRENT PARAMETERS =====
    { key: "current_i1", altKey: "Current_", color: "#ffd54f", unit: "A", label: "Current Phase 1" },
    { key: "current_i2", altKey: null, color: "#ffeb3b", unit: "A", label: "Current Phase 2" },
    { key: "current_i3", altKey: null, color: "#ffc107", unit: "A", label: "Current Phase 3" },
    
    // ===== VOLTAGE PARAMETERS =====
    { key: "average_voltage_ln", altKey: "Voltage_L_N", color: "#00e676", unit: "V", label: "Avg Voltage" },
    { key: "voltage_v1n", altKey: null, color: "#4caf50", unit: "V", label: "Voltage Phase 1" },
    { key: "voltage_v2n", altKey: null, color: "#8bc34a", unit: "V", label: "Voltage Phase 2" },
    { key: "voltage_v3n", altKey: null, color: "#cddc39", unit: "V", label: "Voltage Phase 3" },
    
    // ===== POWER FACTOR =====
    { key: "average_pf", altKey: "average_pf", color: "#ff5722", unit: "", label: "Power Factor" },
    { key: "pf1", altKey: null, color: "#f44336", unit: "", label: "PF Phase 1" },
    { key: "pf2", altKey: null, color: "#e91e63", unit: "", label: "PF Phase 2" },
    { key: "pf3", altKey: null, color: "#9c27b0", unit: "", label: "PF Phase 3" },
    
    // ===== FREQUENCY =====
    { key: "frequency", altKey: "Freequency_", color: "#03a9f4", unit: "Hz", label: "Frequency" },
    
    // ===== ENERGY PARAMETERS =====
    { key: "total_net_kwh", altKey: "Total_KWh", color: "#cddc39", unit: "kWh", label: "Total Energy" },
    { key: "total_net_kvah", altKey: "Total_kVARh", color: "#e91e63", unit: "kVARh", label: "Total Reactive Energy" },
    
    // ===== PHASE-WISE POWER (V1 ONLY) =====
    { key: "kw1", altKey: null, color: "#ff6f00", unit: "kW", label: "Phase 1 Active Power" },
    { key: "kw2", altKey: null, color: "#d32f2f", unit: "kW", label: "Phase 2 Active Power" },
    { key: "kw3", altKey: null, color: "#7b1fa2", unit: "kW", label: "Phase 3 Active Power" },
    
    { key: "kva1", altKey: null, color: "#ad1457", unit: "kVA", label: "Phase 1 Apparent Power" },
    { key: "kva2", altKey: null, color: "#6a1b9a", unit: "kVA", label: "Phase 2 Apparent Power" },
    { key: "kva3", altKey: null, color: "#4a148c", unit: "kVA", label: "Phase 3 Apparent Power" },
  ];

  // Fetch canteen data from backend - SMOOTH BACKGROUND UPDATES
  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        setError(null);

        // Fetch all canteens data
        const response = await fetch("http://localhost:8001/canteens");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Check if we got data
        if (Object.keys(data).length === 0) {
          throw new Error("No canteen data available from database");
        }
        
        console.log("Data updated silently");
        
        // Update data WITHOUT affecting UI
        setCanteensData(data);
        
        // Only set active tab on very first load
        if (!activeTab && Object.keys(data).length > 0) {
          const firstCanteen = Object.keys(data)[0];
          setActiveTab(firstCanteen);
        }

        // Fetch totals for overview cards
        const totalsResponse = await fetch("http://localhost:8001/canteens/summary/totals");
        if (totalsResponse.ok) {
          const totalsData = await totalsResponse.json();
          setTotals(totalsData);
        }

        // Turn off initial loading after first successful load
        if (initialLoading) {
          setInitialLoading(false);
        }

      } catch (error) {
        console.error("Error fetching canteens:", error);
        // Only show error screen on first load
        if (initialLoading) {
          setError(`Failed to load canteen data: ${error.message}`);
          setInitialLoading(false);
        }
      }
    };

    fetchCanteens();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchCanteens, 30000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to get summary value with fallback
  const getSummaryValue = (primary, alt, defaultVal = 0) => {
    const summary = canteensData[activeTab]?.summary;
    if (!summary) return defaultVal;
    return summary[primary] ?? summary[alt] ?? defaultVal;
  };

  if (initialLoading) {
    return (
      <div className="dashboard-page">
        <div className="page-header">
          <h1 className="page-title">Loading Canteens Data...</h1>
          <p className="page-subtitle">Connecting to database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="page-header">
          <h1 className="page-title">Error</h1>
          <p className="page-subtitle" style={{color: '#ff5722'}}>{error}</p>
          <p className="page-subtitle" style={{color: '#aaa', marginTop: '10px'}}>
            Please check if the backend is running on http://localhost:8001
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!activeTab || !canteensData[activeTab]) {
    return (
      <div className="dashboard-page">
        <div className="page-header">
          <h1 className="page-title">No Canteen Data Available</h1>
          <p className="page-subtitle">Please check your InfluxDB measurements</p>
          <p className="page-subtitle" style={{color: '#aaa', marginTop: '10px'}}>
            Debug endpoint: <a href="http://localhost:8001/canteens/debug/all-canteen-fields" target="_blank" rel="noopener noreferrer" style={{color: '#00bcd4'}}>
              View all fields
            </a>
          </p>
        </div>
      </div>
    );
  }

  const data = canteensData[activeTab].chart;
  const currentSummary = canteensData[activeTab].summary;

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Canteens Dashboard</h1>
        <p className="page-subtitle">Real-time Electrical Power Monitoring</p>
      </div>

      {/* Canteens Overview Summary */}
      <div className="overview-grid mb-8 grid grid-cols-1 sm:grid-cols-5 gap-4">
        <div className="overview-card">
          <MapPin size={24} className="text-blue-400" />
          <div>
            <h4>Total Canteens</h4>
            <p>{totals.totalCanteens}</p>
          </div>
        </div>
        <div className="overview-card">
          <Activity size={24} className="text-green-400" />
          <div>
            <h4>Total Energy</h4>
            <p>{(totals.totalEnergy || 0).toLocaleString()} kWh</p>
          </div>
        </div>
        <div className="overview-card">
          <Activity size={24} className="text-yellow-400" />
          <div>
            <h4>Reactive Energy</h4>
            <p>{(totals.totalReactiveEnergy || 0).toLocaleString()} kVARh</p>
          </div>
        </div>
        <div className="overview-card">
          <Zap size={24} className="text-purple-400" />
          <div>
            <h4>Active Power</h4>
            <p>{(totals.totalPower || 0).toLocaleString()} kW</p>
          </div>
        </div>
        <div className="overview-card">
          <Zap size={24} className="text-orange-400" />
          <div>
            <h4>Reactive Power</h4>
            <p>{(totals.totalReactivePower || 0).toLocaleString()} kVAr</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {Object.keys(canteensData).map((canteen) => (
          <button
            key={canteen}
            className={`tab-button ${activeTab === canteen ? "active-tab" : ""}`}
            onClick={() => setActiveTab(canteen)}
          >
            {canteen}
          </button>
        ))}
      </div>

      {/* Page Header for Selected Canteen */}
      <div className="page-header">
        <h1 className="page-title">{activeTab}</h1>
        <p className="page-subtitle">
          Last updated: {new Date().toLocaleTimeString()} | 
          Active Power: {getSummaryValue('total_kw', 'ActivePower').toFixed(2)} kW | 
          Reactive Power: {getSummaryValue('Reactive_Power', 'Reactive_Power').toFixed(2)} kVAr | 
          Power Factor: {getSummaryValue('average_pf', 'average_pf').toFixed(2)}
        </p>
      </div>

      {/* Current Status Cards */}
      <div className="overview-grid mb-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="overview-card">
          <TrendingUp size={20} className="text-cyan-400" />
          <div>
            <h4>Voltage</h4>
            <p>{getSummaryValue('average_voltage_ln', 'Voltage_L_N').toFixed(1)} V</p>
          </div>
        </div>
        <div className="overview-card">
          <TrendingUp size={20} className="text-amber-400" />
          <div>
            <h4>Current</h4>
            <p>{getSummaryValue('current_i1', 'Current_').toFixed(2)} A</p>
          </div>
        </div>
        <div className="overview-card">
          <TrendingUp size={20} className="text-blue-400" />
          <div>
            <h4>Frequency</h4>
            <p>{getSummaryValue('frequency', 'Freequency_').toFixed(2)} Hz</p>
          </div>
        </div>
        <div className="overview-card">
          <TrendingUp size={20} className="text-purple-400" />
          <div>
            <h4>Apparent Power</h4>
            <p>{getSummaryValue('total_kva', 'Apparent_Power').toFixed(2)} kVA</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {parameters.map((param) => (
          <ChartCard
            key={param.key || param.altKey}
            title={param.label}
            data={data}
            dataKey={param.key}
            altKey={param.altKey}
            color={param.color}
            unit={param.unit}
          />
        ))}
      </div>
    </div>
  );
};

export default CanteensPage;