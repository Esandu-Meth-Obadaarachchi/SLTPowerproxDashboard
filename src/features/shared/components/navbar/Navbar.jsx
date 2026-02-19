import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import "../../../../styles/Components/navbar.css";
import logo from "../../images/logo.png"; 
import ThemeToggleButton from "../theme/ThemeToggleButton";
import HamburgerMenu from "./hamburger";
import Logo from "../../../../assets/Logo.png";

const Navbar = ({ alarmCount, onMenuClick, isMobile }) => {
  console.log("🔴 NAVBAR RENDERING");
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);
      
      // Clear local/session storage
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout. Please try again.");
    }
  };
  
  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <HamburgerMenu 
          isOpen={false}
          onToggle={onMenuClick}
          isMobile={isMobile}
        />
        <div className="navbar-logo">
          <img className="Logo" src={Logo} alt="Logo" />
          <span>SLT PowerZenith</span>
        </div>

        <div className="navbar-controls">
          {/* Alarm Badge - Optional */}
          {alarmCount > 0 && (
            <button 
              className="alarm-badge-button"
              onClick={() => handleNavigation("/app/alarms")}
              aria-label={`${alarmCount} unread alarms`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                width="20"
                height="20"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {alarmCount > 0 && <span className="alarm-count">{alarmCount}</span>}
            </button>
          )}
          
          <ThemeToggleButton />
          
          <button 
            onClick={handleLogout} 
            className="logout-button"
            aria-label="Logout from dashboard"
          >
            <span>🔒 Logout</span>
          </button>
        </div>
        
      </div> 
    </nav>
  );
};

export default Navbar;