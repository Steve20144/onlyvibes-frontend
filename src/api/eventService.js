// src/api/eventService.js
import apiClient from './apiClient';
import { ENDPOINTS } from '../utils/constants';
import { 
    MOCK_EVENT_ID, 
    MOCK_EVENT_DETAILS_WITH_REVIEW
} from './mockData';

// Endpoint 3: GET /events/{eventId} (Φέρνει τα δεδομένα του Event)
export const fetchEventDetails = async (eventId) => {
    
    // MOCK LOGIC: Χρησιμοποιούμε το προ-κατασκευασμένο αντικείμενο
    if (eventId.toString() === MOCK_EVENT_ID.toString()) {
        
        if (!MOCK_EVENT_DETAILS_WITH_REVIEW || MOCK_EVENT_DETAILS_WITH_REVIEW.eventId.toString() !== eventId.toString()) {
            // Αυτό θα συμβεί μόνο αν τα δεδομένα στο mockData.js είναι αλλοιωμένα
            throw new Error(`MOCK Event ID ${eventId} mismatch or object is null.`);
        }

        // Επιστρέφουμε το πλήρες αντικείμενο για EventDetailsPage και EditEventPage
        return MOCK_EVENT_DETAILS_WITH_REVIEW; 
    }
    
    // Real API call (ή σφάλμα για μη mocked IDs)
    throw new Error("Event not found or API call not mocked for this ID.");
};

// Endpoint: PUT /events/{eventId} (Ενημερώνει τα δεδομένα του Event)
export const updateEventDetails = async (eventId, updatedEventData) => {
    
    // --- MOCK LOGIC ---
    if (eventId.toString() === MOCK_EVENT_ID.toString()) {
        console.log(`MOCK API: Event ${eventId} updated successfully (PUT /events/{eventId}).`);
        
        // Επιστρέφουμε το ενημερωμένο αντικείμενο για να φανούν οι αλλαγές
        return {
            ...updatedEventData, 
            eventId: eventId,
            imageUrl: MOCK_EVENT_DETAILS_WITH_REVIEW.imageUrl, // Χρησιμοποιούμε την εικόνα από το mock
            reviewSummary: MOCK_EVENT_DETAILS_WITH_REVIEW.reviewSummary, 
            reviewCount: MOCK_EVENT_DETAILS_WITH_REVIEW.reviewCount
        };
    }
    
    throw new Error("API call not implemented.");
};