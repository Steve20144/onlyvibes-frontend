// src/pages/EditEventPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEventDetails, updateEventDetails } from '../api/events'; 

export const EditEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', description: '', location: '', dateTime: '' });
  const [isSaving, setIsSaving] = useState(false);

  // Load existing event data 
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await fetchEventDetails(eventId);
        setEvent(data);
        
        // Format the date/time for the HTML input field
        const formattedDateTime = data.dateTime ? new Date(data.dateTime).toISOString().substring(0, 16) : ''; 

        setFormData({
            title: data.title || '',
            description: data.description || '',
            location: data.location || '',
            dateTime: formattedDateTime
        });
      } catch (error) {
        console.error("Error loading event for edit:", error);
        setEvent(null); 
        alert('Could not load event.');
      } finally {
        setIsLoading(false);
      }
    };
    loadEvent();
  }, [eventId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Save (PUT /events/{eventId})
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    if (!formData.title || !formData.location || !formData.dateTime) {
        alert("Title, Location, and Date/Time are required.");
        setIsSaving(false);
        return;
    }

    try {
        const updatedEvent = await updateEventDetails(eventId, {
            ...formData,
            category: event.category, 
            creatorId: event.creatorId,
            imageUrl: event.imageUrl 
        });
        
        alert(`Event ${updatedEvent.title} updated successfully!`);
        navigate(`/events/${eventId}`); 
        
    } catch (error) {
        console.error("Error saving event:", error);
        alert('Failed to save changes: ' + error.message);
    } finally {
        setIsSaving(false);
    }
  };

  if (isLoading) return <div style={styles.pageContainer}>Loading event data...</div>;
  if (!event) return <div style={styles.pageContainer}>Event not found.</div>;

  return (
    <div style={styles.pageContainer}>
      
      {/* HEADER BAR (Back Arrow & Debug Status) */}
      <div style={styles.headerBar}>
        <span className="material-icons" style={styles.backIcon} onClick={() => navigate(-1)}>arrow_back</span>
        <span style={styles.debugStatus}>Debug: OFF</span>
      </div>

      <form onSubmit={handleSave} style={styles.formContainer}>
        
        {/* PHOTO GALLERY AREA (Mockup) */}
        <div style={styles.photoGallery}>
            <div style={styles.photoGrid}>
                {event.photos && event.photos.slice(0, 6).map((p, i) => (
                    <img key={i} src={`https://picsum.photos/120/120?random=${eventId}-${i}`} alt={`Event photo ${i+1}`} style={styles.photoItem}/>
                ))}
            </div>
            {/* Edit Photos Button */}
            <button type="button" style={styles.editPhotosButton}>Edit Photos</button>
        </div>
        
        {/* 1. TITLE INPUT (Styled to match mockup) */}
        <div style={styles.inputGroup}>
            <label htmlFor="title" style={styles.smallLabel}>Title</label>
            <input 
                id="title" 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                style={styles.titleInput} 
                placeholder="Enter event title"
            />
        </div>
        
        {/* 2. DESCRIPTION INPUT (Mockup) */}
        <div style={styles.inputGroup}>
            <label htmlFor="description" style={styles.label}>Description</label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                style={styles.descriptionTextarea} 
            />
        </div>

        {/* 3. LOCATION FIELD (Mockup List Item) */}
        <div style={styles.menuItem} onClick={() => console.log('Open Location Picker')}>
            <span className="material-icons" style={styles.menuIconWhite}>place</span> 
            <span style={styles.menuText}>{formData.location || 'Select Location'}</span>
            <span className="material-icons" style={styles.menuChevron}>chevron_right</span>
        </div>
        
        <div style={styles.divider} />
        
        {/* 4. DATE & TIME FIELD (Mockup List Item) */}
        <div style={styles.menuItem} onClick={() => console.log('Open Date Picker')}>
            <span className="material-icons" style={styles.menuIconWhite}>calendar_today</span> 
            {/* Display formatted date/time */}
            <span style={styles.menuText}>{formData.dateTime ? new Date(formData.dateTime).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '') : 'Select Date & Time'}</span>
            <span className="material-icons" style={styles.menuChevron}>chevron_right</span>
        </div>
        
        <div style={styles.divider} />

        {/* 5. CATEGORIES FIELD (Mockup List Item) */}
        <div style={styles.menuItem} onClick={() => console.log('Open Category Picker')}>
            <span className="material-icons" style={styles.menuIconWhite}>list</span> 
            <span style={styles.menuText}>See Categories</span>
            {/* ΔΙΟΡΘΩΣΗ: Προσθήκη του chevron_right */}
            <span className="material-icons" style={styles.menuChevron}>chevron_right</span>
        </div>
        
        <div style={styles.divider} />
        
        {/* SAVE BUTTON */}
        <button type="submit" className="btn btn-primary full-width" disabled={isSaving} style={styles.saveButton}>
          {/* ΔΙΟΡΘΩΣΗ: Αφαίρεση του endpoint */}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
      
      {/* Footer Navigation (for visual completion) */}
      <div style={styles.bottomNavPlaceholder}>
        <span className="material-icons">home</span>
        <span className="material-icons">search</span>
        <span className="material-icons">person</span>
      </div>
    </div>
  );
};


