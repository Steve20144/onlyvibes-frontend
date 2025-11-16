// src/pages/OrganizedEventsPage.jsx (Νέο Αρχείο)
import React, { useState } from 'react';
import { MOCK_EVENTS } from '../api/mockData';
import { Link } from 'react-router-dom';

export const OrganizedEventsPage = () => {
    // Υποθέτουμε ότι εδώ θα κάναμε fetch από endpoint /accounts/{userId}/events
    // Χρησιμοποιούμε MOCK_EVENTS για mockup 
    const organizedEvents = MOCK_EVENTS.filter(e => e.creatorId !== 101); 
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) return <div className="page-container">Loading Organized Events...</div>;
    
    return (
        <div className="page-container organized-events-page">
            <h1 className="page-title">Your Organized Events</h1>
            <p>Select an event to view or edit its details.</p>
            
            {organizedEvents.map(event => (
                // Κάθε event card είναι ένας σύνδεσμος προς τη σελίδα λεπτομερειών/επεξεργασίας
                <Link to={`/events/${event.eventId}/edit`} key={event.eventId} className="event-card-link">
                    <div className="event-card event-card-organized">
                        <img src={event.imageUrl} alt={event.title} className="event-image" />
                        <div className="event-meta">
                            <h4>{event.title}</h4>
                            <p>📍 {event.location} | {new Date(event.dateTime).toLocaleDateString()}</p>
                        </div>
                        <span className="material-icons edit-icon">edit</span>
                    </div>
                </Link>
            ))}
            
            {organizedEvents.length === 0 && (
                <p style={{marginTop: '30px'}}>You haven't organized any events yet. <Link to="/create-event">Create one!</Link></p>
            )}
        </div>
    );
};