import React from "react";
import "./usermanagement.css";

const HorizontalNavbar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "users", label: "Users" },
    { id: "activity-log", label: "Activity Log" },
    { id: "analytics", label: "Analytics" },
  ];

  return (
    <nav className="horizontal-navbar hover-lift-glow">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-tab ${activeTab === item.id ? "active" : ""}`}
          onClick={() => setActiveTab(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default HorizontalNavbar;