// --- Styles (Inline/Object Styles for clarity) ---
const styles = {
    pageContainer: {
        backgroundColor: '#120a24',
        minHeight: '100vh',
        color: 'white',
        paddingBottom: '80px',
    },
    headerBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        backgroundColor: '#1e1330', // Dark bar
    },
    backIcon: {
        color: 'white',
        fontSize: '24px',
        cursor: 'pointer',
    },
    debugStatus: {
        color: '#a8a8a8',
        fontSize: '12px',
    },
    formContainer: {
        padding: '0 20px',
    },
    photoGallery: {
        position: 'relative',
        marginBottom: '20px',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    photoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2px',
        height: '250px', 
    },
    photoItem: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    editPhotosButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px 20px',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        fontWeight: 'bold',
        backdropFilter: 'blur(5px)',
        cursor: 'pointer',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    smallLabel: {
        fontSize: '12px',
        color: '#ccc',
        display: 'block',
        marginBottom: '5px',
    },
    label: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white',
        display: 'block',
        marginBottom: '5px',
    },
    // Styles for Title Input to mimic the mockup's underlined title area
    titleInput: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid #4a2c73', 
        padding: '5px 0',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '10px',
        outline: 'none',
    },
    descriptionTextarea: {
        width: '100%',
        backgroundColor: '#1e1330',
        color: 'white',
        border: '1px solid #4a2c73', 
        borderRadius: '8px',
        padding: '10px',
        resize: 'none',
        boxSizing: 'border-box',
        fontSize: '14px',
        lineHeight: 1.5,
    },
    // Styles for List Items (Location, Date, Category)
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 0',
        cursor: 'pointer',
    },
    menuIconWhite: {
        fontSize: '20px',
        color: 'white', // Λευκό
        marginRight: '15px',
    },
    menuText: {
        flex: 1,
        fontSize: '16px',
        color: 'white',
    },
    menuChevron: {
        color: 'white', // Λευκό βέλος
        marginLeft: 'auto',
    },
    divider: {
        height: '1px',
        backgroundColor: '#1e1330',
        margin: '0 0',
    },
    saveButton: {
        marginTop: '30px',
        padding: '15px',
        borderRadius: '30px',
        // ΔΙΟΡΘΩΣΗ: Αλλαγή χρώματος σε Μοβ/Vibe
        backgroundColor: '#6b48ff', 
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16px',
        width: '100%',
        border: 'none',
        cursor: 'pointer',
    },
    bottomNavPlaceholder: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        maxWidth: '450px',
        height: '60px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1e1330',
        borderTop: '1px solid #222',
        zIndex: 999,
        color: 'white',
        fontSize: '24px'
    }
};