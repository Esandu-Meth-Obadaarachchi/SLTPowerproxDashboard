import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RoleProtectedRoute from "./ProtectedRoute";

// Authentication Pages
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import ForgotPassword from "../Auth/ForgotPassword";

// Main Pages
import LandingPage from "../LandingPage/LandingPage";
import Overview from "../OverviewPage/Overview";
import Location from "../MapLocationPage/MapLocation";
import LocationDetail from "../LocationDetail/LocationDetail";
import LocationSelector from "../LocationSelector/LocationSelector";
import EnergyTrack from "../reportsAndAnalytics/EnergyTrackPage";
import ACUnits from "../assets/acunit/ACUnits.jsx";
import GeneratorDashboard from "../assets/generator/components/Generator";
import RectifierDetails from "../assets/rectifier/rectifierDetails/RectifierDetails";
import UPSDetails from "../assets/ups/upsDetails/UPSDetails";
import UPSSystem from "../assets/ups/UPSsystem.jsx";
import FaultManagementSystem from "../FaultManagementSystem/FaultManagement";
import UserManagement from "../UserManagement/usermanagement";
import Rectifier from "../assets/rectifier/Rectifier";
import RoomAccessControl from "../RoomAccessControl/RoomAccessControl";
import TemperatureMonitoring from "../TemparatureMonitoring/temperatureMonitoring";
import Layout from "../shared/components/Layout/Layout";
import TransformersPage from '../assets/TransformerMonitoring/TransformersPage';
import CanteensPage from "../assets/canteen/components/CanteensPage";

const Alarms = () => <div>Alarms Page (Placeholder)</div>;

// Cleaned up ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const userString = localStorage.getItem("user") || sessionStorage.getItem("user");
  const isAuthenticated = userString ? JSON.parse(userString).isAuthenticated : false;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Main App with Shared Layout */}
      <Route 
        path="/app" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="landing" replace />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="overview" element={<Overview />} />
        <Route path="locations" element={<Location />} />
        <Route path="location/:id" element={<LocationDetail />} />
        <Route path="generator" element={<LocationSelector />} />
        
        {/* Use relative paths for nested routes */}
        <Route path="dashboard/:genId" element={<GeneratorDashboard />} />
        <Route path="dashboard" element={<GeneratorDashboard />} />
        
        <Route path="alarms" element={<Alarms />} />
        <Route path="energytrack" element={<EnergyTrack />} />
        <Route path="rac" element={<RoomAccessControl />} />
        <Route path="acUnits" element={<ACUnits />} />
        <Route path="fms" element={<FaultManagementSystem />} />
        <Route path="upsSystem" element={<UPSSystem />} />
        <Route path="ups/:upsId" element={<UPSDetails />} />
        
        <Route path="userManagement" element={
          <RoleProtectedRoute minLevel={12}>
            <UserManagement />
          </RoleProtectedRoute>
        } />
        
        <Route path="transformers" element={<TransformersPage />} />
        <Route path="rectifier" element={<Rectifier />} />
        <Route path="rectifier/:rectifierId" element={<RectifierDetails />} />
        <Route path="temperature" element={<TemperatureMonitoring />} />
        <Route path="canteens" element={<CanteensPage />} />
      </Route>
      
      <Route path="/" element={<Navigate to="/app/landing" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;