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
import ProtectedRoute from "./ProtectedRoute"; // or however you implemented it
import LikedEventsPage from "../pages/LikedEventsPage";
import ReviewedEventsPage from "../pages/ReviewedEventsPage";
import {EditEventPage} from "../pages/EditEventPage";


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
      <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/events/:eventId" element={<ProtectedRoute><EventDetailsPage /></ProtectedRoute>} />
      <Route path="/profile/events/:eventId/edit" element={<ProtectedRoute><EditEventPage /></ProtectedRoute>} />
      <Route path="/events/create" element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>} />
      <Route path="/events/liked" element={<ProtectedRoute><LikedEventsPage /></ProtectedRoute>} />
      <Route path="/events/reviewed" element={<ProtectedRoute><ReviewedEventsPage /></ProtectedRoute>} />
      <Route path="/events/organized" element={<ProtectedRoute><OrganizedEventsPage /></ProtectedRoute>} />

    </Route>

    {/* Fallback 404 */}
    <Route path="*" element={<h1>404 Not Found</h1>} />
  </Routes>
);

export default AppRouter;