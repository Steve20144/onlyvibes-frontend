// src/components/OrganizedEventCard.jsx
import React from 'react';
// ΑΦΑΙΡΕΙΤΑΙ ΤΟ HOOK: import { useNavigate } from 'react-router-dom';

// Δέχεται το onCardClick ως prop
const OrganizedEventCard = ({ event, onCardClick }) => {
    // const navigate = useNavigate(); <--- Αφαιρέθηκε
    
    const isCancelled = event.isCancelled;

    return (
        <div 
            // Χρησιμοποιούμε τη συνάρτηση που μας δόθηκε από τον γονέα
            onClick={() => onCardClick(event.id)} 
            style={{
                ...styles.eventCard,
                opacity: isCancelled ? 0.6 : 1,
                borderLeft: isCancelled ? '5px solid #ff6b6b' : '5px solid #fc4a1a'
            }}
        >
            {/* 1. Image */}
            <img 
                src={event.imageUrl} 
                alt={event.title} 
                style={styles.eventImage} 
            />

            {/* 2. Event Details */}
            <div style={styles.eventDetails}>
                <h4 style={styles.eventTitle}>
                    {event.title}
                    {isCancelled && <span style={styles.cancelledTag}> (CANCELLED)</span>}
                </h4>
                <p style={styles.eventMeta}>
                    <span className="material-icons" style={{fontSize: 14, verticalAlign: 'middle', marginRight: 4}}>place</span> 
                    {event.location} | 
                    <span className="material-icons" style={{fontSize: 14, verticalAlign: 'middle', marginLeft: 8, marginRight: 4}}>calendar_today</span> 
                    {new Date(event.dateTime).toLocaleDateString()}
                </p>
            </div>

            {/* 3. Edit Icon (Visual cue) */}
            <span 
                className="material-icons" 
                style={styles.editIcon} 
                title="Edit Event"
            >
                edit
            </span>
        </div>
    );
};

// --- Styles for the Organized Event Card ---
const styles = {
    eventCard: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1e1330', // Card Dark
        borderRadius: '10px',
        marginBottom: '15px',
        padding: '10px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },
    eventImage: {
        width: '60px',
        height: '60px',
        borderRadius: '5px',
        objectFit: 'cover',
        marginRight: '15px',
        flexShrink: 0,
    },
    eventDetails: {
        flexGrow: 1,
    },
    eventTitle: {
        margin: 0,
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white',
    },
    eventMeta: {
        margin: 0,
        fontSize: '12px',
        color: '#aaaaaa',
        display: 'flex',
        alignItems: 'center',
    },
    editIcon: {
        color: '#fc4a1a', // Secondary color
        fontSize: '24px',
        marginLeft: '15px',
        flexShrink: 0,
    },
    cancelledTag: {
        fontSize: '12px',
        color: '#ff6b6b',
        fontWeight: 'normal',
        marginLeft: '5px',
    },
};

export default OrganizedEventCard;