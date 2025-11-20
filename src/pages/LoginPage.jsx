// src/pages/LoginPage.jsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext'; 
// FIX: Import registerUser from the correct file
import { registerUser } from '../api/accounts'; 
import { alert } from '../components/PopupDialog'; 
import '../styles/LoginPage.css';

export default function LoginPage({ onSuccessRedirect = '/' }) {
  const { user, login } = useAuth();
  
  // New state to toggle between views
  const [isSigningUp, setIsSigningUp] = useState(false); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // New field for registration
  const [role, setRole] = useState('user'); // New field for registration
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-redirect on successful login/registration
  useEffect(() => {
    if (user) window.location.href = onSuccessRedirect;
  }, [user, onSuccessRedirect]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password || !email) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setLoading(true);
    try {
      // 1. Prepare payload with required schema fields
      const userData = {
        username: username.trim(),
        email: email.trim(),
        // email: null,
        password: password,
        role: role, // Default to 'user'
        // FIX: eventId must be unique on the backend, let the backend handle 'id' field generation
      };

      console.log("👉 REGISTER PAYLOAD SENT:", userData);

      // 2. Call the registration API
      await registerUser(userData);
      
      // 3. Success notification and switch to Login screen
      await alert("Account created successfully! Please sign in.", "Success");
      setIsSigningUp(false);
      
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || 'Registration failed. Try a different username/email.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    // Logic remains the same, calling login from AuthContext
    // ... [existing handleSubmit logic for Sign In] ...
    setLoading(true);
    try {
      // Assumes your AuthContext login function handles API call with {username, password}
      await login({username: username.trim(), password}); 
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // --- Helper to render the common form fields ---
  const renderFormFields = () => (
    <>
      {isSigningUp && (
        <div className="input-group">
          <label className="input-label">Email</label>
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="login-input" 
            placeholder="email@example.com" 
            autoComplete="email" 
          />
        </div>
      )}
      
      <div className="input-group">
        <label className="input-label">Username</label>
        <input 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="login-input" 
          placeholder="username" 
          autoComplete="username" 
        />
      </div>
      
      <div className="input-group">
        <label className="input-label">Password</label>
        <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          type="password" 
          className="login-input" 
          placeholder="password" 
          autoComplete={isSigningUp ? "new-password" : "current-password"} 
        />
      </div>
    </>
  );

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">
          OnlyVibes — {isSigningUp ? 'Create Account' : 'Sign in'}
        </h1>
        
        {/* Use correct handler based on view mode */}
        <form onSubmit={isSigningUp ? handleRegister : handleSignIn} className="login-form">
          
          {renderFormFields()}
          
          {error && <div className="error-msg">{error}</div>}
          
          <div className="form-footer">
            <button 
              type="submit" 
              disabled={loading} 
              className="login-btn"
            >
              {loading 
                ? (isSigningUp ? 'Creating...' : 'Signing in...') 
                : (isSigningUp ? 'Sign Up' : 'Sign in')
              }
            </button>
            
            {/* Toggle Button */}
            <button 
              type="button" 
              onClick={() => {
                setIsSigningUp(!isSigningUp);
                setError('');
                setUsername('');
                setPassword('');
                setEmail('');
              }} 
              className="demo-link"
            >
              {isSigningUp ? 'Already have an account? Sign in' : 'New user? Create an account'}
            </button>
          </div>
        </form>
        
        <div className="disclaimer">
          This page uses real API calls for sign in/up.
        </div>
      </div>
    </div>
  );
}