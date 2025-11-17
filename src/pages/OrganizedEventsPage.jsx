// src/pages/OrganizedEventsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_EVENTS } from '../api/mockData';
import { useAuth } from '../auth/AuthContext'; 

// *** Import του νέου component ***
import OrganizedEventCard from '../components/OrganizedEventCard'; 

export const OrganizedEventsPage = () => {
    const navigate = useNavigate();
    const { getUserId } = useAuth();
    const currentUserId = getUserId(); 
    
    const [organizedEvents, setOrganizedEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // MOCK LOGIC: Φιλτράρουμε τα events με creatorId: 3, που είναι τα events που μπορούμε να επεξεργαστούμε
        const events = MOCK_EVENTS.filter(event => 
            event.creatorId === 3 
        ); 
        
        // Sorting: Ταξινομούμε κατά ημερομηνία
        events.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

        setOrganizedEvents(events);
        setIsLoading(false);
    }, [currentUserId]);
    
    // *** ΝΕΑ ΣΥΝΑΡΤΗΣΗ: Χειρίζεται την πλοήγηση ***
    const handleCardClick = (eventId) => {
        // Ορίζει την πλοήγηση στην Edit Page
        navigate(`/events/${eventId}/edit`);
    };

    if (isLoading) return <div className="page-container">Loading Organized Events...</div>;
    
    return (
        <div className="page-container organized-events-page" style={styles.pageContainer}>
            {/* Header με Back Button */}
            <div style={styles.header}>
                <span className="material-icons" style={styles.backIcon} onClick={() => navigate('/profile')}>arrow_back</span>
                <h1 style={styles.title}>Your Organized Events</h1>
                <div style={{width: '24px'}}></div> 
            </div>
            
            {organizedEvents.length > 0 ? (
                organizedEvents.map(event => (
                    // *** ΠΕΡΝΑΜΕ ΤΟΝ HANDLER ΣΤΟ CARD ***
                    <OrganizedEventCard 
                        key={event.eventId} 
                        event={event} 
                        onCardClick={handleCardClick} // <--- ΚΡΙΣΙΜΟ
                    />
                ))
            ) : (
                <p style={styles.noEvents}>You haven't organized any events yet.</p>
            )}
        </div>
    );
};

// --- Styles for the page layout ---
const styles = {
    pageContainer: {
        padding: '20px',
        backgroundColor: '#120a24',
        minHeight: '100vh',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    title: {
        fontSize: '22px',
        color: 'white',
        margin: 0,
        flexGrow: 1,
        textAlign: 'center',
    },
    backIcon: {
        color: 'white',
        fontSize: '24px',
        cursor: 'pointer',
    },
    noEvents: {
        textAlign: 'center',
        color: '#aaaaaa',
        marginTop: '50px',
    }
};