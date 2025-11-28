import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_EVENTS } from '../api/mockData';
import { getCurrentUserId } from '../api/auth';

import OrganizedEventCard from '../components/OrganizedEventCard'; 

export const OrganizedEventsPage = () => {
    const navigate = useNavigate();
    const currentUserId = getCurrentUserId(); 
    
    const [organizedEvents, setOrganizedEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const events = MOCK_EVENTS.filter(event => 
            event.creatorId === 3 
        ); 
        
        events.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

        setOrganizedEvents(events);
        setIsLoading(false);
    }, [currentUserId]);
    
    const handleCardClick = (id) => {
        navigate(`/profile/events/${id}/edit`);
    };

    if (isLoading) return <div className="page-container">Loading Organized Events...</div>;
    
    return (
        <div className="page-container organized-events-page" style={styles.pageContainer}>
            {/* Header with Back Button */}
            <div style={styles.header}>
                <span className="material-icons" style={styles.backIcon} onClick={() => navigate('/profile')}>arrow_back</span>
                <h1 style={styles.title}>Your Organized Events</h1>
                <div style={{width: '24px'}}></div> 
            </div>
            
            {organizedEvents.length > 0 ? (
                organizedEvents.map(event => (
                    <OrganizedEventCard 
                        key={event.id} 
                        event={event} 
                        onCardClick={handleCardClick} 
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