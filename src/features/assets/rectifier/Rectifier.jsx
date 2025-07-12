import React, { useState } from 'react';
import { BatteryCharging, AlertTriangle, Zap, Cpu } from 'lucide-react';

import RectifierOverviewTab from './rectifier_components/RectifierOverviewTab';
import RectifierAnalyticsTab from './rectifier_components/RectifierAnalyticsTab';
import RectifierModulesTab from './rectifier_components/RectifierModulesTab';
import RectifierAlarmsTab from './rectifier_components/RectifierAlarmsTab';
import StatusCard from './rectifier_components/StatusCard'; // You can reuse this
import RectifierList from './rectifier_components/RectifierList';
import RoutineInspection from './rectifier_components/RectifierRoutineInspection';

import './Rectifier.css';

const Rectifier = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: 'Overview' },
    { id: 1, label: 'Analytics' },
    { id: 2, label: 'Modules' },
    { id: 3, label: 'Alarms' },
    { id: 4, label: 'Routine Inspection'}
  ];

  const statusCards = [
    {
      title: "Total Rectifiers",
      value: "15",
      icon: <BatteryCharging size={32} />,
      color: "#10b981"
    },
    {
      title: "Critical Issues",
      value: "2",
      icon: <AlertTriangle size={32} />,
      color: "#ef4444"
    },
    {
      title: "Avg Output Load",
      value: "73%",
      icon: <Zap size={32} />,
      color: "#0077ff"
    },
    {
      title: "System Voltage",
      value: "48V",
      icon: <Cpu size={32} />,
      color: "#06b6d4"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <RectifierOverviewTab />;
      case 1:
        return <RectifierAnalyticsTab />;
      case 2:
        return <RectifierModulesTab />;
      case 3:
        return <RectifierAlarmsTab />;
      case 4:
        return <RoutineInspection />; 
      default:
        return <RectifierOverviewTab />;
    }
  };

  return (
    <div className="ups-page">
      <div className="page-header">
        <h1 className="page-title">Rectifier System</h1>
        <p className="page-subtitle">
          Monitor and manage all rectifier systems across your infrastructure
        </p>
      </div>

      <div className="status-cards-grid">
        {statusCards.map((card, i) => (
          <StatusCard
            key={i}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      <div className="ups-overview-section">
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

      <RectifierList />
    </div>
  );
};

export default Rectifier;
