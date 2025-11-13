import api from "./client";

// GET /events with optional filters (category, location, fromDate, toDate, sort)
export async function getEvents(filters = {}) {
  const response = await api.get("/events", { params: filters });
  return response.data;
}

// GET /events/{eventId}
export async function getEventById(eventId) {
  const response = await api.get(`/events/${eventId}`);
  return response.data;
}

// POST /events – create new event
export async function createEvent(payload) {
  const response = await api.post("/events", payload);
  return response.data;
}

// POST /events/{eventId}/like
export async function likeEvent(eventId) {
  await api.post(`/events/${eventId}/like`);
}

// DELETE /events/{eventId}/like
export async function unlikeEvent(eventId) {
  await api.delete(`/events/${eventId}/like`);
}

// GET /events/{eventId}/likes
export async function getLikes(eventId) {
  const res = await api.get(`/events/${eventId}/likes`);
  return res.data; // { eventId, likesCount }
}

// Reviews

// GET /events/{eventId}/reviews
export async function getReviews(eventId) {
  const res = await api.get(`/events/${eventId}/reviews`);
  return res.data; // array of Review
}

// POST /events/{eventId}/reviews
export async function createReview(eventId, review) {
  const res = await api.post(`/events/${eventId}/reviews`, review);
  return res.data;
}
