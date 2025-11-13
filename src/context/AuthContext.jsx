// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { buildBasicAuthHeader } from "../utils/auth";
import { loginWithUserId } from "../api/accounts";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState({ userId: "", password: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("onlyvibes_user");
    const storedCreds = window.localStorage.getItem("onlyvibes_creds");
    const authHeader = window.localStorage.getItem("onlyvibes_auth_header");

    if (storedUser && storedCreds && authHeader) {
      setUser(JSON.parse(storedUser));
      setCredentials(JSON.parse(storedCreds));
    }
    setLoading(false);
  }, []);

  const login = async (userId, password) => {
    const authHeader = buildBasicAuthHeader(userId, password);
    if (!authHeader) {
      throw new Error("Missing credentials");
    }
    window.localStorage.setItem("onlyvibes_auth_header", authHeader);
    const account = await loginWithUserId(userId);
    setUser(account);
    const creds = { userId, password };
    setCredentials(creds);
    window.localStorage.setItem("onlyvibes_user", JSON.stringify(account));
    window.localStorage.setItem("onlyvibes_creds", JSON.stringify(creds));
  };

  const logout = () => {
    setUser(null);
    setCredentials({ userId: "", password: "" });
    window.localStorage.removeItem("onlyvibes_user");
    window.localStorage.removeItem("onlyvibes_creds");
    window.localStorage.removeItem("onlyvibes_auth_header");
  };

  const value = {
    user,
    credentials,
    isAuthenticated: !!user,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
