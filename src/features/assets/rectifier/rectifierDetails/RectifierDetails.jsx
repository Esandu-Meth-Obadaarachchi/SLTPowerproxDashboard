import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import rectifiers from "../rectifier_components/rectifiersdetailsdoc.js";
import "../../../../styles/assets/rectifier/RectifierDetails.css";
import ACInputTab from "./tabs/ACInputTab";
import DCOutputTab from "./tabs/DCOutputTab";
import BatteryTab from "./tabs/BatteryTab";
import BarkersTab from "./tabs/BarkersTab";
import StatusCard from "../../../shared/components/StatCard/StatCard.jsx";
import MetricCard from "./rectifierDetailComponent/MetricCard";

import {
  BatteryCharging,
  Flag,
  Fuel,
  MapPin,
  Power,
  Thermometer,
  Zap,
} from "lucide-react";

const RectifierDetails = () => {
  const { rectifierId } = useParams();
  const [activeTab, setActiveTab] = useState("ACINPUT");

  // Force scroll to top on component mount and when rectifierId changes
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
  }, [rectifierId]);

  // Additional useEffect for delayed scroll after component renders
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const rectifier = rectifiers.find((r) => r.id === rectifierId);
  if (!rectifier) {
    return <div className="error-message">Rectifier not found</div>;
  }

  const tabs = [
    { id: "ACINPUT", label: "AC Input" },
    { id: "DCOUTPUT", label: "DC Output" },
    { id: "BATTERY", label: "Battery" },
    { id: "BARKERS", label: "Breakers" },
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
        return <ACInputTab />;
      case "DCOUTPUT":
        return <DCOutputTab />;
      case "BATTERY":
        return <BatteryTab />;
      case "BARKERS":
        return <BarkersTab />;
      default:
        return <ACInputTab />;
    }
  };

  return (
    <div className="dashboard ">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-icon">
              <Zap size={32} />
            </div>
            <div className="header-text">
              <h1>{`Rectifier Dashboard - ${rectifierId}`}</h1>
              <p> {`Monitor and Manage ${rectifierId} Rectifier System`}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tab-content-dashboard">
        <div className="status-grid">
          <StatusCard
            icon={MapPin}
            value="HQ"
            label="Location"
            color="yellow"
          />
          <StatusCard
            icon={Flag}
            value="Active"
            label="Rectifier Status"
            color="green"
          />
          <StatusCard
            icon={BatteryCharging}
            value="76%"
            label="Battery Charging Status"
            color="blue"
          />
          <StatusCard
            icon={Thermometer}
            value="197°C"
            label="Rectifier Temp"
            color="red"
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

export default RectifierDetails;
