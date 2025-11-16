// src/pages/LoginPage.jsx
import React, { useEffect, useState } from 'react';
// Corrected import path based on your index.js
import { useAuth } from '../auth/AuthContext'; 
import '../styles/LoginPage.css'; // <-- Import the CSS

export default function LoginPage({ onSuccessRedirect = '/' }) {
  const { user, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) window.location.href = onSuccessRedirect;
  }, [user, onSuccessRedirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    setLoading(true);
    try {
      await login(username.trim(), password);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">OnlyVibes — Sign in</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          
          {/* Changed to use "input-group" and "login-input" */}
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
          
          {/* Changed to use "input-group" and "login-input" */}
          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              className="login-input" 
              placeholder="password" 
              autoComplete="current-password" 
            />
          </div>
          
          {/* Changed to use "error-msg" */}
          {error && <div className="error-msg">{error}</div>}
          
          {/* Changed to use "form-footer", "login-btn", and "demo-link" */}
          <div className="form-footer">
            <button 
              type="submit" 
              disabled={loading} 
              className="login-btn"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <button 
              type="button" 
              onClick={() => { setUsername('alice'); setPassword('password123'); }} 
              className="demo-link"
            >
              Demo user
            </button>
          </div>
        </form>
        
        {/* Changed to use "disclaimer" */}
        <div className="disclaimer">
          This login uses static data for now.
        </div>
      </div>
    </div>
  );
}