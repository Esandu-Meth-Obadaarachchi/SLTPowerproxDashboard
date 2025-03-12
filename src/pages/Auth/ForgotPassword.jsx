import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import "./Login.css";
import logoimage from "./../../assets/logo.png";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(`Password reset email sent to ${email}. Please check your inbox.`);
      setEmail("");
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError("Invalid email address format");
          break;
        case 'auth/user-not-found':
          setError("No account found with this email");
          break;
        default:
          setError("Failed to send reset email: " + error.message);
      }
    } finally {
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
        
        <h1 className="login-title">RESET PASSWORD</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="error-message" style={{ 
            backgroundColor: "rgba(16, 185, 129, 0.2)", 
            color: "var(--success-color)",
            borderLeft: "3px solid var(--success-color)"
          }}>
            {success}
          </div>
        )}
        
        <form onSubmit={handleResetPassword} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <span className="input-icon">
                <svg viewBox="0 0 24 24" className="icon-user">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
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

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>

        <div className="signup-link">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;