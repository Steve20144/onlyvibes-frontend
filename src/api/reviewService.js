// src/api/reviewService.js
import apiClient from './apiClient';
import { ENDPOINTS } from '../utils/constants';
import { MOCK_REVIEW_ID, MOCK_EVENT_ID, MOCK_EVENT_DETAILS_WITHOUT_REVIEW, MOCK_EVENT_DETAILS_WITH_REVIEW } from './mockData';

// Endpoint 4: DELETE /events/{eventId}/reviews/{reviewId}
export const deleteReview = async (eventId, reviewId) => {
    // --- MOCK LOGIC ---
    if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_BASE_URL) {
        if (eventId.toString() === MOCK_EVENT_ID.toString() && reviewId === MOCK_REVIEW_ID) {
            console.log(`MOCK API: Review ${reviewId} deleted successfully for event ${eventId}.`);
            return MOCK_EVENT_DETAILS_WITHOUT_REVIEW; 
        }
    }
    
    // --- REAL API CALL ---
    await apiClient.delete(ENDPOINTS.DELETE_REVIEW(eventId, reviewId));
    const updatedDetails = await getEventDetailsWithReview(eventId);
    return updatedDetails;
};

// Endpoint 3: GET /events/{eventId} (Helper for fetching data)
export const getEventDetailsWithReview = async (eventId) => {
    // --- MOCK LOGIC ---
    if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_BASE_URL) {
        if (eventId.toString() === MOCK_EVENT_ID.toString()) {
            return MOCK_EVENT_DETAILS_WITH_REVIEW;
        }
    }
    
    // --- REAL API CALL ---
    const response = await apiClient.get(ENDPOINTS.GET_EVENT_DETAILS(eventId));
    return response.data;
}

// Helper for demonstration
export const updateReview = async (eventId, reviewId, reviewData) => {
    console.log(`MOCK API: Review ${reviewId} updated/created for event ${eventId}.`);
    return MOCK_EVENT_DETAILS_WITH_REVIEW; 
};