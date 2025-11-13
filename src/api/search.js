// src/api/search.js
import api from "./client";

export const search = async (query, radiusKm, time) => {
  const params = {};
  if (query) params.query = query;
  if (radiusKm) params.radius = radiusKm;
  if (time) params.time = time;
  const res = await api.get("/search", { params });
  return res.data; // SearchResponse (events + accounts)
};
