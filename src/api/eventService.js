import { 
    MOCK_EVENTS, 
    MOCK_EVENT_DETAILS_WITHOUT_REVIEW, 
    MOCK_EVENT_ID_EDITABLE_1 // <--- UPDATED IMPORT
} from './mockData';

// Simulating network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchEventDetails = async (eventId) => {
    await delay(500); // Simulate latency

    // Convert to string for comparison just in case
    const idToCheck = String(eventId);

    // Use the available editable ID from your mock data
    if (idToCheck === String(MOCK_EVENT_ID_EDITABLE_1)) {
        return { ...MOCK_EVENT_DETAILS_WITHOUT_REVIEW };
    }

    // Fallback: Find in the generic list or return first item
    const found = MOCK_EVENTS.find(e => String(e.eventId) === idToCheck);
    if (found) return found;

    // Default fallback for testing if nothing matches
    return { ...MOCK_EVENT_DETAILS_WITHOUT_REVIEW, eventId: idToCheck };
};

export const updateEventDetails = async (eventId, updateData) => {
    await delay(800); // Simulate network write time

    // Simulate a server validation or error
    if (!updateData.title) {
        throw new Error("Title is required by the server.");
    }

    console.log(`[API] PUT /events/${eventId}`, updateData);

    // Return the updated data as the server would
    return {
        ...MOCK_EVENT_DETAILS_WITHOUT_REVIEW, // Base data
        ...updateData, // Overwrite with new data
        eventId: eventId // Ensure ID stays same
    };
};