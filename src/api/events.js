// src/api/events.js - ΕΝΟΠΟΙΗΜΕΝΟ SERVICE
import api from './client'; // Assuming 'api' is now imported as 'client' or aliased.
// We no longer need MOCK_EVENT_ID_EDITABLE_1, MOCK_EVENTS, MOCK_EVENT_DETAILS_WITH_REVIEW
// import { ... } from './mockData'; 

// =========================================================
// 1. EVENT DETAILS (Used by EventDetailsPage/EditEventPage)
// =========================================================

// Endpoint: GET /events/{eventId}
// Renaming to the standard API function name for clarity
export const fetchEventDetails = async (eventId) => {
    // 🔥 REAL API CALL: GET /api/events/{eventId}
    const data = await api(`/events/${eventId}`); 
    return data;
};

// Endpoint: PUT /events/{eventId} (Update Event Details)
export const updateEventDetails = async (eventId, updatedEventData) => {
    // 🔥 REAL API CALL: PUT /api/events/{eventId}
    const data = await api(`/events/${eventId}`, { 
        method: 'PUT',
        body: updatedEventData 
    });
    return data;
};

// =========================================================
// 2. OTHER EVENT OPERATIONS
// =========================================================

// GET /api/events with optional filters (Browse Events)
const mapEvent = (apiData) => {
  // Check what data the mapper receives for a single item
  console.log("⚙️  MAPPER: Processing item:", apiData._id, apiData.title); 

  if (!apiData) return null;
  
  const mappedItem = {
    eventId: apiData.id || apiData._id, 
    title: apiData.title,
    // ... other properties
    venueName: apiData.venueName || "Unknown Venue"
  };
  
  return mappedItem;
};

// --- 2. THE FETCH FUNCTION ---
export async function getEvents(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    
    try {
        // Assuming your client returns the full response object with the 'data' property
        const fullResponse = await api(`/events?${queryParams}`);
        
        // 🛑 DEBUG PRINT 1: Check the structure of the RAW API response
        console.log("🛑 API RESPONSE RAW:", fullResponse); 

        // CRITICAL FIX: Access the inner 'data' property
        const apiPayload = fullResponse.data; 

        if (apiPayload && Array.isArray(apiPayload.data)) {
            // 🛑 DEBUG PRINT 2: Success! Now we have the correct array.
            console.log(`🛑 API SUCCESS: Found ${apiPayload.data.length} items. Starting map.`); 
            
            // Map the array nested inside apiPayload.data
            return apiPayload.data.map(mapEvent); 
        }
        
        // 🛑 DEBUG PRINT 3: If 'data' is missing or wrong type
        console.warn("🛑 API WARNING: Response structure invalid or data is not an array.");
        return []; 
    } catch (error) {
        // ...
        throw error;
    }
}

// Alias for fetching a single event
export const getEventById = fetchEventDetails; 

// POST /api/events (Create Event)
export const createEvent = async (payload) => {
    // 🔥 REAL API CALL: POST /api/events
    const data = await api("/events", { method: 'POST', body: payload });
    return data;
};

// POST /api/events/:eventId/like (Like)
export const likeEvent = async (eventId) => {
    // 🔥 REAL API CALL: POST /api/events/{eventId}/like
    await api(`/events/${eventId}/like`, { method: 'POST' });
};

// DELETE /api/events/:eventId/like (Unlike - Assumed standard REST endpoint)
export async function unlikeEvent(eventId) {
    // 🔥 REAL API CALL: DELETE /api/events/{eventId}/like
    await api(`/events/${eventId}/like`, { method: 'DELETE' });
}

// GET /api/events/:eventId/likes (Fetch Likes)
export const getEventLikes = async (eventId) => {
    // 🔥 REAL API CALL: GET /api/events/{eventId}/likes
    const data = await api(`/events/${eventId}/likes`);
    return data;
};

// =========================================================
// 3. REVIEWS (Moving Review endpoints to Event Service for integration)
// =========================================================

// GET /api/events/:eventId/reviews (Fetch Reviews for event)
export async function getReviews(eventId) {
    // 🔥 REAL API CALL: GET /api/events/{eventId}/reviews
    const data = await api(`/events/${eventId}/reviews`);
    return data; // array of Review
}

// POST /api/events/:eventId/reviews (Submit Review)
export async function createReview(eventId, review) {
    // 🔥 REAL API CALL: POST /api/events/{eventId}/reviews
    const data = await api(`/events/${eventId}/reviews`, { method: 'POST', body: review });
    return data;
}

// NOTE: Since you are now using real API calls, you might want to integrate a data mapper 
// (like the one we created in 'mappers.js') to clean up the data before returning it from these functions.
// If you do, wrap the return line with the mapper: 
// return mapEvent(data);