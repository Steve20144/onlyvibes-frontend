// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import apiClient from '../api/apiClient';
import { MOCK_ACCOUNT } from '../api/mockData';
import { ENDPOINTS, API_BASE_URL } from '../utils/constants';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(MOCK_ACCOUNT); 
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = async (email, password) => {
    try {
        if (!API_BASE_URL.includes('localhost') && email && password) {
            const token = btoa(`${email}:${password}`); 
            localStorage.setItem('authToken', token);
        }

        // Endpoint 1: GET /accounts/{userId} (Simulated after successful login/registration)
        setUser(MOCK_ACCOUNT); 
        setIsAuthenticated(true);
        return MOCK_ACCOUNT;
    } catch (error) {
        console.error("Login failed:", error);
        setIsAuthenticated(false);
        throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };
  
  const getUserId = () => user ? user.id : null;
  const getUserRole = () => user ? user.role : 'guest';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, getUserId, getUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};