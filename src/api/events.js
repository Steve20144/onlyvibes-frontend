// src/api/events.js
import api from "./client";

export const getEvents = async (params = {}) => {
  const res = await api.get("/events", { params });
  return res.data; // array of Event
};

export const getEventById = async (eventId) => {
  const res = await api.get(`/events/${eventId}`);
  return res.data;
};

export const createEvent = async (payload) => {
  // matches EventCreate schema
  const res = await api.post("/events", payload);
  return res.data;
};

export const likeEvent = async (eventId) => {
  const res = await api.post(`/events/${eventId}/like`);
  return res.data;
};

export const getEventLikes = async (eventId) => {
  const res = await api.get(`/events/${eventId}/likes`);
  return res.data;
};
