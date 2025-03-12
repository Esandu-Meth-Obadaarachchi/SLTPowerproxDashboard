import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Import auth from your firebase.js file
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup"; // Import the new Signup component
import ForgotPassword from "./pages/Auth/ForgotPassword"; // Optional - if you implement this
import EnergyAnalyticsOverview from "./pages/LandingPage/LandingPage";
import LocationSelector from "./pages/LocationSelector/LocationSelector";
import GeneratorDashboard from "./pages/Dashboard/Dashboard";
import "./App.css";
import Navbar from "./components/navbar/Navbar";

// Placeholder for Alarms component
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

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Use Firebase's onAuthStateChanged for better auth state management
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const userInfo = {
          username: user.displayName || user.email.split("@")[0],
          email: user.email,
          role: determineUserRole(user.email), // Implement this function based on your needs
          isAuthenticated: true
        };
        
        // Check if "remember me" was selected (stored in localStorage)
        const rememberMe = localStorage.getItem("rememberMe") === "true";
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("user", JSON.stringify(userInfo));
        
        setIsAuthenticated(true);
      } else {
        // User is signed out
        setIsAuthenticated(false);
        
        // Clear authentication data
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
      }
      setIsLoading(false);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  // Helper function to determine user role - replace with your own logic
  const determineUserRole = (email) => {
    // For demonstration purposes only - in production, get roles from your database
    if (email === "admin@example.com") return "administrator";
    if (email === "tech@example.com") return "technician";
    return "operator"; // Default role
  };
  
  // Show loading indicator while checking auth status
  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }
  
  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/overview" replace /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/overview" replace /> : <Signup />} />
        <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/overview" replace /> : <ForgotPassword />} />
        <Route path="/" element={<Navigate to="/overview" replace />} />
        
        <Route 
          path="/overview" 
          element={
            <ProtectedRoute>
              <EnergyAnalyticsOverview />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/locations" 
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
              <LocationSelector />
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
    </Router>
  );
};

export default App;