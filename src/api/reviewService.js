// src/api/reviewService.js
import apiClient from './apiClient';
import { ENDPOINTS } from '../utils/constants';
import { MOCK_REVIEW_ID, MOCK_EVENT_ID, MOCK_EVENT_DETAILS_WITH_REVIEW, MOCK_EVENT_DETAILS_WITHOUT_REVIEW } from './mockData';


export const getEventDetailsWithReview = async (eventId) => {
    // --- MOCK LOGIC ---
    if (eventId.toString() === MOCK_EVENT_ID.toString()) {
        
        if (!MOCK_EVENT_DETAILS_WITH_REVIEW || MOCK_EVENT_DETAILS_WITH_REVIEW.eventId.toString() !== eventId.toString()) {
            throw new Error(`MOCK Event ID ${eventId} mismatch or object is null.`);
        }
        
        
        return MOCK_EVENT_DETAILS_WITH_REVIEW;
    }
    
    // Real API call (ή σφάλμα για μη mocked IDs)
    throw new Error("Event not found or API call not implemented for this ID.");
};


// Endpoint 4: DELETE /events/{eventId}/reviews/{reviewId}
export const deleteReview = async (eventId, reviewId) => {
    // --- MOCK LOGIC ---
    if (process.env.NODE_ENV === 'development' && eventId.toString() === MOCK_EVENT_ID.toString() && reviewId === MOCK_REVIEW_ID) {
        console.log(`MOCK API: Review ${reviewId} deleted successfully for event ${eventId}.`);
        return MOCK_EVENT_DETAILS_WITHOUT_REVIEW; 
    }
    
    // --- REAL API CALL ---
    await apiClient.delete(ENDPOINTS.DELETE_REVIEW(eventId, reviewId));
    const updatedDetails = await getEventDetailsWithReview(eventId);
    return updatedDetails;
};

// Helper for demonstration (Update Review)
export const updateReview = async (eventId, reviewId, reviewData) => {
    console.log(`MOCK API: Review ${reviewId} updated/created for event ${eventId}.`);

    return MOCK_EVENT_DETAILS_WITH_REVIEW; 
};