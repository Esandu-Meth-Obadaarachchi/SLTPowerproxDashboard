import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, OAuthProvider  } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "./../../firebase";
import "./Login.css";
import logoimage from "./../../assets/logo.png";
const Signup = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile to add username
      await updateProfile(userCredential.user, {
        displayName: username
      });

      // Store user info in sessionStorage (similar to login component)
      sessionStorage.setItem("user", JSON.stringify({
        username: username,
        email: userCredential.user.email,
        role: "user", // Default role for new users
        isAuthenticated: true
      }));
      
      // Redirect to dashboard
      navigate("/overview");
    } catch (error) {
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError("Email is already in use");
          break;
        case 'auth/invalid-email':
          setError("Invalid email address");
          break;
        case 'auth/weak-password':
          setError("Password is too weak");
          break;
        default:
          setError("Failed to create account: " + error.message);
      }
      setIsLoading(false);
    }
  };

  const handleMicrosoftSignup = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // Create Microsoft authentication provider
      const provider = new OAuthProvider('microsoft.com');
      
      // Add scopes for Microsoft authentication
      provider.addScope('user.read');
      provider.addScope('openid');
      provider.addScope('profile');
      provider.addScope('email');
      
      // Set custom parameters for Microsoft signup
      provider.setCustomParameters({
        prompt: 'consent',
        tenant: 'common' // Use 'common' for any Microsoft account or your tenant ID for specific organization
      });
      
      // Sign in with popup (same method is used for signup)
      const result = await signInWithPopup(auth, provider);
      
      // Get OAuth access token and ID token
      //const credential = OAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken;
      // const idToken = credential.idToken;
      
      // Get user info
      const user = result.user;
      
      // Check if this is a new user (just created)
      const isNewUser = result._tokenResponse.isNewUser;
      
      // Store user info in sessionStorage
      sessionStorage.setItem("user", JSON.stringify({
        username: user.displayName,
        email: user.email,
        role: "user", // Default role for new users
        isAuthenticated: true,
        isNewUser: isNewUser
      }));
      
      // Redirect to dashboard
      navigate("/overview");
    } catch (error) {
      console.error("Microsoft auth error:", error);
      
      // Handle specific errors
      if (error.code === 'auth/account-exists-with-different-credential') {
        setError("An account already exists with the same email address but different sign-in credentials.");
      } else if (error.code === 'auth/popup-closed-by-user') {
        setError("The sign-up popup was closed before completing the process.");
      } else if (error.code === 'auth/cancelled-popup-request') {
        setError("The sign-up operation was cancelled.");
      } else if (error.code === 'auth/popup-blocked') {
        setError("The sign-up popup was blocked by the browser.");
      } else {
        setError("Microsoft sign-up failed: " + error.message);
      }
      
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // The signed-in user info
      const user = result.user;
      
      // Store user info
      sessionStorage.setItem("user", JSON.stringify({
        username: user.displayName,
        email: user.email,
        role: "user", // Default role for Google-authenticated users
        isAuthenticated: true
      }));
      
      // Redirect to dashboard
      navigate("/overview");
    } catch (error) {
      setError("Google sign-up failed: " + error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-modal">
      <div className="logo-container">
        <img 
          src={logoimage} 
          alt="PowerProx Logo" 
          className="logo-image"
        />
        <h3 className="brand-name">PowerProx Dashboard</h3>
      </div>
        
        <h1 className="login-title">SIGN UP</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSignup} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-container">
              <span className="input-icon">
                <svg viewBox="0 0 24 24" className="icon-user">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
              </span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Create a username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <span className="input-icon">
                <svg viewBox="0 0 24 24" className="icon-user">
                  <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                </svg>
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <span className="input-icon">
                <svg viewBox="0 0 24 24" className="icon-lock">
                  <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" className="icon-eye">
                    <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="icon-eye-off">
                    <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-container">
              <span className="input-icon">
                <svg viewBox="0 0 24 24" className="icon-lock">
                  <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
                </svg>
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg viewBox="0 0 24 24" className="icon-eye">
                    <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="icon-eye-off">
                    <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="social-login">
          <button 
            type="button" 
            className="social-button google"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <svg viewBox="0 0 24 24" className="icon-google">
              <path d="M21.35,11.1H12.18V13.83H18.69C18.36,15.64 16.96,17.45 14.37,17.45C11.4,17.45 9.1,15.15 9.1,12.17C9.1,9.2 11.4,6.9 14.38,6.9C16.06,6.9 17.31,7.66 18.04,8.39L20.06,6.37C18.54,4.85 16.66,4 14.37,4C10.19,4 6.8,7.39 6.8,12.18C6.8,16.97 10.19,20.36 14.38,20.36C18.5,20.36 21.6,17.5 21.6,12.69C21.6,12.16 21.5,11.56 21.35,11.1Z" />
            </svg>
            Sign up with Google
          </button>

          <button 
              onClick={handleMicrosoftSignup} 
              className="social-button microsoft"
              disabled={isLoading}
            >
              Sign up with Microsoft
            </button>
        </div>

        <div className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;