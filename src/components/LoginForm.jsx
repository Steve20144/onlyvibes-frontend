// src/components/LoginForm.jsx
import React, { useState } from "react";

const LoginForm = ({ onSubmit, submitting }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId.trim() || !password.trim()) {
      setLocalError("User ID and password are required.");
      return;
    }
    setLocalError("");
    onSubmit?.(userId.trim(), password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="form-label">User ID</div>
        <input
          className="form-input"
          placeholder="Enter your user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div className="form-group">
        <div className="form-label">Password</div>
        <input
          className="form-input"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {localError && <div className="form-error">{localError}</div>}
      <button
        type="submit"
        className="button button-primary"
        style={{ width: "100%", marginTop: 8 }}
        disabled={submitting}
      >
        {submitting ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
