import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SideBar.css";

const Sidebar = ({
  isCollapsed,
  isMobile,
  isTablet,
  mobileMenuOpen,
  onToggle,
  onLinkClick,
}) => {
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
      ),
    },
    {
      id: "generators",
      label: "Generators",
      path: "/app/generator",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 12h20M6.5 6.5l11 11M17.5 6.5l-11 11"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      ),
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
      ),
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
      ),
    },
    {
      id: "energyTrack",
      label: "Reports And Analysis",
      path: "/app/energytrack",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"></path>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
          <circle cx="18.7" cy="8" r="1.5"></circle>
          <circle cx="13.6" cy="13.2" r="1.5"></circle>
          <circle cx="10.8" cy="10.5" r="1.5"></circle>
          <circle cx="7" cy="14.3" r="1.5"></circle>
        </svg>
      ),
    },
    {
      id: "acUnits",
      label: "AC Unit",
      path: "/app/acUnits",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="8" width="20" height="10" rx="2" ry="2"></rect>
          <line x1="5" y1="11" x2="19" y2="11"></line>
          <line x1="5" y1="13" x2="19" y2="13"></line>
          <line x1="5" y1="15" x2="19" y2="15"></line>
          <circle cx="18" cy="10" r="1"></circle>
          <circle cx="16" cy="10" r="0.5"></circle>
          <path d="M7 6c0-1 1-2 2-2s2 1 2 2"></path>
          <path d="M13 6c0-1 1-2 2-2s2 1 2 2"></path>
          <line x1="2" y1="8" x2="2" y2="6"></line>
          <line x1="22" y1="8" x2="22" y2="6"></line>
        </svg>
      ),
    },
    {
      id: "fms",
      label: "Fault Management System",
      path: "/app/fms",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
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
          <circle cx="9" cy="12" r="2"></circle>
          <circle cx="15" cy="12" r="2"></circle>
          <path d="M11 12h2"></path>
        </svg>
      ),
    },
    {
      id: "upsSystem",
      label: "UPS System",
      path: "/app/upsSystem",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M8 12l2 2 4-4"></path>
          <path d="M16 6h.01"></path>
          <path d="M16 10h.01"></path>
          <rect x="6" y="20" width="12" height="2" rx="1"></rect>
          <path d="M12 18v2"></path>
        </svg>
      ),
    },
    {
      id: "userManagement",
      label: "User Management",
      path: "/app/userManagement",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
    },
    {
      id: "rectifier",
      label: "Rectifier",
      path: "/app/rectifier",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="12" rx="2" ry="2"></rect>
          <path d="M9 12l3-3 3 3"></path>
          <path d="M12 9v6"></path>
          <circle cx="7" cy="10" r="1"></circle>
          <circle cx="17" cy="10" r="1"></circle>
          <path d="M7 14h10"></path>
        </svg>
      ),
    },
    {
      id: "temperature",
      label: "Temperature Monitoring",
      path: "/app/temperature",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="11" y="3" width="2" height="10" rx="1" ry="1"></rect>
          <circle cx="12" cy="17" r="3"></circle>
          <line x1="12" y1="11" x2="12" y2="17"></line>
          <line x1="16" y1="6" x2="19" y2="6"></line>
          <line x1="16" y1="10" x2="19" y2="10"></line>
          <line x1="16" y1="14" x2="19" y2="14"></line>
        </svg>
      ),
    },
    {
      id: "roomAccess",
      label: "Room Access Control",
      path: "/app/rac",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <path d="M9 9h6v6H9z"></path>
          <path d="M3 9h6"></path>
          <path d="M15 15h6"></path>
          <path d="M12 3v6"></path>
          <path d="M12 15v6"></path>
        </svg>
      ),
    },
    {
      id: "canteens",
      label: "Canteens",
      path: "/app/canteens",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 3h16v18H4z"></path>
          <path d="M8 3v18"></path>
          <path d="M16 3v18"></path>
          <circle cx="12" cy="8" r="1"></circle>
          <circle cx="12" cy="16" r="1"></circle>
        </svg>
      ),
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (onLinkClick) onLinkClick();
  };

  const isActive = (path) => location.pathname === path;

  const getSidebarClasses = () => {
    let classes = "sidebar";
    if (isMobile) {
      classes += " mobile-sidebar";
      if (mobileMenuOpen) classes += " mobile-open";
    } else if (isTablet) {
      classes += " tablet-sidebar";
      if (isCollapsed) classes += " collapsed";
    } else {
      if (isCollapsed) classes += " collapsed";
    }
    return classes;
  };

  return (
    <div className={getSidebarClasses()}>
      <div className="sidebar-content">
        {!isMobile && (
          <div className="sidebar-header">
            <button className="sidebar-toggle" onClick={onToggle} aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            {!isCollapsed && <span className="sidebar-title">Menu</span>}
          </div>
        )}

        {isMobile && (
          <div className="sidebar-header mobile-header">
            <span className="sidebar-title">Menu</span>
            <button className="mobile-close-btn" onClick={onToggle} aria-label="Close mobile menu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-button ${isActive(item.path) ? "active" : ""}`}
                  onClick={() => handleNavigation(item.path)}
                  title={isCollapsed && !isMobile ? item.label : ""}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {(!isCollapsed || isMobile) && <span className="nav-label">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          {(!isCollapsed || isMobile) && (
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
