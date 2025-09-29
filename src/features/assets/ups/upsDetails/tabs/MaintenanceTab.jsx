import React from "react";
import StatusCard from "../upsDetailComponent/StatusCard";
import {
  Wrench,
  Calendar,
  Clock,
  FileText,
  AlertTriangle,
  Activity,
  CheckCircle,
  Settings,
  Tool,
  History,
} from "lucide-react";
import "../UPSDetails.css";

const MaintenanceTab = ({ upsData }) => {
  console.log("MaintenanceTab rendered with upsData:", upsData);

  // Sample maintenance data
  const maintenanceHistory = [
    {
      id: 1,
      date: "2024-12-15",
      type: "Scheduled Maintenance",
      description: "Battery health check and cleaning",
      technician: "John Smith",
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-09-10",
      type: "Battery Replacement",
      description: "Replaced battery set 2 (24 batteries)",
      technician: "Mike Johnson",
      status: "Completed",
    },
    {
      id: 3,
      date: "2024-06-05",
      type: "Preventive Maintenance",
      description: "Fan cleaning and filter replacement",
      technician: "Sarah Wilson",
      status: "Completed",
    },
  ];

  // Sample event logs
  const eventLogs = [
    {
      id: 1,
      timestamp: "2025-08-12 14:32:15",
      event: "Power Fail",
      description: "AC input power lost, switched to battery",
      severity: "Warning",
    },
    {
      id: 2,
      timestamp: "2025-08-12 14:35:22",
      event: "Power Restored",
      description: "AC input power restored, charging batteries",
      severity: "Info",
    },
    {
      id: 3,
      timestamp: "2025-08-11 09:15:30",
      event: "Bypass Active",
      description: "Manual bypass activated for maintenance",
      severity: "Warning",
    },
    {
      id: 4,
      timestamp: "2025-08-11 11:45:18",
      event: "Normal Operation",
      description: "Bypass deactivated, normal operation resumed",
      severity: "Info",
    },
    {
      id: 5,
      timestamp: "2025-08-10 16:20:45",
      event: "Overload Cleared",
      description: "Load reduced to normal levels",
      severity: "Info",
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "red";
      case "Warning":
        return "orange";
      case "Info":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <div className="ups-container">
      {/* Maintenance Overview */}
      <div className="ups-row">
        <div className="ups-row-header">
          <Wrench size={24} className="ups-row-icon maintenance-icon" />
          <span className="ups-row-title maintenance-title">
            Maintenance & Logs Overview
          </span>
          <span className="ups-status-indicator">✅ System Up to Date</span>
        </div>

        {/* Maintenance Summary Cards */}
        <div className="ups-input-grid">
          <StatusCard
            icon={Calendar}
            value="2024-12-15"
            label="Last Maintenance"
            color="green"
          />
          <StatusCard
            icon={Clock}
            value="2025-03-15"
            label="Next Scheduled"
            color="orange"
          />
          <StatusCard
            icon={Settings}
            value="3"
            label="Total Services"
            color="blue"
          />
          <StatusCard
            icon={CheckCircle}
            value="Up to Date"
            label="Status"
            color="green"
          />
        </div>

        {/* Maintenance History Section */}
        <div className="ups-info-section">
          <h3>🔧 Maintenance History</h3>
          <div className="ups-log-table">
            <div className="ups-log-header">
              <span>Date</span>
              <span>Type</span>
              <span>Description</span>
              <span>Technician</span>
              <span>Status</span>
            </div>
            {maintenanceHistory.map((maintenance) => (
              <div key={maintenance.id} className="ups-log-row">
                <span className="ups-log-date">{maintenance.date}</span>
                <span className="ups-log-type">{maintenance.type}</span>
                <span className="ups-log-description">
                  {maintenance.description}
                </span>
                <span className="ups-log-technician">
                  {maintenance.technician}
                </span>
                <span
                  className={`ups-log-status status-${maintenance.status.toLowerCase()}`}
                >
                  {maintenance.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Event Logs Section */}
        <div className="ups-info-section">
          <h3>📋 Recent Event Logs</h3>
          <div className="ups-log-table">
            <div className="ups-log-header">
              <span>Timestamp</span>
              <span>Event</span>
              <span>Description</span>
              <span>Severity</span>
            </div>
            {eventLogs.map((event) => (
              <div key={event.id} className="ups-log-row">
                <span className="ups-log-timestamp">{event.timestamp}</span>
                <span className="ups-log-event">{event.event}</span>
                <span className="ups-log-description">{event.description}</span>
                <span
                  className={`ups-log-severity severity-${event.severity.toLowerCase()}`}
                >
                  {event.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Schedule Section */}
        <div className="ups-info-section">
          <h3>📅 Maintenance Schedule</h3>
          <div className="ups-info-grid">
            <div className="ups-info-item">
              <span className="ups-info-label">Battery Check:</span>
              <span className="ups-info-value">Every 3 months</span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Filter Replacement:</span>
              <span className="ups-info-value">Every 6 months</span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Full Service:</span>
              <span className="ups-info-value">Annually</span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Battery Replacement:</span>
              <span className="ups-info-value">Every 3-5 years</span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Next Service Due:</span>
              <span className="ups-info-value status-warning">
                2025-03-15 (7 months)
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Service Contract:</span>
              <span className="ups-info-value status-normal">
                Active until 2025-12-31
              </span>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="ups-info-section">
          <h3>ℹ️ System Information</h3>
          <div className="ups-info-grid">
            <div className="ups-info-item">
              <span className="ups-info-label">UPS Model:</span>
              <span className="ups-info-value">{upsData.model}</span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Serial Number:</span>
              <span className="ups-info-value">{upsData.serialNumber}</span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Installation Date:</span>
              <span className="ups-info-value">2022-01-15</span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Warranty Status:</span>
              <span className="ups-info-value status-normal">
                Under Warranty
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Current Status:</span>
              <span
                className={`ups-info-value ${
                  upsData.status === "Normal"
                    ? "status-normal"
                    : upsData.status === "On Battery"
                    ? "status-warning"
                    : "status-critical"
                }`}
              >
                {upsData.status}
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Runtime:</span>
              <span className="ups-info-value">
                {upsData.backupTime} minutes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceTab;
