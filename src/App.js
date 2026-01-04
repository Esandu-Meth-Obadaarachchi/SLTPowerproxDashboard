import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  registerFCMTokenWithUserDetails,
  listenToForegroundMessages,
} from "./firebase";
import AppRouter from "./features/app/router";
import Navbar from "./features/shared/components/navbar/Navbar";
import Sidebar from "./features/shared/components/SideBar/SideBar";
import { ThemeProvider } from "./features/shared/components/theme/ThemeContext";
import ScrollToTop from "./features/shared/components/ScrollToTop/ScrollToTop";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alarmMessages, setAlarmMessages] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper: Determine role based on email
  const determineUserRole = (email) => {
    if (email === "admin@example.com") return "administrator";
    if (email === "tech@example.com") return "technician";
    return "operator";
  };

  // Detect screen size for responsive behavior
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auth state observer with FCM token registration
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
        try {
          await registerFCMTokenWithUserDetails();
          console.log("✅ FCM token registration initiated");
        } catch (error) {
          console.error("❌ FCM token registration failed:", error);
        }
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // FCM foreground notifications listener
  useEffect(() => {
    const storedAlarms = JSON.parse(localStorage.getItem("alarms") || "[]");
    setAlarmMessages(storedAlarms);

    const unsubscribe = listenToForegroundMessages((payload) => {
      console.log("📬 Foreground notification received:", payload);
      
      const { title, body } = payload.notification || {};
      
      if (title && body) {
        const newAlarm = { 
          id: Date.now(),
          title, 
          body, 
          timestamp: new Date().toISOString(),
          viewed: false
        };
        
        const updatedAlarms = [newAlarm, ...storedAlarms];
        localStorage.setItem("alarms", JSON.stringify(updatedAlarms));
        setAlarmMessages(updatedAlarms);

        if (Notification.permission === "granted") {
          new Notification(title, {
            body,
            icon: "/favicon.ico",
            badge: "/badge.png",
          });
        }
      }
    });

    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        console.log(`📢 Notification permission: ${permission}`);
      });
    }
  }, []);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleMobileLinkClick = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true }}>
        <ScrollToTop />
        <div className="app-shell">
          {/* Fixed Navbar */}
          {isAuthenticated && (
            <Navbar 
              alarmCount={alarmMessages.filter(a => !a.viewed).length}
              onMenuClick={handleSidebarToggle}
              isMobile={isMobile}
            />
          )}
          
          {/* Mobile Overlay */}
          {isAuthenticated && isMobile && mobileMenuOpen && (
            <div 
              className="mobile-overlay" 
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
          
          {/* Fixed Sidebar */}
          {isAuthenticated && (
            <Sidebar
              isCollapsed={sidebarCollapsed}
              isMobile={isMobile}
              isTablet={isTablet}
              mobileMenuOpen={mobileMenuOpen}
              onToggle={handleSidebarToggle}
              onLinkClick={handleMobileLinkClick}
            />
          )}
          
          {/* Scrollable Content Area */}
          <main className={`main-content ${isAuthenticated ? 'authenticated' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <AppRouter isAuthenticated={isAuthenticated} />
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;