import React, { useState } from "react";
import HorizontalNavbar from "./HorizontalNavbar";
import UsersTab from "./UsersTab";
import ActivityLogTab from "./ActivityLogTab";
import AnalyticsTab from "./AnalyticsTab";
import "./usermanagement.css";

const USERS_PER_PAGE = 5;
const ACTIVITY_LOGS_PER_PAGE = 5;

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [currentPage, setCurrentPage] = useState(1);
  const [activityPage, setActivityPage] = useState(1);

  const [showAddUserPanel, setShowAddUserPanel] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [newUserRegion, setNewUserRegion] = useState("");

  const [users, setUsers] = useState([
    {
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Administrator",
      roleIcon: "👤",
      regions: ["All Regions"],
      status: "Active",
      lastLogin: "19/05/2025, 08:45:22",
    },
    {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "HQ Staff",
      roleIcon: "👥",
      regions: ["HQ"],
      status: "Active",
      lastLogin: "19/05/2025, 09:12:45",
    },
    {
      name: "Mike Chen",
      email: "mike.chen@example.com",
      role: "Technician",
      roleIcon: "👥",
      regions: ["East Region", "HQ"],
      status: "Active",
      lastLogin: "19/05/2025, 07:30:18",
    },
    {
      name: "Lisa Wong",
      email: "lisa.wong@example.com",
      role: "Regional Staff",
      roleIcon: "👥",
      regions: ["West Region"],
      status: "Active",
      lastLogin: "19/05/2025, 10:05:33",
    },
    {
      name: "David Rodriguez",
      email: "david.rodriguez@example.com",
      role: "Viewer",
      roleIcon: "👁️",
      regions: ["North Region"],
      status: "Inactive",
      lastLogin: "15/05/2025, 14:22:51",
    },
    {
      name: "Emma Watson",
      email: "emma.watson@example.com",
      role: "Viewer",
      roleIcon: "👁️",
      regions: ["South Region"],
      status: "Active",
      lastLogin: "15/05/2025, 11:22:51",
    },
  ]);

  const activityLogs = [
    {
      timestamp: "19/05/2025, 08:45:22",
      name: "John Smith",
      action: "Login",
      detail: "Successful login from 192.168.1.105",
    },
    {
      timestamp: "19/05/2025, 09:12:33",
      name: "John Smith",
      action: "User Management",
      detail: "Modified permissions for user USR-004",
    },
    {
      timestamp: "19/05/2025, 09:12:45",
      name: "Sarah Johnson",
      action: "Login",
      detail: "Successful login from 192.168.1.110",
    },
    {
      timestamp: "19/05/2025, 09:30:18",
      name: "Sarah Johnson",
      action: "Alarm Management",
      detail: "Acknowledged alarm ALM-2025-0042",
    },
    {
      timestamp: "19/05/2025, 07:30:18",
      name: "Mike Chen",
      action: "Login",
      detail: "Successful login from 192.168.1.115",
    },
    {
      timestamp: "18/05/2025, 14:12:18",
      name: "David Rodriguez",
      action: "User Update",
      detail: "Updated contact info",
    },
    {
      timestamp: "18/05/2025, 10:03:45",
      name: "Lisa Wong",
      action: "Logout",
      detail: "User logged out",
    },
    {
      timestamp: "18/05/2025, 09:32:10",
      name: "Sarah Johnson",
      action: "Password Change",
      detail: "User changed password",
    },
    {
      timestamp: "17/05/2025, 11:22:05",
      name: "Mike Chen",
      action: "Login",
      detail: "Successful login from 192.168.1.200",
    },
    {
      timestamp: "17/05/2025, 09:15:00",
      name: "John Smith",
      action: "System Settings",
      detail: "Updated system config",
    },
  ];

  const handleAddUser = () => {
    setShowAddUserPanel(true);
    setNewUserName("");
    setNewUserRole("");
    setNewUserRegion("");
  };

  const handleSubmitNewUser = () => {
    if (!newUserName.trim() || !newUserRole.trim() || !newUserRegion.trim()) {
      alert("Please fill all fields.");
      return;
    }

    const roleIconMap = {
      Administrator: "👤",
      "HQ Staff": "👥",
      Technician: "🛠️",
      "Regional Staff": "🌍",
      Viewer: "👁️",
    };

    const newUser = {
      name: newUserName,
      email: `${newUserName.toLowerCase().replace(/\s+/g, "")}@example.com`,
      role: newUserRole,
      roleIcon: roleIconMap[newUserRole] || "👤",
      regions: [newUserRegion],
      status: "Active",
      lastLogin: new Date().toLocaleString("en-GB"),
    };

    const newUsers = [...users, newUser];
    setUsers(newUsers);
    setCurrentPage(Math.ceil(newUsers.length / USERS_PER_PAGE));
    setShowAddUserPanel(false);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "users":
        return (
          <UsersTab
            users={users}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            handleAddUser={handleAddUser}
            showAddUserPanel={showAddUserPanel}
            setShowAddUserPanel={setShowAddUserPanel}
            newUserName={newUserName}
            newUserRole={newUserRole}
            newUserRegion={newUserRegion}
            setNewUserName={setNewUserName}
            setNewUserRole={setNewUserRole}
            setNewUserRegion={setNewUserRegion}
            handleSubmitNewUser={handleSubmitNewUser}
            USERS_PER_PAGE={USERS_PER_PAGE}
          />
        );
      case "activity-log":
        return (
          <ActivityLogTab
            activityLogs={activityLogs}
            activityPage={activityPage}
            setActivityPage={setActivityPage}
            ACTIVITY_LOGS_PER_PAGE={ACTIVITY_LOGS_PER_PAGE}
          />
        );
      case "analytics":
        return <AnalyticsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="body-container">
      <div className="top-info">
        <h1 className="heading">User Management</h1>
        <p className="description">Manage users, roles and permissions</p>
      </div>
      <HorizontalNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tab-content">{renderTab()}</div>
    </div>
  );
};

export default UserManagement;
