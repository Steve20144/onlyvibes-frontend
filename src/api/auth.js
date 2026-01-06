import api from './client';
import { getAccount } from './accounts';

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
 * Checks if a user is currently logged in locally.
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
    console.log("🧹 Clearing auth session...");
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('token');
    
    // If a redirect function (like navigate) was passed, use it
    if (redirectCallback) {
        redirectCallback();
    } else {
        // Fallback: Hard reload to login page ensures all memory state is wiped
        window.location.href = '/login';
    }
};

/**
 * Checks if the stored user actually exists on the server. 
 * If the user is missing (404) or token is invalid (401), it auto-logs out.
 */
export const validateSession = async () => {
    const userId = getCurrentUserId();
    if (!userId) return false;

    try {
        await getAccount(userId);
        return true; 
    } catch (error) {
        // UPDATED: Added check for status 500
        if (error.response && (
            error.response.status === 401 || 
            error.response.status === 404 || 
            error.response.status === 500
        )) {
            console.warn("⚠️ Invalid Session (401/404/500): Auto-logging out.");
            logout(); 
            return false;
        }
        return true; 
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