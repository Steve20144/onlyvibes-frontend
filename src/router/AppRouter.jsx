// src/router/AppRouter.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
// Import AuthContext hook
import { useAuth } from '../auth/AuthContext'; 

// Imports for Pages
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import CreateEventPage from "../pages/CreateEventPage";

// Named Exports
import { SearchPage } from "../pages/SearchPage";
import { ProfilePage } from "../pages/ProfilePage";
import { OrganizedEventsPage } from '../pages/OrganizedEventsPage';
import { EventDetailsPage } from "../pages/EventDetailsPage";
import { EditEventPage } from "../pages/EditEventPage"; 
import ProtectedRoute from "./ProtectedRoute"; // or however you implemented it

// Helper to enforce login (χρησιμοποιεί το useAuth για έλεγχο ταυτότητας)
const AuthWrapper = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};


const AppRouter = () => (
  <Routes>
    {/* PUBLIC ROUTE: Login */}
    <Route path="/login" element={<LoginPage />} />

    {/* ROUTES THAT SHARE MAIN LAYOUT AND REQUIRE AUTHENTICATION */}
    <Route element={<MainLayout />}>
      
      {/* 1. ROOT PATH: Οδηγεί πλέον στο HomePage (Λίστα Εκδηλώσεων) */}
      <Route index element={<AuthWrapper><HomePage /></AuthWrapper>} />
      
      {/* 2. PROFILE & EVENT MANAGEMENT */}
      <Route path="/profile" element={<AuthWrapper><ProfilePage /></AuthWrapper>} />
      
      {/* 3. ORGANIZED EVENTS */}
      <Route path="/profile/organized" element={<AuthWrapper><OrganizedEventsPage /></AuthWrapper>} />
      
      {/* 4. EVENT DETAILS & EDITING */}
      <Route path="/events/:eventId" element={<AuthWrapper><EventDetailsPage /></AuthWrapper>} />
      <Route path="/events/:eventId/edit" element={<AuthWrapper><EditEventPage /></AuthWrapper>} />
      
      {/* 5. OTHER ROUTES */}
      <Route path="/search" element={<AuthWrapper><SearchPage /></AuthWrapper>} />
      <Route path="/events/create" element={<AuthWrapper><CreateEventPage /></AuthWrapper>} />
      
    </Route>

    {/* Fallback 404 */}
    <Route path="*" element={<h1>404 Not Found</h1>} />
  </Routes>
);

export default AppRouter;