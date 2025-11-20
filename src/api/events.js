// // src/api/events.js - ΕΝΟΠΟΙΗΜΕΝΟ SERVICE
// import api from './client'; 
// import {mapEvent} from "./mappers";


// // =========================================================
// // 1. EVENT DETAILS (Used by EventDetailsPage/EditEventPage)
// // =========================================================

// // Endpoint: GET /events/{id}
// // Renaming to the standard API function name for clarity
// export const fetchEventDetails = async (id) => {
//     // 🔥 REAL API CALL: GET /api/events/{id}
//     const data = await api(`/events/${id}`); 
//     return data;
// };

// // Endpoint: PUT /events/{id} (Update Event Details)
// export const updateEventDetails = async (id, updatedEventData) => {
//     // 🔥 REAL API CALL: PUT /api/events/{id}
//     const data = await api(`/events/${id}`, { 
//         method: 'PUT',
//         body: updatedEventData 
//     });
//     return data;
// };

// // =========================================================
// // 2. OTHER EVENT OPERATIONS
// // =========================================================

// // GET /api/events with optional filters (Browse Events)


// // --- 2. THE GET FUNCTION ---
// export async function getEvents(filters = {}) {
//     const queryParams = new URLSearchParams(filters).toString();
    
//     try {
//         // 1. Axios call returns the response object
//         const response = await api(`/events?${queryParams}`);
        
//         // 2. Axios places the server's full JSON body here:
//         const serverPayload = response.data; 

//         // 🛑 DEBUG PRINT: Check the structure of the RAW server JSON body
//         console.log("🛑 SERVER PAYLOAD RAW:", serverPayload); 

//         // 3. Check server's wrapper and access the array
//         if (serverPayload && Array.isArray(serverPayload.data)) {
            
//             console.log(`🛑 API SUCCESS: Found ${serverPayload.data.length} items. Starting map.`); 
            
//             // Map the array nested inside serverPayload.data
//             return serverPayload.data.map(mapEvent); 
//         }
        
//         console.warn("🛑 API WARNING: Response structure invalid or data is not an array.");
//         return []; 
//     } catch (error) {
//         // ...
//         throw error;
//     }
// }

// // Alias for fetching a single event
// export const getEventById = fetchEventDetails; 

// // POST /api/events (Create Event)
// export const createEvent = async (payload) => {
//     // 1. Get the required creatorId from local storage
//     // NOTE: Hardcoded for testing, but should use localStorage in production:
//     const creatorId = '67a12345bc910f0012e99abc'; // localStorage.getItem('currentUserId'); 
    
//     if (!creatorId) {
//         throw new Error("Authentication required: Creator ID is missing.");
//     }
    
//     // 2. CONSTRUCT THE FINAL PAYLOAD for the API endpoint
//     // Merge the creatorId with the event data before sending.
//     const finalPayload = {
//         ...payload,
//         creatorId: creatorId,
//         // Remove the temporary id if frontend was generating it
//         // id: undefined, 
//     };

//     try {
//         // 3. API CALL: Use the clean, explicit Axios syntax.
//         // The backend expects the JSON body, which includes the creatorId.
//         const response = await api.post('/events', finalPayload); 
        
//         // 4. Map the response data before returning to the UI.
//         return mapEvent(response.data);
        
//     } catch (error) {
//         // Log the error and re-throw it so the UI (CreateEventPage) can catch it.
//         console.error("API Error creating event:", error.message);
//         throw error;
//     }
// };

// // POST /api/events/:id/like (Like)
// export const likeEvent = async (id) => {
//     // 🔥 REAL API CALL: POST /api/events/{id}/like
//     await api(`/events/${id}/like`, { method: 'POST' });
// };

// // DELETE /api/events/:id/like (Unlike - Assumed standard REST endpoint)
// export async function unlikeEvent(id) {
//     // 🔥 REAL API CALL: DELETE /api/events/{id}/like
//     await api(`/events/${id}/like`, { method: 'DELETE' });
// }

// // GET /api/events/:id/likes (Fetch Likes)
// export const getEventLikes = async (id) => {
//     // 🔥 REAL API CALL: GET /api/events/{id}/likes
//     const data = await api(`/events/${id}/likes`);
//     return data;
// };

// // =========================================================
// // 3. REVIEWS (Moving Review endpoints to Event Service for integration)
// // =========================================================

// // GET /api/events/:id/reviews (Fetch Reviews for event)
// export async function getReviews(id) {
//     // 🔥 REAL API CALL: GET /api/events/{id}/reviews
//     const data = await api(`/events/${id}/reviews`);
//     return data; // array of Review
// }

// // POST /api/events/:id/reviews (Submit Review)
// export async function createReview(id, review) {
//     // 🔥 REAL API CALL: POST /api/events/{id}/reviews
//     const data = await api(`/events/${id}/reviews`, { method: 'POST', body: review });
//     return data;
// }

// // NOTE: Since you are now using real API calls, you might want to integrate a data mapper 
// // (like the one we created in 'mappers.js') to clean up the data before returning it from these functions.
// // If you do, wrap the return line with the mapper: 
// // return mapEvent(data);


// src/api/events.js
import api from './client'; 
import { mapEvent } from "./mappers";

export const fetchEventDetails = async (id) => {
    console.log("📡 fetchEventDetails: requesting event", id);
    return api(`/events/${id}`);
};

export const updateEventDetails = async (id, updatedEventData) => {
    console.log("📡 updateEventDetails:", id, updatedEventData);
    return api(`/events/${id}`, { 
        method: 'PUT',
        body: updatedEventData 
    });
};

// GET /events
export async function getEvents(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api(`/events?${queryParams}`);

    const serverPayload = response.data;

    if (serverPayload && Array.isArray(serverPayload.data)) {
        return serverPayload.data.map(mapEvent);
    }

    return []; 
};

export const getEventById = fetchEventDetails;

export const createEvent = async (payload) => {
    const creatorId = '67a12345bc910f0012e99abc';

    const finalPayload = {
        ...payload,
        creatorId
    };

    const response = await api.post('/events', finalPayload);

    return mapEvent(response.data);
};

// Likes
export const likeEvent = async (id) => {
    return api(`/events/${id}/like`, { method: 'POST' });
};

export const unlikeEvent = async (id) => {
    return api(`/events/${id}/like`, { method: 'DELETE' });
};

export const getEventLikes = async (id) => {
    return api(`/events/${id}/likes`);
};

// Reviews
export const getReviews = async (id) => {
    return api(`/events/${id}/reviews`);
};

export const createReview = async (id, review) => {
    return api(`/events/${id}/reviews`, { method: 'POST', body: review });
};
