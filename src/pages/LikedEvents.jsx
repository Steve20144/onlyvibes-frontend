// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_EVENTS } from '../api/mockData';

export const HomePage = () => {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    // Real call would be GET /events or GET /accounts/{userId}/recommendations
    setIsLoading(false);
  }, []);

  if (isLoading) return <div className="page-container">Loading Events...</div>;
  
  return (
    <div className="page-container home-page">
      <h1 className="page-title">Liked Events</h1>
      {events.map(event => (
        <Link to={`/events/${event.eventId}`} key={event.eventId} className="event-card-link">
          <div className="event-card">
            <img src={event.imageUrl} alt={event.title} className="event-image" />
            <div className="event-meta">
                <span className="location">📍 {event.distance}</span>
                <span className="likes">❤️ {event.likecounter}</span>
            </div>
            <h4 className="event-title">{event.title}</h4>
          </div>
        </Link>
      ))}
    </div>
  );
};