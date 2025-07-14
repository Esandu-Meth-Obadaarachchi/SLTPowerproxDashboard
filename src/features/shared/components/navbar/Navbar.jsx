import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import "./navbar.css";
import logo from "../../images/logo.png"; 
import ThemeToggleButton from "../theme/ThemeToggleButton";
import HamburgerMenu from "./hamburger";

const Navbar = ({ onSidebarToggle, isMobile, mobileMenuOpen }) => {
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
          isOpen={mobileMenuOpen}
          onToggle={onSidebarToggle}
          isMobile={isMobile}
        />
        <div className="navbar-logo">
          <img 
            src={logo} 
            alt="PowerProx Logo" 
            className="logo-icon" 
          />
          <span>PowerProx Dashboard</span>
        </div>

        <div className="navbar-controls">
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