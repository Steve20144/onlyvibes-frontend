// src/api/client.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json"
  }
});

// Attach Basic Auth header from localStorage on every request
api.interceptors.request.use((config) => {
  const authHeader = window.localStorage.getItem("onlyvibes_auth_header");
  if (authHeader) {
    config.headers.Authorization = authHeader;
  }
  return config;
});

export default api;
