import api from './client';
import { mapReview } from './mappers';
import { getCurrentUserId } from './auth'; 

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
    const accountId = getCurrentUserId();
    
    // Safety check
    if (!accountId) {
        throw new Error("User must be logged in to submit a review.");
    }

    const method = 'POST';
    const endpoint = `/events/${eventId}/reviews`;
    
    console.log(`📡 API CALL: ${method} ${endpoint}`);
    
    // Backend expects 'accountId' in the body to associate the review
    const payload = { ...reviewData, accountId };

    const response = await api(endpoint, { 
        method: method, 
        data: payload
    });

    return mapReview(response.data || response); 
};


// =========================================================
// 2. UPDATE (PUT /events/:eventId/reviews/:reviewId)
// =========================================================

/**
 * Updates an existing review.
 * @param {string} eventId - The ID of the event.
 * @param {string} reviewId - The ID of the review to update.
 * @param {{rating?:number, comment?:string}} updates - The fields to update.
 * @returns {Promise<object>} The mapped updated review object.
 */
export const updateReview = async (eventId, reviewId, updates) => {
    const accountId = getCurrentUserId();
    
    if (!accountId) {
        throw new Error("User must be logged in to update a review.");
    }

    const method = 'PUT';
    const endpoint = `/events/${eventId}/reviews/${reviewId}`;
    
    console.log(`📡 API CALL: ${method} ${endpoint}`);
    
    // Backend requires accountId for verification
    const payload = { ...updates, accountId };

    const response = await api(endpoint, { 
        method: method, 
        data: payload 
    });

    return mapReview(response.data || response); 
};


// =========================================================
// 3. DELETE (DELETE /events/:eventId/reviews/:reviewId)
// =========================================================

/**
 * Deletes a review.
 * @param {string} eventId - The ID of the event.
 * @param {string} reviewId - The ID of the review to delete.
 * @returns {Promise<void>}
 */
export const deleteReview = async (eventId, reviewId) => {
    const accountId = getCurrentUserId();
    
    if (!accountId) {
        throw new Error("User must be logged in to delete a review.");
    }

    const method = 'DELETE';
    const endpoint = `/events/${eventId}/reviews/${reviewId}`;
    
    console.log(`📡 API CALL: ${method} ${endpoint}`);
    
    const payload = { accountId }; 

    // DELETE requests send data in the 'data' config property
    await api(endpoint, { 
        method: method,
        data: payload 
    });
};

// =========================================================
// 4. FETCH (GET /events/:eventId/reviews)
// =========================================================

/**
 * Fetches all reviews for a specific event.
 * CRITICAL: Manually preserves accountId and username for UI logic.
 * @param {string} eventId - The ID of the event to fetch reviews for.
 * @returns {Promise<object[]>} Array of review objects.
 */
export const fetchEventReviews = async (eventId) => {
    const method = 'GET';
    const endpoint = `/events/${eventId}/reviews`; 

    console.log(`📡 API CALL: ${method} ${endpoint}`);

    try {
        const response = await api(endpoint);
        const serverData = response.data; 
        
        // 1. Extract the raw array from backend response
        let rawReviews = [];
        
        // Scenario A: Backend returns array directly: [{}, {}]
        if (Array.isArray(serverData)) {
             rawReviews = serverData;
        } 
        // Scenario B: Backend returns object: { success: true, data: [{}, {}] }
        else if (serverData && Array.isArray(serverData.data)) {
            rawReviews = serverData.data;
        }

        // 2. Map and Fix Data
        // We manually attach 'accountId' and 'username' because generic mappers often miss 
        // nested or specific backend fields required for the "My Review" feature.
        return rawReviews.map(r => {
            const mapped = mapReview(r);
            return {
                ...mapped,
                // Force preserve the Account ID so we can match the current user
                accountId: r.accountId || r.userId || r.user?._id || r.user?.id,
                
                // Force preserve the Username so it doesn't show as "Anonymous"
                username: r.username || r.user?.username || r.accountId?.username || "Community Member"
            };
        });

    } catch (error) {
        console.error(`❌ API FAILURE [${method} ${endpoint}]:`, error);
        throw error;
    }
};

// =========================================================
// 5. FETCH USER'S REVIEWS (GET /accounts/:accountId/reviewed-events)
// =========================================================

/**
 * Lists all events that a specific user reviewed.
 * @returns {Promise<object[]>}
 */
export const fetchUserReviewedEvents = async () => {
    const accountId = getCurrentUserId();
    const method = 'GET';
    const endpoint = `/accounts/${accountId}/reviewed-events`;

    console.log(`📡 API CALL: ${method} ${endpoint}`);

    const response = await api(endpoint);
    return response.data; 
};