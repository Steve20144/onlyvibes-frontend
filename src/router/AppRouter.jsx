// src/router/AppRouter.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Pages 
import { HomePage } from '../pages/HomePage';
import { EventDetailsPage } from '../pages/EventDetailsPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { SearchPage } from '../pages/SearchPage';
import { ProfilePage } from '../pages/ProfilePage'; 
import { EditEventPage } from '../pages/EditEventPage'; 
import { OrganizedEventsPage } from '../pages/OrganizedEventsPage'; 

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/register" />;
};

const AppRouter = () => {
  return (
    <Routes>
      
      {/* *** ΤΡΟΠΟΠΟΙΗΜΕΝΗ ΑΡΧΙΚΗ ΔΙΑΔΡΟΜΗ (ROOT PATH) *** */}
      {/* Η διαδρομή ρίζας '/' πλέον οδηγεί στη σελίδα ProfilePage */}
      <Route path="/" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> 
      
      {/* Profile Page (Εναλλακτική διαδρομή) */}
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      
      {/* Home Page (μετονομάζεται σε /feed) */}
      <Route path="/feed" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      
      <Route path="/events/:eventId" element={<ProtectedRoute><EventDetailsPage /></ProtectedRoute>} />
      <Route path="/events/:eventId/edit" element={<ProtectedRoute><EditEventPage /></ProtectedRoute>} />
      <Route path="/profile/organized" element={<ProtectedRoute><OrganizedEventsPage /></ProtectedRoute>} />
      
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRouter;