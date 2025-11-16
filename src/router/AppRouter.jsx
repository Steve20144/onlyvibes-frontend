import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import {SearchPage} from "../pages/SearchPage";
import {ProfilePage} from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import CreateEventPage from "../pages/CreateEventPage";
import {EventDetailsPage} from "../pages/EventDetailsPage";
import ProtectedRoute from "./ProtectedRoute"; // or however you implemented it
import LikedEventsPage from "../pages/LikedEventsPage";
import ReviewedEventsPage from "../pages/ReviewedEventsPage";
import OrganizedEventsPage from "../pages/OrganizedEventsPage";

const AppRouter = () => (
  <Routes>
    {/* public route */}
    <Route path="/login" element={<LoginPage />} />

    {/* routes that share main layout */}
    <Route element={<MainLayout />}>
      <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/events/:eventId" element={<ProtectedRoute><EventDetailsPage /></ProtectedRoute>} />
      <Route path="/events/create" element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>} />
      <Route path="/events/liked" element={<ProtectedRoute><LikedEventsPage /></ProtectedRoute>} />
      <Route path="/events/reviewed" element={<ProtectedRoute><ReviewedEventsPage /></ProtectedRoute>} />
      <Route path="/events/organized" element={<ProtectedRoute><OrganizedEventsPage /></ProtectedRoute>} />

    </Route>

    <Route path="*" element={<h1>404 Not Found</h1>} />
  </Routes>
);

export default AppRouter;