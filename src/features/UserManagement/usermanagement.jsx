import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./usermanagement.css";

const userManagement = () => {
  const HorizontalNavbar = () => {
    const [activeTab, setActiveTab] = useState("users");

    const navItems = [
      { id: "users", label: "Users" },
      { id: "activity-log", label: "Activity Log" },
      { id: "analytics", label: "Analytics" },
    ];

    return (
      <nav className="horizontal-navbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-tab ${activeTab === item.id ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    );
  };

  const FilterSection = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [role, setRole] = useState("");
    const [region, setRegion] = useState("");
    const [status, setStatus] = useState("");

    return (
      <div className="toolbar-container">
        <input
          type="text"
          placeholder="🔍 Search users..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="dropdown"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="HQ">HQ Staff</option>
          <option value="tech">Technician</option>
          <option value="regional">Regional Staff</option>
          <option value="viewer">Viewer</option>
        </select>

        <select
          className="dropdown"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="">All Regions</option>
          <option value="us">US</option>
          <option value="eu">EU</option>
        </select>

        <select
          className="dropdown"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button className="add-user-btn">👤 ADD USER</button>
      </div>
    );
  };

  return (
    <>
      <div className="body-container">
        <div className="top-info">
          <h1 className="heading">User Management</h1>
          <p className="description">Manage users, roles and permissions</p>
        </div>
        <div className="information-container">
          <div>
            <HorizontalNavbar />
            <FilterSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default userManagement;
