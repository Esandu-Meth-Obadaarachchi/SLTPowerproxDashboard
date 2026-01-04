import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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
import AlarmPage from "../Alarms/Alarms";

import UPSSystem from "../assets/ups/UPSsystem.jsx";
import FaultManagementSystem from "../FaultManagementSystem/FaultManagement";
import UserManagement from "../UserManagement/usermanagement";
import Rectifier from "../assets/rectifier/Rectifier";
import RoomAccessControl from "../RoomAccessControl/RoomAccessControl";
import TemperatureMonitoring from "../TemparatureMonitoring/temperatureMonitoring";
import TransformersPage from '../assets/TransformerMonitoring/TransformersPage';
import CanteensPage from "../assets/canteen/components/CanteensPage";

// Protected route component
const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const userString = localStorage.getItem("user") || sessionStorage.getItem("user");
  const isAuthenticated = userString ? JSON.parse(userString).isAuthenticated : false;
  
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return children;
};

const AppRouter = ({ isAuthenticated }) => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/app/landing" replace /> : <Login />} 
      />
      <Route 
        path="/signup" 
        element={isAuthenticated ? <Navigate to="/app/landing" replace /> : <Signup />} 
      />
      <Route 
        path="/forgot-password" 
        element={isAuthenticated ? <Navigate to="/app/landing" replace /> : <ForgotPassword />} 
      />
      
      {/* Protected App Routes - NO LAYOUT WRAPPER */}
      <Route path="/app">
        {/* Default redirect to landing page */}
        <Route index element={
          <ProtectedRoute>
            <Navigate to="/app/landing" replace />
          </ProtectedRoute>
        } />
        
        {/* Main App Routes */}
        <Route path="landing" element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        } />
        
        <Route path="overview" element={
          <ProtectedRoute>
            <Overview />
          </ProtectedRoute>
        } />
        
        <Route path="locations" element={
          <ProtectedRoute>
            <Location />
          </ProtectedRoute>
        } />
        
        <Route path="location" element={
          <ProtectedRoute>
            <Location />
          </ProtectedRoute>
        } />
        
        <Route path="location/:id" element={
          <ProtectedRoute>
            <LocationDetail />
          </ProtectedRoute>
        } />
        
        <Route path="generator" element={
          <ProtectedRoute>
            <LocationSelector />
          </ProtectedRoute>
        } />
        
        <Route path="alarms" element={
          <ProtectedRoute>
            <AlarmPage />
          </ProtectedRoute>
        } />
        
        <Route path="dashboard/:genId" element={
          <ProtectedRoute>
            <GeneratorDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="dashboard" element={
          <ProtectedRoute>
            <GeneratorDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="energytrack" element={
          <ProtectedRoute>
            <EnergyTrack />
          </ProtectedRoute>
        } />
        
        <Route path="rac" element={
          <ProtectedRoute>
            <RoomAccessControl />
          </ProtectedRoute>
        } />
        
        <Route path="acUnits" element={
          <ProtectedRoute>
            <ACUnits />
          </ProtectedRoute>
        } />
        
        <Route path="fms" element={
          <ProtectedRoute>
            <FaultManagementSystem />
          </ProtectedRoute>
        } />
        
        <Route path="upsSystem" element={
          <ProtectedRoute>
            <UPSSystem />
          </ProtectedRoute>
        } />
        
        <Route path="ups/:upsId" element={
          <ProtectedRoute>
            <UPSDetails />
          </ProtectedRoute>
        } />
        
        <Route path="userManagement" element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        } />
        
        <Route path="transformers" element={
          <ProtectedRoute>
            <TransformersPage />
          </ProtectedRoute>
        } />
        
        <Route path="rectifier" element={
          <ProtectedRoute>
            <Rectifier />
          </ProtectedRoute>
        } />
        
        <Route path="rectifier/:rectifierId" element={
          <ProtectedRoute>
            <RectifierDetails />
          </ProtectedRoute>
        } />
        
        <Route path="temperature" element={
          <ProtectedRoute>
            <TemperatureMonitoring />
          </ProtectedRoute>
        } />
        
        <Route path="canteens" element={
          <ProtectedRoute>
            <CanteensPage />
          </ProtectedRoute>
        } />
      </Route>
      
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/app/landing" replace />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;