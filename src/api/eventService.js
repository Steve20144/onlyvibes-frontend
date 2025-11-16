// src/api/eventService.js
// eslint-disable-next-line no-unused-vars 
import apiClient from './apiClient';
// eslint-disable-next-line no-unused-vars 
import { ENDPOINTS } from '../utils/constants'; 

// *** CRITICAL IMPORT FIX ***
import { 
    MOCK_EVENT_ID, 
    MOCK_EVENTS, 
    MOCK_EVENT_DETAILS_WITH_REVIEW
} from './mockData';

// Endpoint 3: GET /events/{eventId} (Fetch Event Details)
export const fetchEventDetails = async (eventId) => {
    
    const idString = eventId.toString();

    // 1. Logic for the central Event (404)
    if (idString === MOCK_EVENT_ID.toString()) {
        if (!MOCK_EVENT_DETAILS_WITH_REVIEW || MOCK_EVENT_DETAILS_WITH_REVIEW.eventId.toString() !== idString) {
            throw new Error(`MOCK Event ID ${eventId} mismatch or object is null.`);
        }
        return MOCK_EVENT_DETAILS_WITH_REVIEW; 
    }
    
    // 2. Logic for other Mock Events (e.g., 101)
    const event = MOCK_EVENTS.find(e => e.eventId.toString() === idString); 

    if (event) {
        // Return structured data required by EditEventPage
        return {
            ...event,
            description: "This is a basic event description loaded from the MOCK_EVENTS list.",
            categories: ["Music"],
            photos: ["photo_a.jpg", "photo_b.jpg", "photo_c.jpg", "photo_d.jpg", "photo_e.jpg", "photo_f.jpg"] 
        };
    }
    
    throw new Error("Event not found or API call not mocked for this ID.");
};

// Endpoint: PUT /events/{eventId} (Update Event Details)
export const updateEventDetails = async (eventId, updatedEventData) => {
    
    const idString = eventId.toString();

    // 1. Logic for the central Event (404)
    if (idString === MOCK_EVENT_ID.toString()) {
        console.log(`MOCK API: Event 404 updated successfully (PUT).`);
        // Return updated object based on MOCK_EVENT_DETAILS_WITH_REVIEW
        return {
            ...updatedEventData, 
            eventId: MOCK_EVENT_ID,
            imageUrl: MOCK_EVENT_DETAILS_WITH_REVIEW.imageUrl, 
            reviewSummary: MOCK_EVENT_DETAILS_WITH_REVIEW.reviewSummary, 
            reviewCount: MOCK_EVENT_DETAILS_WITH_REVIEW.reviewCount
        };
    }
    
    // 2. Logic for other Mock Events (e.g., 101)
    const event = MOCK_EVENTS.find(e => e.eventId.toString() === idString); 

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
