import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  registerFCMTokenWithUserDetails,
  listenToForegroundMessages,
} from "./firebase";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup"; 
import ForgotPassword from "./pages/Auth/ForgotPassword"; 
import LandingPage from "./pages/LandingPage/LandingPage";
import LocationSelector from "./pages/LocationSelector/LocationSelector";
import GeneratorDashboard from "./pages/Dashboard/Dashboard";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Location from "./pages/LocationPage/Location";
import Overview from "./pages/Overview/Overview";
import LocationDetail from "./pages/LocationDetail/LocationDetail";

import Alarms from "./pages/Alarms/Alarms";

import { sendNativeNotification } from "./utils/notification";

// Route protection component
const ProtectedRoute = ({ children }) => {
  const userString = localStorage.getItem("user") || sessionStorage.getItem("user");
  const isAuthenticated = userString ? JSON.parse(userString).isAuthenticated : false;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alarmMessages, setAlarmMessages] = useState([]);

  // Helper: Determine role based on email
  const determineUserRole = (email) => {
    if (email === "admin@example.com") return "administrator";
    if (email === "tech@example.com") return "technician";
    return "operator";
  };

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userInfo = {
          username: user.displayName || user.email.split("@")[0],
          email: user.email,
          role: determineUserRole(user.email),
          isAuthenticated: true,
        };

        const rememberMe = localStorage.getItem("rememberMe") === "true";
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("user", JSON.stringify(userInfo));
        setIsAuthenticated(true);

        // Register FCM token after successful login
        await registerFCMTokenWithUserDetails();
      } else {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // FCM foreground notifications & alarm message sync
  useEffect(() => {
    const storedAlarms = JSON.parse(localStorage.getItem("alarms") || "[]");
    setAlarmMessages(storedAlarms);

    const unsubscribe = listenToForegroundMessages((payload) => {
      const { title, body } = payload.notification || {};
      if (title && body) {
        const newAlarm = { title, body, time: new Date().toISOString() };
        const updatedAlarms = [newAlarm, ...storedAlarms];
        localStorage.setItem("alarms", JSON.stringify(updatedAlarms));
        setAlarmMessages(updatedAlarms);
        sendNativeNotification({ title, body });
      }
    });

    return () => unsubscribe?.();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container" style={{ padding: "2rem", textAlign: "center" }}>
        <h3>Loading...</h3>
      </div>
    );
  }
  
  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/LandingPage" replace /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/LandingPage" replace /> : <Signup />} />
        <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/LandingPage" replace /> : <ForgotPassword />} />
        <Route path="/" element={<Navigate to="/LandingPage" replace />} />
        
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
        <Route path="/location/:id" element={<LocationDetail />} />
        <Route path="/location" element={<Location />} />
        
        <Route 
          path="/location/:id" 
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
    </Router>
  );
};

export default App;