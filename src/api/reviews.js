// src/api/reviews.js (Frontend API Service Wrapper)

import api from './client';
import { mapReview } from './mappers';

// Helper to get the authenticated user's ID
const getCurrentUserId = () => {
    const userId = localStorage.getItem('currentUserId');
    if (!userId) {
        throw new Error("Authentication Error: User must be logged in to perform review actions.");
    }
    return userId;
};

// =========================================================
// 1. SUBMIT/CREATE (POST /events/:eventId/reviews)
// =========================================================

/**
 * Creates/Submits a new review for an event.
 * @param {string} eventId - The ID of the event being reviewed.
 * @param {{rating:number, comment:string}} reviewData - The review content.
 * @returns {Promise<object>} The mapped review object.
 */
export const submitReview = async (eventId, reviewData) => {
    const userId = '67a12345bc910f0012e99abc';//getCurrentUserId();
    const method = 'POST';
    const endpoint = `/events/${eventId}/reviews`;
    
    console.log(`📡 API CALL: ${method} ${endpoint}`);
    
    // Payload includes review content and the authenticated userId
    const payload = { ...reviewData, userId };

    const response = await api(endpoint, { 
        method: method, 
        data: payload
    });

    // Assuming the backend returns the new review object in response.data
    return mapReview(response.data || response); 
};


// =========================================================
// 2. UPDATE (PUT /reviews/:reviewId)
// =========================================================

/**
 * Updates an existing review.
 * @param {string} reviewId - The ID of the review to update.
 * @param {{rating?:number, comment?:string}} updates - The fields to update.
 * @returns {Promise<object>} The mapped updated review object.
 */
export const updateReview = async (reviewId, updates) => {
    const userId = getCurrentUserId();
    const method = 'PUT';
    const endpoint = `/reviews/${reviewId}`;
    
    console.log(`📡 API CALL: ${method} ${endpoint}`);
    
    // Payload includes updates and the authenticated userId for server-side verification
    const payload = { ...updates, userId };

    const response = await api(endpoint, { 
        method: method, 
        data: payload 
    });

    // Assuming the backend returns the updated review object in response.data
    return mapReview(response.data || response); 
};


// =========================================================
// 3. DELETE (DELETE /reviews/:reviewId)
// =========================================================

/**
 * Deletes a review.
 * @param {string} reviewId - The ID of the review to delete.
 * @returns {Promise<void>}
 */
export const deleteReview = async (reviewId) => {
    const userId = getCurrentUserId();
    const method = 'DELETE';
    const endpoint = `/reviews/${reviewId}`;
    
    console.log(`📡 API CALL: ${method} ${endpoint}`);
    
    // DELETE requests often require the ID in the data for verification, 
    // or just rely on the auth token and URL ID. We send the userId for safety.
    const payload = { userId }; 

    // We use DELETE method and expect a 204 No Content response
    await api(endpoint, { 
        method: method,
        data: payload 
    });
};

// =========================================================
// 4. FETCH (Read operations) - Retrieves all public reviews for an event
// =========================================================

/**
 * Fetches all public reviews for a specific event.
 * Maps to backend endpoint: GET /reviews/event/:eventId (Assumed route)
 * * @param {string} eventId - The ID of the event to fetch reviews for.
 * @returns {Promise<object[]>} Array of mapped review objects.
 */
export const fetchEventReviews = async (eventId) => {
    const method = 'GET';
    const endpoint = `/events/20/reviews`; // Assuming a standard endpoint structure
    // const endpoint = `/events/${eventId}/reviews`; // Assuming a standard endpoint structure

    console.log(`📡 API CALL: ${method} ${endpoint}`);

    try {
        // Execute the GET request
        const response = await api(endpoint);
        
        // Assuming backend returns { success: true, data: [reviews] }
        const serverPayload = response.data;
        
        if (serverPayload && Array.isArray(serverPayload.data)) {
            console.log(`✅ API SUCCESS [${method} ${endpoint}]: Found ${serverPayload.data.length} reviews.`);
            // Map the array and return it
            return serverPayload.data.map(mapReview);
        }

        // If the backend returns a successful response but no data array, return empty
        return [];

    } catch (error) {
        console.error(`❌ API FAILURE [${method} ${endpoint}]:`, error);
        // Throwing the error ensures the calling component (EventDetailsPage) can show the fallback
        throw error;
    }
};