import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../SideBar/SideBar';
import Navbar from '../navbar/Navbar'; // Import Navbar
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
      
      // Auto-collapse sidebar on mobile and tablet
      if (mobile) {
        setSidebarCollapsed(true);
        setMobileMenuOpen(false); // Close mobile menu on resize
      } else if (tablet) {
        setSidebarCollapsed(false); // Keep sidebar open on tablet
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

  // Close mobile menu when clicking on sidebar links
  const handleSidebarLinkClick = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Navbar - pass the toggle function */}
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
      
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        isMobile={isMobile}
        isTablet={isTablet}
        mobileMenuOpen={mobileMenuOpen}
        onToggle={handleSidebarToggle}
        onLinkClick={handleSidebarLinkClick}
        className={`${isMobile && mobileMenuOpen ? 'mobile-open' : ''} ${
          isTablet ? 'tablet-mode' : ''
        }`}
      />
      
      {/* Main Content Area */}
      <div className={`main-content ${
        sidebarCollapsed ? 'sidebar-collapsed' : ''
      } ${isMobile ? 'mobile-layout' : ''} ${
        isTablet ? 'tablet-layout' : ''
      }`}>
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;