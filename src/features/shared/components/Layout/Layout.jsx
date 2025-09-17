import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../SideBar/SideBar';
import Navbar from '../navbar/Navbar';
import './Layout.css';

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width <= 768;
      const tablet = width > 768 && width <= 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);

      if (mobile) {
        setSidebarCollapsed(true);
        setMobileMenuOpen(false);
      } else if (tablet) {
        setSidebarCollapsed(false);
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

  const handleSidebarLinkClick = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Sidebar - rendered outside the scroll container */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        isMobile={isMobile}
        isTablet={isTablet}
        mobileMenuOpen={mobileMenuOpen}
        onToggle={handleSidebarToggle}
        onLinkClick={handleSidebarLinkClick}
      />

      {/* Main layout */}
      <div className="app-layout">
        {/* Navbar */}
        <Navbar 
          onSidebarToggle={handleSidebarToggle}
          isMobile={isMobile}
          mobileMenuOpen={mobileMenuOpen}
        />

        {/* Mobile overlay */}
        {isMobile && mobileMenuOpen && (
          <div 
            className="mobile-overlay" 
            onClick={handleMobileOverlayClick}
          />
        )}

        {/* Main Content */}
        <div 
          className={`main-content ${
            sidebarCollapsed ? 'sidebar-collapsed' : ''
          } ${isMobile ? 'mobile-layout' : ''} ${
            isTablet ? 'tablet-layout' : ''
          }`}
        >
          <div className="content-area">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
