import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import "./navbar.css";
import logo from "../../images/logo.png"; 
import ThemeToggleButton from "../theme/ThemeToggleButton";

const Navbar = () => {
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
        <div className="navbar-logo">
          <img 
            src={logo} 
            alt="PowerProx Logo" 
            className="logo-icon" 
          />
          <span>PowerProx Dashboard</span>
        </div>

        {/* <div className="navbar-links">
          <div 
            className={`nav-item ${isActive("/app/overview") ? "active" : ""}`}
            onClick={() => handleNavigation("/app/overview")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Overview</span>
          </div>

          <div 
            className={`nav-item ${isActive("/app/generator") ? "active" : ""}`}
            onClick={() => handleNavigation("/app/generator")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span>Generators</span>
          </div>

          <div 
            className={`nav-item ${isActive("/app/locations") ? "active" : ""}`}
            onClick={() => handleNavigation("/app/locations")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Locations</span>
          </div>

          <div 
            className={`nav-item ${isActive("/app/alarms") ? "active" : ""}`}
            onClick={() => handleNavigation("/app/alarms")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span>Alarms</span>
          </div>
        </div>

        <div className="user-section">
          <div className="logout-button" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </div>
        </div>*/}

        <div className="navbar-controls">
          <ThemeToggleButton />
          <button onClick={handleLogout} className="logout-button">🔒 Logout</button>
        </div>
        
      </div> 
    </nav>
  );
};

export default Navbar;