import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Pages
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import CreateEventPage from "../pages/CreateEventPage";
import { SearchPage } from "../pages/SearchPage";
import { ProfilePage } from "../pages/ProfilePage";
import { OrganizedEventsPage } from "../pages/OrganizedEventsPage";
import { EventDetailsPage } from "../pages/EventDetailsPage";
import LikedEventsPage from "../pages/LikedEventsPage";
import ReviewedEventsPage from "../pages/ReviewedEventsPage";
import { EditEventPage } from "../pages/EditEventPage";

import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => (
  <Routes>
    {/* Public Login Route */}
    <Route path="/login" element={<LoginPage />} />

    <Route element={<MainLayout />}>
      {/* 🟢 PUBLIC ROUTES (NO PROTECTED ROUTE WRAPPER) */}
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* 🔒 PROTECTED ROUTES (ONLY THESE REQUIRE LOGIN) */}
      <Route path="/events/create" element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>} />
      <Route path="/profile/events/:id/edit" element={<ProtectedRoute><EditEventPage /></ProtectedRoute>} />
      <Route path="/events/liked" element={<ProtectedRoute><LikedEventsPage /></ProtectedRoute>} />
      <Route path="/events/reviewed" element={<ProtectedRoute><ReviewedEventsPage /></ProtectedRoute>} />
      <Route path="/events/organized" element={<ProtectedRoute><OrganizedEventsPage /></ProtectedRoute>} />
    </Route>

    <Route path="*" element={<div style={{color:'white', padding:'20px'}}>404 - Page Not Found</div>} />
  </Routes>
);

export default AppRouter;