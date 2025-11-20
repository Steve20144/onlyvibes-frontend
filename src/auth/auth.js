// src/auth/auth.js

import api from '../api/client';
import { mapUser } from '../api/mappers';

export const loginUser = async (credentials) => {
  const response = await api('/auth/login', { 
    method: 'POST', 
    body: credentials 
  }); 
  
  const user = mapUser(response.user || response); 
  const token = response.token; 

  if (token && user.userId) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUserId', user.userId);
  } else {
    throw new Error("Authentication failed: Missing token or user ID in response.");
  }
  return user;
};

