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


//import FMS from "../FaultManagementSystem/FaultManagement";
import UPSSystem from "../assets/ups/UPSsystem.jsx";
import FaultManagementSystem from "../FaultManagementSystem/FaultManagement";
import UserManagement from "../UserManagement/usermanagement";
import Rectifier from "../assets/rectifier/Rectifier";
import RoomAccessControl from "../RoomAccessControl/RoomAccessControl";
import TemperatureMonitoring from "../TemparatureMonitoring/temperatureMonitoring";

// Layout component
import Layout from "../shared/components/Layout/Layout";

//import FaultManagementSystem from "../FaultManagementSystem/FaultManagement";
import TransformersPage from '../assets/TransformerMonitoring/TransformersPage';

//-------------
// const CanteensPage = () => <div>Canteens Page (Placeholder)</div>;
import CanteensPage from "../assets/canteen/components/CanteensPage";
//-------------

// Placeholder for future components

const Alarms = () => <div>Alarms Page (Placeholder)</div>;

// const TransformersPage = () => <div>Transformers Page (Placeholder)</div>;



// Protected route component with cleaner implementation
const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  // Check if user is authenticated
  const userString = localStorage.getItem("user") || sessionStorage.getItem("user");
  const isAuthenticated = userString ? JSON.parse(userString).isAuthenticated : false;
  
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return children;
};

const AppRouter = () => {
  // Check authentication status
  const userString = localStorage.getItem("user") || sessionStorage.getItem("user");
  const isAuthenticated = userString ? JSON.parse(userString).isAuthenticated : false;

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
      
      {/* Protected App Routes - All routes from original router.js */}
      <Route 
        path="/app" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Default redirect to landing page */}
        <Route index element={<Navigate to="/app/landing" replace />} />
        
        {/* Main App Routes - Exact same routes as original router.js */}
        <Route path="landing" element={<LandingPage />} />
        <Route path="overview" element={<Overview />} />
        <Route path="locations" element={<Location />} />
        <Route path="location" element={<Location />} />
        <Route path="location/:id" element={<LocationDetail />} />
        <Route path="generator" element={<LocationSelector />} />
        {/* Generator dashboard route with genId parameter */}

        <Route path="dashboard/:genId" element={<GeneratorDashboard />} />
        
        {/* Optional: Fallback route for dashboard without genId */}
        <Route path="/app/dashboard" element={<GeneratorDashboard />} />
        
        <Route path="alarms" element={<Alarms />} />
        <Route path="energytrack" element={<EnergyTrack />} />
        <Route path="rac" element={<RoomAccessControl/>}/>

        <Route path="acUnits" element={<ACUnits />} />
        <Route path="fms" element={<FaultManagementSystem />} />
        <Route path="upsSystem" element={<UPSSystem />} />
        <Route path="ups/:upsId" element={<UPSDetails />} />
        <Route path="userManagement" element={<UserManagement />} />
        <Route path="transformers" element={<TransformersPage />} />
        <Route path="rectifier" element={<Rectifier />} />
        <Route path="rectifier/:rectifierId" element={<RectifierDetails />} />

        <Route path="temperature" element={<TemperatureMonitoring />} />

        {/* Canteens dashboard */}
        <Route path="canteens" element={<CanteensPage />} />


      </Route>
      
      {/* Root redirect - matches original behavior */}
      <Route path="/" element={<Navigate to="/app/landing" replace />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;