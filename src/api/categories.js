// src/api/categories.js
import api from "./client";

export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};
