import { getCurrentUserId } from './auth';
import api from './client'; 
import { mapEvent } from "./mappers";

/**
 * Retrieves specific event details by ID.
 * @param {string} id - The ID of the event to fetch.
 * @returns {Promise<object>} The event details.
 */
export const fetchEventDetails = async (id) => {
    console.log("📡 fetchEventDetails: requesting event", id);
    return api(`/events/${id}`);
};

/**
 * Updates an existing event.
 * @param {string} id - The ID of the event to update.
 * @param {object} updatedEventData - The data to update.
 * @returns {Promise<object>} The updated event object.
 */
export const updateEventDetails = async (id, updatedEventData) => {
    console.log("📡 updateEventDetails:", id, updatedEventData);
    return api(`/events/${id}`, { 
        method: 'PUT',
        body: updatedEventData 
    });
};

/**
 * Retrieves a list of events based on filters.
 * @param {object} [filters={}] - Query parameters for filtering events.
 * @returns {Promise<Array>} A list of mapped event objects.
 */
export async function getEvents(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api(`/events?${queryParams}`);

    const serverPayload = response.data;

    if (serverPayload && Array.isArray(serverPayload.data)) {
        return serverPayload.data.map(mapEvent);
    }

    return []; 
};

/**
 * Alias for fetchEventDetails.
 * @see fetchEventDetails
 */
export const getEventById = fetchEventDetails;

/**
 * Deletes an event by ID.
 * @param {string} id - The ID of the event to delete.
 * @returns {Promise<void>}
 */
export const deleteEvent = async (id) => {
    const method = 'DELETE';
    const endpoint = `/events/${id}`;
    console.log(`📡 API CALL: ${method} ${endpoint}`);

    try {
        await api(endpoint, { method });
        
        console.log(`✅ API SUCCESS [${method} ${endpoint}]: Event deleted.`);

    } catch (error) {
        console.error(`❌ API FAILURE [${method} ${endpoint}]:`, error);
        throw error;
    }
};

/**
 * Creates a new event.
 * @param {object} payload - The event data.
 * @returns {Promise<object>} The created and mapped event object.
 */
export const createEvent = async (payload) => {
    const creatorId = getCurrentUserId();

    const finalPayload = {
        ...payload,
        creatorId
    };

    const response = await api.post('/events', finalPayload);

    return mapEvent(response.data);
};

/**
 * Likes a specific event.
 * @param {string} id - The ID of the event to like.
 * @returns {Promise<object>} The API response.
 */
export const likeEvent = async (id) => {
    return api(`/events/${id}/like`, { method: 'POST' });
};

/**
 * Unlikes a specific event.
 * @param {string} id - The ID of the event to unlike.
 * @returns {Promise<object>} The API response.
 */
export const unlikeEvent = async (id) => {
    return api(`/events/${id}/like`, { method: 'DELETE' });
};

/**
 * Retrieves likes for a specific event.
 * @param {string} id - The ID of the event.
 * @returns {Promise<object>} The list of likes.
 */
export const getEventLikes = async (id) => {
    return api(`/events/${id}/likes`);
};

/**
 * Retrieves reviews for a specific event.
 * @param {string} id - The ID of the event.
 * @returns {Promise<object>} The list of reviews.
 */
export const getReviews = async (id) => {
    return api(`/events/${id}/reviews`);
};

/**
 * Creates a review for a specific event.
 * @param {string} id - The ID of the event.
 * @param {object} review - The review data.
 * @returns {Promise<object>} The created review object.
 */
export const createReview = async (id, review) => {
    return api(`/events/${id}/reviews`, { method: 'POST', body: review });
};