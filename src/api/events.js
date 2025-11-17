// src/api/events.js - ΕΝΟΠΟΙΗΜΕΝΟ SERVICE
import api from "./client";
import { 
    MOCK_EVENT_ID_EDITABLE_1, 
    MOCK_EVENTS,
    MOCK_EVENT_DETAILS_WITH_REVIEW
} from './mockData'; 

// =========================================================
// 1. ΑΝΑΚΤΗΣΗ ΛΕΠΤΟΜΕΡΕΙΩΝ (Used by EventDetailsPage/EditEventPage)
// =========================================================

// Endpoint: GET /events/{eventId} (Fetch Event Details)
export const fetchEventDetails = async (eventId) => {
    
    const idString = eventId.toString();

    // 1. Λογική για το κεντρικό Event (404)
    if (idString === MOCK_EVENT_ID_EDITABLE_1.toString()) {
        // Επιστρέφουμε το προ-κατασκευασμένο αντικείμενο 404
        return MOCK_EVENT_DETAILS_WITH_REVIEW; 
    }
    
    // 2. Λογική για άλλα Mock Events (π.χ. 101, 201)
    const event = MOCK_EVENTS.find(e => e.eventId === parseInt(idString)); 

    if (event) {
        // Επιστρέφουμε το event με επιπλέον mock details για να λειτουργήσει η EditPage
        return {
            ...event,
            description: "This is a basic event description loaded from the MOCK_EVENTS list.",
            categories: ["Music"],
            photos: ["photo_a.jpg", "photo_b.jpg", "photo_c.jpg"] 
        };
    }
    
    // Εάν δεν βρεθεί
    // return (await api.get(`/events/${eventId}`)).data; // <-- Αν θέλατε real API
    throw new Error("Event not found or API call not mocked for this ID.");
};

// Endpoint: PUT /events/{eventId} (Update Event Details)
export const updateEventDetails = async (eventId, updatedEventData) => {
    
    const idString = eventId.toString();

    // --- MOCK LOGIC ---
    if (idString === MOCK_EVENT_ID_EDITABLE_1.toString()) {
        console.log(`MOCK API: Event ${eventId} updated successfully (PUT /events/{eventId}).`);
        
        // Επιστρέφουμε το ενημερωμένο αντικείμενο για να φανούν οι αλλαγές
        return {
            ...updatedEventData, 
            eventId: eventId,
            imageUrl: MOCK_EVENT_DETAILS_WITH_REVIEW.imageUrl, 
            reviewSummary: MOCK_EVENT_DETAILS_WITH_REVIEW.reviewSummary, 
            reviewCount: MOCK_EVENT_DETAILS_WITH_REVIEW.reviewCount
        };
    }
    
    // 2. Λογική για άλλα Mock Events (π.χ. 101, 201)
    const event = MOCK_EVENTS.find(e => e.eventId === parseInt(idString)); 

    if (event) {
        console.log(`MOCK API: Event ${idString} updated successfully (PUT).`);
        
        // Return the simple updated object for the 101 event
        return {
            ...event,
            ...updatedEventData,
        };
    }
    
    throw new Error("API call not implemented.");
};

// =========================================================
// 2. ΥΠΟΛΟΙΠΕΣ ΛΕΙΤΟΥΡΓΙΕΣ (Από τα αρχικά αρχεία)
// =========================================================

// GET /events with optional filters
export async function getEvents(filters = {}) {
  const response = await api.get("/events", { params: filters });
  return response.data; // array of Event
}

// Χρησιμοποιούμε την ίδια συνάρτηση για ανάκτηση
export const getEventById = fetchEventDetails; 

export const createEvent = async (payload) => {
  const res = await api.post("/events", payload);
  return res.data;
};

export const likeEvent = async (eventId) => {
  await api.post(`/events/${eventId}/like`);
};

export async function unlikeEvent(eventId) {
  await api.delete(`/events/${eventId}/like`);
}

export const getEventLikes = async (eventId) => {
  const res = await api.get(`/events/${eventId}/likes`);
  return res.data;
};

// Reviews (Αυτές οι συναρτήσεις ΔΕΝ είναι απαραίτητο να υπάρχουν εδώ, αλλά τις διατηρούμε)

export async function getReviews(eventId) {
  const res = await api.get(`/events/${eventId}/reviews`);
  return res.data; // array of Review
}

export async function createReview(eventId, review) {
  const res = await api.post(`/events/${eventId}/reviews`, review);
  return res.data;
}