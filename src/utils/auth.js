// src/utils/auth.js
export const buildBasicAuthHeader = (identifier, password) => {
  if (!identifier || !password) return null;
  const token = window.btoa(`${identifier}:${password}`);
  return `Basic ${token}`;
};
