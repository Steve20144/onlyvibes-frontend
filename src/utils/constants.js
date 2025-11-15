// src/utils/constants.js
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';

export const ENDPOINTS = {
    GET_ACCOUNT: (userId) => `/accounts/${userId}`,
    GET_EVENTS: `/events`,
    GET_EVENT_DETAILS: (eventId) => `/events/${eventId}`,
    DELETE_REVIEW: (eventId, reviewId) => `/events/${eventId}/reviews/${reviewId}`,
    POST_ACCOUNT: `/accounts`,
    GET_SEARCH: `/search`,
};