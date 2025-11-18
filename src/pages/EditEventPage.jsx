// src/pages/EditEventPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEventDetails, updateEventDetails } from '../api/eventService'; 
import { confirm, alert } from '../components/PopupDialog'; // <--- NEW IMPORT

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
        
        // REPLACED: Native alert
        await alert('Could not load event data from the server.', 'Error');
        navigate(-1); // Go back if we can't load
      } finally {
        setIsLoading(false);
      }
    };
    loadEvent();
  }, [eventId, navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Save (PUT /events/{eventId})
  const handleSave = async (e) => {
    e.preventDefault();
    
    // 1. Validation Popup
    if (!formData.title || !formData.location || !formData.dateTime) {
        await alert("Title, Location, and Date/Time are required.", "Missing Fields");
        return;
    }

    // 2. Confirmation Popup (Safety Check)
    const isConfirmed = await confirm(
        "Are you sure you want to update this event with these details?",
        "Save Changes?"
    );
    
    if (!isConfirmed) return;

    setIsSaving(true);

    try {
        // Send the complete payload
        const updatedEvent = await updateEventDetails(eventId, {
            ...formData,
            category: event.category, 
            creatorId: event.creatorId,
            imageUrl: event.imageUrl 
        });
        
        // 3. Success Popup
        await alert(`Event "${updatedEvent.title}" updated successfully!`, "Success");
        
        navigate(`/events/${eventId}`); 
        
    } catch (error) {
        console.error("Error saving event:", error);
        // 4. Error Popup
        await alert('Failed to save changes: ' + error.message, "Error");
    } finally {
        setIsSaving(false);
    }
  };

  // --- HELPER FOR MOCK FEATURES ---
  const handleMockFeature = async (featureName) => {
    await alert(`The <b>${featureName}</b> feature is coming soon!`, "Under Construction");
  };

  if (isLoading) return <div className="page-container" style={{color:'white', padding:'20px'}}>Loading event data...</div>;
  if (!event) return <div className="page-container" style={{color:'white', padding:'20px'}}>Event not found.</div>;

  return (
    <div className="page-container edit-event-page">
      <h1 className="page-title" style={{color:'white', marginBottom:'20px'}}>Edit Event Details</h1>
      
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
            <div className="edit-photos-overlay" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => handleMockFeature("Photo Editor")}
                >
                    Edit Photos
                </button>
            </div>
        </div>

        <label htmlFor="title" style={{color:'#ccc'}}>Title</label>
        <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} style={inputStyle} />

        <label htmlFor="description" style={{color:'#ccc'}}>Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          className="review-input" 
          style={{...inputStyle, height:'auto'}}
        />

        <div className="info-item location-edit" onClick={() => handleMockFeature("Location Picker")} style={rowStyle}>
            <span className="material-icons" style={{color:'white'}}>place</span> 
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              style={{border: 'none', background: 'none', color: 'white', width: '80%', outline:'none'}}
              placeholder="Location"
              onClick={(e) => e.stopPropagation()} // Allow typing without triggering popup
            />
            <span className="material-icons arrow" style={{color:'#666'}}>chevron_right</span>
        </div>

        <div className="info-item datetime-edit" onClick={() => handleMockFeature("Date Picker UI")} style={rowStyle}>
            <span className="material-icons" style={{color:'white'}}>calendar_today</span> 
            <input 
              type="datetime-local" 
              name="dateTime" 
              value={formData.dateTime} 
              onChange={handleChange} 
              style={{border: 'none', background: 'none', color: 'white', width: '80%', outline:'none', colorScheme:'dark'}}
              onClick={(e) => e.stopPropagation()} 
            />
            <span className="material-icons arrow" style={{color:'#666'}}>chevron_right</span>
        </div>

        {/* 3. LOCATION FIELD (Mockup List Item) */}
        <div style={styles.menuItem} onClick={() => console.log('Open Location Picker')}>
            <span className="material-icons" style={styles.menuIconWhite}>place</span> 
            <span style={styles.menuText}>{formData.location || 'Select Location'}</span>
            <span className="material-icons" style={styles.menuChevron}>chevron_right</span>
        </div>
        
        <div style={styles.divider} />
        
        <div className="info-item categories" onClick={() => handleMockFeature("Category Selector")} style={rowStyle}>
            <span className="material-icons" style={{color:'white'}}>list</span> 
            <p style={{margin:0, color:'white'}}>See Categories</p>
            <span className="material-icons arrow" style={{color:'#666'}}>chevron_right</span>
        </div>
        
        <button type="submit" className="btn btn-primary full-width" disabled={isSaving} style={{marginTop:'20px', padding:'15px', background:'#6C63FF', color:'white', border:'none', borderRadius:'12px', width:'100%', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}}>
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

// Added some basic inline styles to ensure it renders decently if CSS is missing
const inputStyle = {
    width: '100%',
    padding: '12px',
    background: '#1a1a2e',
    border: '1px solid #333',
    borderRadius: '8px',
    color: 'white',
    marginBottom: '15px',
    marginTop: '5px'
};

const rowStyle = {
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px', 
    padding: '15px', 
    background: '#1a1a2e', 
    borderRadius: '12px', 
    marginBottom: '10px',
    cursor: 'pointer'
};