// src/api/auth.js
import api from './client';

// The base URL for authentication
const AUTH_URL = 'https://onlyvibes-backend.onrender.com/auth';

/**
 * Gets the ID of the currently logged-in user.
 * @returns {string|null} The User ID, or null if not logged in.
 */
export const getCurrentUserId = () => {
    return localStorage.getItem('currentUserId');
};

/**
 * Checks if a user is currently logged in.
 * @returns {boolean} True if logged in.
 */
export const isAuthenticated = () => {
    return !!localStorage.getItem('currentUserId');
};

/**
 * Logs the user out by clearing storage.
 * @param {function} [redirectCallback] - Optional callback to redirect (e.g., navigate('/login'))
 */
export const logout = (redirectCallback) => {
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('token');
    
    // If a redirect function (like navigate) was passed, use it
    if (redirectCallback) {
        redirectCallback();
    } else {
        // Fallback: Hard reload to login page
        window.location.href = '/login';
    }
};

/**
 * Logs in a user.
 * @param {object} credentials - { email, password }
 * @returns {Promise<object>} Backend response
 */
export const login = async (credentials) => {
    console.log(`📡 API CALL: POST ${AUTH_URL}/login`);
    const response = await api.post(`${AUTH_URL}/login`, credentials);
    return response.data;
};

/**
 * Registers a new user.
 * @param {object} userData - { firstName, lastName, email, password }
 * @returns {Promise<object>} Backend response
 */
export const signup = async (userData) => {
    console.log(`📡 API CALL: POST ${AUTH_URL}/signup`);
    const response = await api.post(`${AUTH_URL}/signup`, userData);
    return response.data;
};

