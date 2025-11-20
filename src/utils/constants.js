// src/utils/constants.js
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';

export const ENDPOINTS = {
    GET_ACCOUNT: (userId) => `/accounts/${userId}`,
    GET_EVENTS: `/events`,
    GET_EVENT_DETAILS: (id) => `/events/${id}`,
    DELETE_REVIEW: (id, reviewId) => `/events/${id}/reviews/${reviewId}`,
    POST_ACCOUNT: `/accounts`,
    GET_SEARCH: `/search`,
};