// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import ErrorMessage from "../components/ErrorMessage";

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleLogin = async (userId, password) => {
    try {
      setSubmitting(true);
      setError("");
      await login(userId, password);
    } catch (e) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <div className="phone-content">
          <div
            style={{
              padding: 24,
              paddingTop: 40,
              textAlign: "center"
            }}
          >
            <h1 style={{ margin: 0, fontSize: 26 }}>OnlyVibes</h1>
            <p
              style={{
                margin: "8px 0 24px",
                fontSize: 13,
                color: "var(--text-muted)"
              }}
            >
              Discover the hottest parties near you.
            </p>

            <ErrorMessage message={error} />
            <LoginForm onSubmit={handleLogin} submitting={submitting} />

            <p
              style={{
                marginTop: 16,
                fontSize: 12,
                color: "var(--text-muted)"
              }}
            >
              This demo uses HTTP Basic Authentication. Your credentials are
              stored locally only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
