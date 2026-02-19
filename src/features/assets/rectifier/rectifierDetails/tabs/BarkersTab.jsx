import React from "react";
import StatusCard from "../../../../shared/components/StatCard/StatCard";
import {
  Zap,
  Power,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Gauge,
} from "lucide-react";
import "../../../../../styles/assets/rectifier/RectifierDetails.css";

const BarkersTab = () => {
  // Sample breaker data - in real app, this would come from API
  const breakersData = [
    {
      id: "BRK-001",
      name: "Main Breaker",
      current: 28.5,
      maxCurrent: 50,
      voltage: 230,
      state: "ON",
      status: "Normal",
      temperature: 42,
      loadPercentage: 57,
      tripCount: 0,
      lastTrip: null,
      type: "Main",
    },
    {
      id: "BRK-002",
      name: "Load Breaker 1",
      current: 15.2,
      maxCurrent: 25,
      voltage: 230,
      state: "ON",
      status: "Normal",
      temperature: 38,
      loadPercentage: 61,
      tripCount: 2,
      lastTrip: "2024-12-15",
      type: "Load",
    },
    {
      id: "BRK-003",
      name: "Load Breaker 2",
      current: 9.8,
      maxCurrent: 20,
      voltage: 230,
      state: "ON",
      status: "Normal",
      temperature: 35,
      loadPercentage: 49,
      tripCount: 0,
      lastTrip: null,
      type: "Load",
    },
    {
      id: "BRK-004",
      name: "Aux Breaker",
      current: 3.2,
      maxCurrent: 10,
      voltage: 230,
      state: "OFF",
      status: "Tripped",
      temperature: 32,
      loadPercentage: 0,
      tripCount: 5,
      lastTrip: "2025-01-20",
      type: "Auxiliary",
    },
    {
      id: "BRK-005",
      name: "Battery Breaker",
      current: 12.8,
      maxCurrent: 30,
      voltage: 48,
      state: "ON",
      status: "Warning",
      temperature: 48,
      loadPercentage: 43,
      tripCount: 1,
      lastTrip: "2024-11-08",
      type: "Battery",
    },
    {
      id: "BRK-006",
      name: "Fan Breaker",
      current: 2.1,
      maxCurrent: 5,
      voltage: 230,
      state: "ON",
      status: "Normal",
      temperature: 33,
      loadPercentage: 42,
      tripCount: 0,
      lastTrip: null,
      type: "Fan",
    },
  ];

  // Calculate summary statistics
  const totalBreakers = breakersData.length;
  const onlineBreakers = breakersData.filter((b) => b.state === "ON").length;
  const trippedBreakers = breakersData.filter(
    (b) => b.status === "Tripped"
  ).length;
  const warningBreakers = breakersData.filter(
    (b) => b.status === "Warning"
  ).length;
  const totalCurrent = breakersData.reduce((sum, b) => sum + b.current, 0);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Normal":
        return CheckCircle;
      case "Warning":
        return AlertTriangle;
      case "Tripped":
        return XCircle;
      default:
        return Shield;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Normal":
        return "#10B981";
      case "Warning":
        return "#F59E0B";
      case "Tripped":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getStateIcon = (state) => {
    return state === "ON" ? Power : XCircle;
  };

  const getStateColor = (state) => {
    return state === "ON" ? "#10B981" : "#EF4444";
  };

  return (
    <div className="breakers-tab-container">
      {/* Summary Cards */}
      <div className="breakers-summary">
        <div className="breakers-summary-header">
          <Shield size={24} className="breakers-summary-icon" />
          <span className="breakers-summary-title">Breakers Overview</span>
        </div>

        <div className="breakers-summary-grid">
          <StatusCard
            icon={Shield}
            value={totalBreakers.toString()}
            label="Total Breakers"
            color="blue"
          />
          <StatusCard
            icon={CheckCircle}
            value={onlineBreakers.toString()}
            label="Online"
            color="green"
          />
          <StatusCard
            icon={XCircle}
            value={trippedBreakers.toString()}
            label="Tripped"
            color="red"
          />
          <StatusCard
            icon={Activity}
            value={`${totalCurrent.toFixed(1)}A`}
            label="Total Current"
            color="cyan"
          />
        </div>
      </div>

      {/* Breakers List */}
      <div className="breakers-list">
        <div className="breakers-list-header">
          <Activity size={24} className="breakers-list-icon" />
          <span className="breakers-list-title">Breakers Details</span>
        </div>

        <div className="breakers-grid">
          {breakersData.map((breaker) => {
            const StatusIcon = getStatusIcon(breaker.status);
            const StateIcon = getStateIcon(breaker.state);

            return (
              <div key={breaker.id} className="breaker-card">
                <div className="breaker-card-header">
                  <div className="breaker-info">
                    <h3 className="breaker-name">{breaker.name}</h3>
                    <span className="breaker-id">{breaker.id}</span>
                  </div>
                  <div className="breaker-status-badges">
                    <div
                      className="breaker-state-badge"
                      style={{ backgroundColor: getStateColor(breaker.state) }}
                    >
                      <StateIcon size={14} />
                      {breaker.state}
                    </div>
                    <div
                      className="breaker-status-badge"
                      style={{
                        backgroundColor: getStatusColor(breaker.status),
                      }}
                    >
                      <StatusIcon size={14} />
                      {breaker.status}
                    </div>
                  </div>
                </div>

                <div className="breaker-metrics">
                  <div className="breaker-metric">
                    <div className="metric-icon">
                      <Activity size={16} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">Current</span>
                      <span className="metric-value">{breaker.current}A</span>
                    </div>
                  </div>

                  <div className="breaker-metric">
                    <div className="metric-icon">
                      <Zap size={16} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">Voltage</span>
                      <span className="metric-value">{breaker.voltage}V</span>
                    </div>
                  </div>

                  <div className="breaker-metric">
                    <div className="metric-icon">
                      <Gauge size={16} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">Load</span>
                      <span className="metric-value">
                        {breaker.loadPercentage}%
                      </span>
                    </div>
                  </div>

                  <div className="breaker-metric">
                    <div className="metric-icon">
                      <Settings size={16} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">Type</span>
                      <span className="metric-value">{breaker.type}</span>
                    </div>
                  </div>
                </div>

                <div className="breaker-progress">
                  <div className="progress-label">
                    <span>
                      Load: {breaker.current}A / {breaker.maxCurrent}A
                    </span>
                    <span>{breaker.loadPercentage}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${breaker.loadPercentage}%`,
                        backgroundColor:
                          breaker.loadPercentage > 80
                            ? "#EF4444"
                            : breaker.loadPercentage > 60
                            ? "#F59E0B"
                            : "#10B981",
                      }}
                    />
                  </div>
                </div>

                {breaker.tripCount > 0 && (
                  <div className="breaker-trips">
                    <AlertTriangle size={16} className="trip-icon" />
                    <span className="trip-text">
                      {breaker.tripCount} trips • Last:{" "}
                      {breaker.lastTrip || "Never"}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BarkersTab;
