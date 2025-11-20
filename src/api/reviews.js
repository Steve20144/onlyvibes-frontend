// src/api/reviewService.js
import api from './client';
import { ENDPOINTS } from '../utils/constants';

// *** ΕΙΣΑΓΩΓΗ ΟΛΩΝ ΤΩΝ ΣΤΑΘΕΡΩΝ ***
import { 
    MOCK_REVIEW_ID, 
    MOCK_EVENT_ID_EDITABLE_1, 
    MOCK_EVENT_DETAILS_WITH_REVIEW, 
    MOCK_EVENT_DETAILS_WITHOUT_REVIEW,
    MOCK_EVENTS // <--- ΚΡΙΣΙΜΟ: Χρειάζεται για εύρεση του event 101
} from './mockData';


export const getEventDetailsWithReview = async (id) => {
    const idString = id.toString();

    // 1. Λογική για το κεντρικό Event (404)
    if (idString === MOCK_EVENT_ID_EDITABLE_1.toString()) {
        // Επιστρέφουμε το προ-κατασκευασμένο αντικείμενο (που έχει review)
        return MOCK_EVENT_DETAILS_WITH_REVIEW; 
    }
    
    // 2. ΝΕΑ ΛΟΓΙΚΗ: Αναζήτηση άλλων Mock Events (π.χ. 101, 201)
    // Χρησιμοποιούμε parseInt() για να είμαστε σίγουροι ότι ταιριάζει με τον αριθμό του array
    const event = MOCK_EVENTS.find(e => e.id === parseInt(idString)); 
    
    if (event) {
        // Εάν βρεθεί, επιστρέφουμε βασικά δεδομένα (χωρίς review)
        return {
            ...event,
            userReview: null, // Δεδομένα review για να μη σπάσει η EventDetailsPage
            reviewSummary: 4.0,
            reviewCount: event.likecounter, 
            description: "Basic description for event " + idString,
            photos: ["photo_a.jpg"] 
        };
    }

    throw new Error("Event not found or API call not implemented for this ID.");
};


// Endpoint 4: DELETE /events/{id}/reviews/{reviewId} (Ενημερωμένη λογική)
export const deleteReview = async (id, reviewId) => {
    // --- MOCK LOGIC ---
    if (id.toString() === MOCK_EVENT_ID_EDITABLE_1.toString() && reviewId === MOCK_REVIEW_ID) {
        console.log(`MOCK API: Review ${reviewId} deleted successfully for event ${id}.`);
        return MOCK_EVENT_DETAILS_WITHOUT_REVIEW; 
    }
    
    throw new Error("Real DELETE API call not implemented in mock environment.");
};

// Helper for demonstration (Update Review)
export const updateReview = async (id, reviewId, reviewData) => {
    console.log(`MOCK API: Review ${reviewId} updated/created for event ${id}.`);

    return MOCK_EVENT_DETAILS_WITH_REVIEW; 
};