// src/api/accounts.js
import api from './client'; 
import { mapUser, mapEvent } from './mappers';

// =========================================================
// 1. PROFILE & DETAILS (GET /api/accounts/:userId)
// =========================================================

/**
 * Fetches user or venue profile details.
 * Used by: ProfilePage
 */
export const fetchUserProfile = async (userId) => {
  try {
    const data = await api(`/accounts/${userId}`); // Uses 'api'
    // ...
    return mapUser(data.data || data); 
  } catch (error) {
    console.error(`Error fetching profile for user ${userId}:`, error);
    throw error;
  }
};

// =========================================================
// 2. ACCOUNT ACTIONS (POST /api/accounts/:userId/...)
// =========================================================

/**
 * Submits a verification request for an account (usually for venues).
 * Endpoint: POST /api/accounts/:userId/verification-request
 */
export const requestVerification = async (userId, documentData) => {
  // documentData might include files or text, depending on backend implementation
  return api(`/accounts/${userId}/verification-request`, { 
    method: 'POST', 
    body: documentData 
  });
};

/**
 * Follows another user or venue account.
 * Endpoint: POST /api/accounts/:userId/follow
 */
export const followUser = async (targetUserId) => {
  // Assuming the current user ID is handled by the Authorization header/cookie
  return api(`/accounts/${targetUserId}/follow`, { method: 'POST' });
};

// =========================================================
// 3. RECOMMENDATIONS (GET /api/accounts/:userId/recommendations)
// =========================================================

/**
 * Fetches personalized event recommendations.
 * Endpoint: GET /api/accounts/:userId/recommendations
 */
export const fetchRecommendations = async (userId) => {
  try {
    const response = await api(`/accounts/${userId}/recommendations`);
    // Assuming the response is { data: [events] }
    const eventData = response.data || response;
    
    // Map each event item to the clean frontend format
    return (eventData || []).map(mapEvent); 
  } catch (error) {
    console.error(`Error fetching recommendations for user ${userId}:`, error);
    throw error;
  }
};

// =========================================================
// 4. MOCK: Update Account Details (PUT /api/accounts/:userId)
// =========================================================

/**
 * Inferred endpoint for updating account details.
 */
export const updateAccountDetails = async (userId, payload) => {
  // Note: This endpoint was not explicitly listed but is necessary for an 'Edit Profile' screen.
  return api(`/accounts/${userId}`, { method: 'PUT', body: payload });
};


// POST /api/accounts (Sign Up)
export const registerUser = async (userData) => {
  const data = await api('/accounts', { method: 'POST', body: userData });
  return mapUser(data);
};

// --- CORE LOGIN FUNCTION ---
export const loginUser = async (credentials) => {
  // Assuming POST /auth/login is the endpoint. Adjust if your backend uses POST /accounts/login
  const response = await api('/auth/login', { 
    method: 'POST', 
    body: credentials 
  }); 
  
  // CRITICAL: We assume the backend returns { user: {...}, token: "..." }
  const user = mapUser(response.user || response); 
  const token = response.token; 

  // Store token and user ID locally for future API calls (e.g., creating events)
  if (token && user.userId) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUserId', user.userId);
  } else {
    throw new Error("Authentication failed: Missing token or user ID in response.");
  }

  return user;
};
