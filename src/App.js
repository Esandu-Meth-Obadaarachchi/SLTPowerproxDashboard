// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase"; 
// import AppRouter from "./features/app/router";
// import Navbar from "./../src/features/shared/components/navbar/Navbar";
// import "./App.css";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
  
//   useEffect(() => {
//     // Use Firebase's onAuthStateChanged for better auth state management
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in
//         const userInfo = {
//           username: user.displayName || user.email.split("@")[0],
//           email: user.email,
//           role: determineUserRole(user.email), // Implement this function based on your needs
//           isAuthenticated: true
//         };
        
//         // Check if "remember me" was selected (stored in localStorage)
//         const rememberMe = localStorage.getItem("rememberMe") === "true";
//         const storage = rememberMe ? localStorage : sessionStorage;
//         storage.setItem("user", JSON.stringify(userInfo));
        
//         setIsAuthenticated(true);
//       } else {
//         // User is signed out
//         setIsAuthenticated(false);
        
//         // Clear authentication data
//         localStorage.removeItem("user");
//         sessionStorage.removeItem("user");
//       }
//       setIsLoading(false);
//     });
    
//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);
  
//   // Helper function to determine user role - replace with your own logic
//   const determineUserRole = (email) => {
//     // For demonstration purposes only - in production, get roles from your database
//     if (email === "admin@example.com") return "administrator";
//     if (email === "tech@example.com") return "technician";
//     return "operator"; // Default role
//   };
  
//   // Show loading indicator while checking auth status
//   if (isLoading) {
//     return <div className="loading-container">Loading...</div>;
//   }
  
//   return (
//     <Router>
//       {isAuthenticated && <Navbar />}
//       <AppRouter isAuthenticated={isAuthenticated} />
//     </Router>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; 
import AppRouter from "./features/app/router";
import Navbar from "./features/shared/components/navbar/Navbar";
import { ThemeProvider } from "./features/shared/components/theme/ThemeContext";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo = {
          username: user.displayName || user.email.split("@")[0],
          email: user.email,
          role: determineUserRole(user.email),
          isAuthenticated: true
        };

        const rememberMe = localStorage.getItem("rememberMe") === "true";
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("user", JSON.stringify(userInfo));

        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const determineUserRole = (email) => {
    if (email === "admin@example.com") return "administrator";
    if (email === "tech@example.com") return "technician";
    return "operator";
  };

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <ThemeProvider>
      <div className="app-theme-container">
        <Router>
          {isAuthenticated && <Navbar />}
          <AppRouter isAuthenticated={isAuthenticated} />
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
