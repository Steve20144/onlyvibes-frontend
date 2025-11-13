// src/api/accounts.js
import api from "./client";

export const loginWithUserId = async (userId) => {
  // GET /accounts/{userId}
  const res = await api.get(`/accounts/${encodeURIComponent(userId)}`);
  return res.data;
};

export const createAccount = async (payload) => {
  // POST /accounts
  const res = await api.post("/accounts", payload);
  return res.data;
};
