import React, { useState } from "react";
import "./../styles/Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Basic auth header (frontend requirement)
    const encoded = btoa(`${email}:${password}`);

    onLogin(encoded); // parent handles API call and navigation
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-logo-circle">
          <span className="upload-icon">★</span>
        </div>
        <h1 className="login-title">OnlyVibes</h1>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <label className="input-label">Email</label>
        <input
          type="email"
          className="input-field"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="input-label">Password</label>
        <input
          type="password"
          className="input-field"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error-msg">{error}</p>}

        <button className="login-btn" type="submit">Sign In</button>
      </form>

      <p className="signup-text">
        Don't have an account?{" "}
        <span className="signup-link">Create one</span>
      </p>
    </div>
  );
}
