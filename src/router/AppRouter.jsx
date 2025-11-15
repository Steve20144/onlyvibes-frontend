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
import { EditEventPage } from '../pages/EditEventPage'; // <--- ΝΕΟ IMPORT

// ... (ProtectedRoute component παραμένει το ίδιο) ...

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/register" />;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      
      {/* Event Details Page */}
      <Route path="/events/:eventId" element={<ProtectedRoute><EventDetailsPage /></ProtectedRoute>} />
      
      {/* ΝΕΑ ΔΙΑΔΡΟΜΗ ΓΙΑ ΕΠΕΞΕΡΓΑΣΙΑ (Edit) */}
      <Route path="/events/:eventId/edit" element={<ProtectedRoute><EditEventPage /></ProtectedRoute>} />
      
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRouter;