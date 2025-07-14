import React from 'react';

const HamburgerMenu = ({ isOpen, onToggle, isMobile }) => {
  // Only show hamburger on mobile
  if (!isMobile) {
    return null;
  }

  return (
    <button 
      className="mobile-menu-toggle" 
      onClick={onToggle}
      aria-label="Toggle mobile menu"
      aria-expanded={isOpen}
    >
      <div className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  );
};

export default HamburgerMenu;