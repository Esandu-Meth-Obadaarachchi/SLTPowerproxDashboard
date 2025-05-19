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
import GeneratorDashboard from "../assets/generator/components/Dashboard";

// Placeholder for future components
const Alarms = () => <div>Alarms Page (Placeholder)</div>;

// Protected route component to handle authentication
const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated
  const userString = localStorage.getItem("user") || sessionStorage.getItem("user");
  const isAuthenticated = userString ? JSON.parse(userString).isAuthenticated : false;
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

/**
 * Application router configuration
 * @param {boolean} isAuthenticated - Whether the user is currently authenticated
 * @returns {JSX.Element} The configured routes
 */
const AppRouter = ({ isAuthenticated }) => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/LandingPage" replace /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/LandingPage" replace /> : <Signup />} />
      <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/LandingPage" replace /> : <ForgotPassword />} />
      <Route path="/" element={<Navigate to="/LandingPage" replace />} />
      
      {/* Protected Routes */}
      <Route 
        path="/LandingPage" 
        element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/overview" 
        element={
          <ProtectedRoute>
            <Overview />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/locations" 
        element={
          <ProtectedRoute>
            <Location />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/generator" 
        element={
          <ProtectedRoute>
            <LocationSelector />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/dashboard/:assetId" 
        element={
          <ProtectedRoute>
            <GeneratorDashboard />
          </ProtectedRoute>
        } 
      /> 

      <Route 
        path="/location/:id" 
        element={
          <ProtectedRoute>
            <LocationDetail />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/location" 
        element={
          <ProtectedRoute>
            <Location />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alarms" 
        element={
          <ProtectedRoute>
            <Alarms />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;