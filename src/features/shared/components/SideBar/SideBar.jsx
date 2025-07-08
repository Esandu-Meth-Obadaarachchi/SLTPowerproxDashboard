import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SideBar.css";

const Sidebar = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      path: "/app/overview",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      )
    },
    {
      id: "generators",
      label: "Generators",
      path: "/app/generator",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      id: "locations",
      label: "Locations",
      path: "/app/locations",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      id: "alarms",
      label: "Alarms",
      path: "/app/alarms",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      )
    },
    {

      id: "EnergyTrack",
      label: "Reports And Analysis",
      path: "/app/energytrack",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 3v18M6 9v12M16 13v6M21 5v14" />
      </svg>
      
      )
    },{
      id: "acUnits",
      label: "AC Unit",
      path: "/app/acUnits",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* AC Unit Body */}
          <rect x="2" y="8" width="20" height="10" rx="2" ry="2"></rect>
          {/* Cooling vents */}
          <line x1="5" y1="11" x2="19" y2="11"></line>
          <line x1="5" y1="13" x2="19" y2="13"></line>
          <line x1="5" y1="15" x2="19" y2="15"></line>
          {/* Control panel */}
          <circle cx="18" cy="10" r="1"></circle>
          <circle cx="16" cy="10" r="0.5"></circle>
          {/* Air flow indicators */}
          <path d="M7 6c0-1 1-2 2-2s2 1 2 2"></path>
          <path d="M13 6c0-1 1-2 2-2s2 1 2 2"></path>
          {/* Mounting brackets */}
          <line x1="2" y1="8" x2="2" y2="6"></line>
          <line x1="22" y1="8" x2="22" y2="6"></line>
        </svg>
      )
    },
    {

      id: "fms",
      label: "Fault Management System",
      path: "/app/fms",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 3v18M6 9v12M16 13v6M21 5v14" />
      </svg>
      
      )

    },
    {
      id: "transformers",
      label: "Transformers",
      path: "/app/transformers",
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="8" rx="2" ry="2"></rect>
        <path d="M6 8V6"></path>
        <path d="M18 8V6"></path>
        <path d="M6 16v2"></path>
        <path d="M18 16v2"></path>
        <path d="M12 12h.01"></path>
      </svg>
      )
    },

    {
      id: "upsSystem",
      label: "UPS System",
      path:"/app/upsSystem",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <polyline points="9 12 12 15 15 12"></polyline>
        </svg>
      )
    },
    {
      id: "userManagement",
      label: "User Management",
      path:"/app/userManagement",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <polyline points="9 12 12 15 15 12"></polyline>
        </svg>
      )
    },

    
   
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <button 
            className="sidebar-toggle"
            onClick={onToggle}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          {!isCollapsed && <span className="sidebar-title">Menu</span>}
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-button ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.path)}
                  title={isCollapsed ? item.label : ''}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!isCollapsed && <span className="nav-label">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          {!isCollapsed && (
            <div className="sidebar-info">
              <p className="app-version">PowerProx v1.0</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;