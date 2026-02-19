import React, { useState } from 'react';
import { Snowflake, AlertTriangle, Thermometer, Zap } from 'lucide-react';

// Import components

import StatusCard from './components/StatusCard';
import ACOverviewTab from './components/ACOverviewTab';
import ACCoolingTab from './components/ACCoolingTab';
import ACElectricalTab from './components/ACElectricalTab';
import ACAlarmsTab from './components/ACAlarmsTab';
import ACUnitsList from './components/ACUnitsList';

import "./ACUnits.css"

const ACUnits = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: 'Overview' },
    { id: 1, label: 'Cooling' },
    { id: 2, label: 'Electrical' },
    { id: 3, label: 'Alarms' }
  ];

  const statusCards = [
    {
      title: "Total AC Units",
      value: "18",
      icon: <Snowflake size={32} />,
      color: "#0077ff"
    },
    {
      title: "Warning Status",
      value: "2",
      icon: <AlertTriangle size={32} />,
      color: "#f59e0b"
    },
    {
      title: "Average Temp",
      value: "22.4°C",
      icon: <Thermometer size={32} />,
      color: "#06b6d4"
    },
    {
      title: "Total Capacity",
      value: "630 kW",
      icon: <Zap size={32} />,
      color: "#10b981"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <ACOverviewTab />;
      case 1:
        return <ACCoolingTab />;
      case 2:
        return <ACElectricalTab />;
      case 3:
        return <ACAlarmsTab />;
      default:
        return <ACOverviewTab />;
    }
  };

  return (
    <div className="ac-units-page">
      <div className="page-header">
        <h1 className="page-title">Precision AC Units</h1>
        <p className="page-subtitle">
          Monitor and manage all precision AC units across all locations
        </p>
      </div>

      {/* Status Cards */}
      <div className="status-cards-grid">
        {statusCards.map((card, index) => (
          <StatusCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      {/* AC Units Overview with Tabs */}
      <div className="ac-overview-section">
        <div className="tabs-container">
          <div className="tabs-header">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="tab-content">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* AC Units List */}
      <ACUnitsList />
    </div>
  );
};

export default ACUnits;