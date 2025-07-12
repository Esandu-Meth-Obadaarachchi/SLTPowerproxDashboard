import React from "react";
import { useTheme } from "./ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle-button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span>{theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
    </button>
  );
};

export default ThemeToggleButton;