import React, { useState } from 'react';
import { Battery, AlertTriangle, Zap, Cpu } from 'lucide-react';

// ✅ Importing default-exported components
import UPSOverviewTab from './ups_components/UPSOverviewTab';
import UPSPerformanceTab from './ups_components/UPSPerformanceTab';
import UPSAlarmsTab from './ups_components/UPSAlarmsTab';
import StatusCard from './ups_components/StatusCard';
import UPSSystemsList from './ups_components/UPSSystemsList';
import UPSMaintenanceTab from './ups_components/UPSMaintenance';

import "../../../styles/assets/ups/UPSsystem.css";

const UPSSystem = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: 'Overview' },
    { id: 1, label: 'Performance' },
    { id: 2, label: 'Maintenance'},
    { id: 3, label: 'Alarms' }
  ];

  const statusCards = [
    {
      title: "Total UPS Systems",
      value: "12",
      icon: <Battery size={32} />,
      color: "#10b981"
    },
    {
      title: "Critical Status",
      value: "1",
      icon: <AlertTriangle size={32} />,
      color: "#ef4444"
    },
    {
      title: "Average Load",
      value: "68%",
      icon: <Zap size={32} />,
      color: "#0077ff"
    },
    {
      title: "Total Capacity",
      value: "720 kVA",
      icon: <Cpu size={32} />,
      color: "#06b6d4"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <UPSOverviewTab />;
      case 1:
        return <UPSPerformanceTab />;
      case 2:
        return <UPSMaintenanceTab />;  
      case 3:
        return <UPSAlarmsTab />;
      default:
        return <UPSOverviewTab />;
    }
  };

  return (
    <div className="ups-page">
      <div className="page-header">
        <h1 className="page-title">UPS Systems</h1>
        <p className="page-subtitle">
          Monitor and manage all UPS systems across all locations
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
            {tabs.map(t => (
              <button
                key={t.id}
                className={`tab-button ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {renderTabContent()}
          </div>
        </div>
      </div>

      <UPSSystemsList />
    </div>
  );
};

export default UPSSystem;
