import React from "react";
import StatusCard from "../upsDetailComponent/StatusCard";
import {
  AlertTriangle,
  XCircle,
  CheckCircle,
  Power,
  Battery,
  Thermometer,
  Wifi,
  Shield,
  Zap,
  Activity,
  Clock,
  AlertCircle,
} from "lucide-react";
import "../../../../../styles/assets/ups/UPSDetails.css";

const AlarmsTab = ({ upsData }) => {
  // Generate alarm data based on UPS status
  const generateAlarmStatus = () => {
    const isOnBattery = upsData.status === "On Battery";
    const isMaintenance = upsData.status === "Maintenance";
    const isBypass = upsData.status === "Bypass";
    const isOverloaded = upsData.load > 90;
    const isHighTemp = upsData.temperature > 40;
    const isLowBackup = upsData.backupTime < 15;

    return {
      // Critical Alarms
      inputFail: isOnBattery || isMaintenance,
      outputFail: isMaintenance,
      batteryBreakerOpen: isMaintenance,
      overload: isOverloaded,
      overtemperature: isHighTemp,

      // Warning Alarms
      bypassActive: isBypass,
      generalAlarm: isOnBattery || isBypass || isOverloaded,
      communicationLoss: false,
      batteryLow: isLowBackup,
      fanFailure: false,
    };
  };

  const alarmStatus = generateAlarmStatus();

  // Define alarm categories and their details
  const criticalAlarms = [
    {
      key: "inputFail",
      label: "Input Fail",
      icon: Power,
      description: "Utility power failure detected",
    },
    {
      key: "outputFail",
      label: "Output Fail",
      icon: Zap,
      description: "UPS output failure",
    },
    {
      key: "batteryBreakerOpen",
      label: "Battery Breaker Open",
      icon: Battery,
      description: "Battery circuit breaker is open",
    },
    {
      key: "overload",
      label: "Overload",
      icon: AlertTriangle,
      description: "Load exceeds UPS capacity",
    },
    {
      key: "overtemperature",
      label: "Overtemperature",
      icon: Thermometer,
      description: "UPS internal temperature too high",
    },
  ];

  const warningAlarms = [
    {
      key: "bypassActive",
      label: "Bypass Active",
      icon: Shield,
      description: "UPS is in bypass mode",
    },
    {
      key: "generalAlarm",
      label: "General Alarm",
      icon: AlertCircle,
      description: "General system warning",
    },
    {
      key: "communicationLoss",
      label: "Communication Loss",
      icon: Wifi,
      description: "Lost communication with UPS",
    },
    {
      key: "batteryLow",
      label: "Battery Low",
      icon: Battery,
      description: "Battery charge is low",
    },
    {
      key: "fanFailure",
      label: "Fan Failure",
      icon: Activity,
      description: "Cooling fan malfunction",
    },
  ];

  const getAlarmIcon = (status) => {
    return status ? XCircle : CheckCircle;
  };

  const getAlarmColor = (status, isCritical = false) => {
    if (!status) return "green";
    return isCritical ? "red" : "yellow";
  };

  const getAlarmValue = (status) => {
    return status ? "ACTIVE" : "NORMAL";
  };

  const activeAlarms = Object.entries(alarmStatus).filter(
    ([key, value]) => value
  );
  const criticalActiveAlarms = criticalAlarms.filter(
    (alarm) => alarmStatus[alarm.key]
  );
  const warningActiveAlarms = warningAlarms.filter(
    (alarm) => alarmStatus[alarm.key]
  );

  return (
    <div className="ups-container">
      {/* Alarms Overview */}
      <div className="ups-row">
        <div className="ups-row-header">
          <AlertTriangle size={24} className="ups-row-icon alarms-icon" />
          <span className="ups-row-title alarms-title">
            Alarms & Faults Overview
          </span>
          <span className="ups-status-indicator">
            {activeAlarms.length === 0
              ? "✅ All Systems Normal"
              : criticalActiveAlarms.length > 0
              ? "🚨 Critical Alarms Active"
              : "⚠️ Warnings Active"}
          </span>
        </div>

        {/* Summary Cards */}
        <div className="ups-input-grid">
          <StatusCard
            icon={AlertTriangle}
            value={criticalActiveAlarms.length.toString()}
            label="Critical Alarms"
            color={criticalActiveAlarms.length > 0 ? "red" : "green"}
          />
          <StatusCard
            icon={AlertCircle}
            value={warningActiveAlarms.length.toString()}
            label="Warning Alarms"
            color={warningActiveAlarms.length > 0 ? "yellow" : "green"}
          />
          <StatusCard
            icon={Shield}
            value={activeAlarms.length.toString()}
            label="Total Active"
            color={activeAlarms.length > 0 ? "orange" : "green"}
          />
          <StatusCard
            icon={Clock}
            value="Just Now"
            label="Last Update"
            color="blue"
          />
        </div>

        {/* Critical Alarms Section */}
        <div className="ups-info-section">
          <h3>🚨 Critical Alarms</h3>
          <div className="ups-input-grid">
            {criticalAlarms.map((alarm) => (
              <StatusCard
                key={alarm.key}
                icon={getAlarmIcon(alarmStatus[alarm.key])}
                value={getAlarmValue(alarmStatus[alarm.key])}
                label={alarm.label}
                color={getAlarmColor(alarmStatus[alarm.key], true)}
              />
            ))}
          </div>
        </div>

        {/* Warning Alarms Section */}
        <div className="ups-info-section">
          <h3>⚠️ Warning Alarms</h3>
          <div className="ups-input-grid">
            {warningAlarms.map((alarm) => (
              <StatusCard
                key={alarm.key}
                icon={getAlarmIcon(alarmStatus[alarm.key])}
                value={getAlarmValue(alarmStatus[alarm.key])}
                label={alarm.label}
                color={getAlarmColor(alarmStatus[alarm.key], false)}
              />
            ))}
          </div>
        </div>

        {/* Active Alarms Details */}
        {activeAlarms.length > 0 && (
          <div className="ups-info-section">
            <h3>🔔 Active Alarm Details</h3>
            <div className="ups-info-grid">
              {activeAlarms.map(([key, status]) => {
                const alarmInfo = [...criticalAlarms, ...warningAlarms].find(
                  (alarm) => alarm.key === key
                );
                const isCritical = criticalAlarms.some(
                  (alarm) => alarm.key === key
                );
                return (
                  <div key={key} className="ups-info-item">
                    <span className="ups-info-label">{alarmInfo?.label}:</span>
                    <span
                      className={`ups-info-value ${
                        isCritical ? "status-critical" : "status-warning"
                      }`}
                    >
                      {alarmInfo?.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* System Status Summary */}
        <div className="ups-info-section">
          <h3>📊 System Health Summary</h3>
          <div className="ups-info-grid">
            <div className="ups-info-item">
              <span className="ups-info-label">Overall Status:</span>
              <span
                className={`ups-info-value ${
                  criticalActiveAlarms.length > 0
                    ? "status-critical"
                    : warningActiveAlarms.length > 0
                    ? "status-warning"
                    : "status-normal"
                }`}
              >
                {criticalActiveAlarms.length > 0
                  ? "Critical - Immediate Action Required"
                  : warningActiveAlarms.length > 0
                  ? "Warning - Monitor Closely"
                  : "Normal - All Systems Operational"}
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">UPS Status:</span>
              <span className="ups-info-value">{upsData.status}</span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Load Level:</span>
              <span
                className={`ups-info-value ${
                  upsData.load > 90 ? "status-warning" : "status-normal"
                }`}
              >
                {upsData.load}% {upsData.load > 90 ? "(High Load)" : "(Normal)"}
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Temperature:</span>
              <span
                className={`ups-info-value ${
                  upsData.temperature > 40 ? "status-warning" : "status-normal"
                }`}
              >
                {upsData.temperature}°C{" "}
                {upsData.temperature > 40 ? "(High)" : "(Normal)"}
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Backup Time:</span>
              <span
                className={`ups-info-value ${
                  upsData.backupTime < 15 ? "status-warning" : "status-normal"
                }`}
              >
                {upsData.backupTime} minutes{" "}
                {upsData.backupTime < 15 ? "(Low)" : "(Adequate)"}
              </span>
            </div>
            <div className="ups-info-item">
              <span className="ups-info-label">Last Maintenance:</span>
              <span className="ups-info-value">2024-07-15 (3 weeks ago)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlarmsTab;
