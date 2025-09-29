import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Zap,
  Power,
  Battery,
  Info,
  AlertTriangle,
  Wrench,
  Activity,
  ArrowLeft,
  MapPin,
  Flag,
  BatteryCharging,
  Thermometer,
  Clock,
  Gauge,
} from "lucide-react";
import ACInputTab from "./tabs/ACInputTab";
import ACOutputTab from "./tabs/ACOutputTab";
import BatteryTab from "./tabs/BatteryTab";
import UPSInfoTab from "./tabs/UPSInfoTab";
import AlarmsTab from "./tabs/AlarmsTab";
import MaintenanceTab from "./tabs/MaintenanceTab";
import StatusCard from "./upsDetailComponent/StatusCard";
import "./UPSDetails.css";

const UPSDetails = () => {
  const [activeTab, setActiveTab] = useState("ACINPUT");
  const { upsId } = useParams();
  const navigate = useNavigate();

  // Force scroll to top on component mount and when upsId changes
  useEffect(() => {
    // Multiple approaches to ensure scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Also scroll the main content area if it exists
    const mainContent = document.querySelector(".main-content");
    if (mainContent) {
      mainContent.scrollTop = 0;
    }

    const contentArea = document.querySelector(".content-area");
    if (contentArea) {
      contentArea.scrollTop = 0;
    }
  }, [upsId]);

  // Additional useEffect for delayed scroll after component renders
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Get UPS data based on ID
  const getUPSData = (id) => {
    const upsDatabase = {
      "UPS-01": {
        id: "UPS-01",
        name: "Galaxy 7000 - Primary",
        model: "Galaxy 7000",
        location: "HQ Data Center",
        load: 85,
        status: "Normal",
        temperature: 32,
        backupTime: 45,
        ratedCapacity: "3000 VA / 2700 W",
      },
      "UPS-02": {
        id: "UPS-02",
        name: "Galaxy 7000 - Secondary",
        model: "Galaxy 7000",
        location: "HQ Data Center",
        load: 92,
        status: "On Battery",
        temperature: 35,
        backupTime: 28,
        ratedCapacity: "3000 VA / 2700 W",
      },
      "UPS-03": {
        id: "UPS-03",
        name: "Galaxy 7000 - Backup",
        model: "Galaxy 7000",
        location: "East Data Center",
        load: 0,
        status: "Maintenance",
        temperature: 24,
        backupTime: 120,
        ratedCapacity: "3000 VA / 2700 W",
      },
      "UPS-04": {
        id: "UPS-04",
        name: "Galaxy 5000 - East Main",
        model: "Galaxy 5000",
        location: "East Data Center",
        load: 65,
        status: "Normal",
        temperature: 29,
        backupTime: 55,
        ratedCapacity: "5000 VA / 4500 W",
      },
      "UPS-05": {
        id: "UPS-05",
        name: "Galaxy 5000 - West Main",
        model: "Galaxy 5000",
        location: "West Data Center",
        load: 72,
        status: "Bypass",
        temperature: 31,
        backupTime: 42,
        ratedCapacity: "5000 VA / 4500 W",
      },
    };
    return (
      upsDatabase[id] || {
        id: "Unknown",
        name: "Unknown UPS",
        model: "Unknown",
        location: "Unknown",
        load: 0,
        status: "Unknown",
        temperature: 0,
        backupTime: 0,
        ratedCapacity: "Unknown",
      }
    );
  };

  const currentUPS = getUPSData(upsId);

  if (!currentUPS || currentUPS.id === "Unknown") {
    return <div className="error-message">UPS not found</div>;
  }

  const handleBackClick = () => {
    navigate("/app/upsSystem");
  };

  const tabs = [
    { id: "ACINPUT", label: "AC Input" },
    { id: "ACOUTPUT", label: "AC Output" },
    { id: "BATTERY", label: "Battery" },
    { id: "ALARMS", label: "Alarms & Faults" },
    { id: "MAINTENANCE", label: "Maintenance & Logs" },
  ];

  // Function to get color value based on color name
  const getColorValue = (color) => {
    const colors = {
      blue: "#60A5FA",
      green: "#34D399",
      yellow: "#FBBF24",
      red: "#F87171",
      purple: "#A78BFA",
    };
    return colors[color] || colors.blue;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "ACINPUT":
        return <ACInputTab upsData={currentUPS} />;
      case "ACOUTPUT":
        return <ACOutputTab upsData={currentUPS} />;
      case "BATTERY":
        return <BatteryTab upsData={currentUPS} />;
      case "ALARMS":
        return <AlarmsTab upsData={currentUPS} />;
      case "MAINTENANCE":
        return <MaintenanceTab upsData={currentUPS} />;
      default:
        return <ACInputTab upsData={currentUPS} />;
    }
  };

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  // Enhanced UPS status data
  const upsStatus = {
    name: currentUPS.name,
    id: currentUPS.id,
    model: currentUPS.model,
    status: currentUPS.status.toLowerCase(),
    location: currentUPS.location,
    capacity: currentUPS.ratedCapacity,
    loadLevel: currentUPS.load,
    temperature: currentUPS.temperature,
    backupTime: currentUPS.backupTime,
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "normal":
        return "ups-status-online";
      case "on battery":
        return "ups-status-warning";
      case "bypass":
        return "ups-status-warning";
      case "maintenance":
        return "ups-status-offline";
      case "critical":
        return "ups-status-offline";
      default:
        return "ups-status-offline";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "normal":
        return "green";
      case "on battery":
        return "yellow";
      case "bypass":
        return "yellow";
      case "maintenance":
        return "orange";
      case "critical":
        return "red";
      default:
        return "red";
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-icon">
              <Activity size={32} />
            </div>
            <div className="header-text">
              <h1>{`UPS Dashboard – ${currentUPS.name || currentUPS.id}`}</h1>
              <p>{`Monitor and Manage ${
                currentUPS.name || currentUPS.id
              } UPS System`}</p>
            </div>
          </div>
          <div className="header-right">
            <button className="back-button" onClick={handleBackClick}>
              <ArrowLeft size={20} />← Back to UPS Systems
            </button>
          </div>
        </div>
      </div>

      {/* Top Info Cards - Key Highlights */}
      <div className="tab-content-dashboard">
        <div className="status-grid">
          <StatusCard
            icon={MapPin}
            value={currentUPS.location}
            label="Location"
            color="blue"
          />
          <StatusCard
            icon={Flag}
            value={currentUPS.status}
            label="UPS Status"
            color={getStatusColor(currentUPS.status)}
          />
          <StatusCard
            icon={Gauge}
            value={`${currentUPS.load}%`}
            label="Load Level"
            color={
              currentUPS.load > 90
                ? "red"
                : currentUPS.load > 75
                ? "yellow"
                : "green"
            }
          />
          <StatusCard
            icon={Thermometer}
            value={`${currentUPS.temperature}°C`}
            label="Temperature"
            color={
              currentUPS.temperature > 40
                ? "red"
                : currentUPS.temperature > 35
                ? "yellow"
                : "green"
            }
          />
          <StatusCard
            icon={Clock}
            value={`${currentUPS.backupTime} min`}
            label="Backup Time Remaining"
            color={
              currentUPS.backupTime < 15
                ? "red"
                : currentUPS.backupTime < 30
                ? "yellow"
                : "green"
            }
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content-wrapper">{renderTabContent()}</div>
    </div>
  );
};

export default UPSDetails;
