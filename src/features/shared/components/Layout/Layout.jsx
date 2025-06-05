import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../SideBar/SideBar';
import './Layout.css';

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Auto-collapse sidebar on mobile
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleMobileOverlayClick = () => {
    if (isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="app-layout">

      
      {/* Mobile overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={handleMobileOverlayClick}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        className={isMobile && mobileMenuOpen ? 'mobile-open' : ''}
      />
      
      {/* Main Content Area */}
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;