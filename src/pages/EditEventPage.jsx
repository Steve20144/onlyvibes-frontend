// src/pages/EditEventPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEventDetails, updateEventDetails } from '../api/eventService'; 

export const EditEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', description: '', location: '', dateTime: '' });
  const [isSaving, setIsSaving] = useState(false);

  // Load existing event data (Given I have an existing event)
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await fetchEventDetails(eventId);
        setEvent(data);
        setFormData({
            title: data.title || '',
            description: data.description || '',
            location: data.location || '',
            dateTime: data.dateTime ? data.dateTime.substring(0, 16) : '' // Format for datetime-local
        });
      } catch (error) {
        console.error("Error loading event for edit:", error);
        alert('Could not load event.');
      } finally {
        setIsLoading(false);
      }
    };
    loadEvent();
  }, [eventId]);

  // Handle input change (And I change the event details)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Save (Then I save the changes)
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
        
        // And the new event details must be displayed
        alert(`Event ${updatedEvent.title} updated successfully!`);
        navigate(`/events/${eventId}`); // Redirect back to details page
        
    } catch (error) {
        console.error("Error saving event:", error);
        alert('Failed to save changes.');
    } finally {
        setIsSaving(false);
    }
  };

  if (isLoading) return <div className="page-container">Loading event data...</div>;
  if (!event) return <div className="page-container">Event not found.</div>;

  return (
    <div className="page-container edit-event-page">
      <h1 className="page-title">Edit Event Details</h1>
      
      <form onSubmit={handleSave} className="edit-form">
        
        {/* Mockup: Photo Gallery */}
        <div className="photo-gallery" style={{marginBottom: '20px', position: 'relative'}}>
            {/* Display first 6 photos or placeholders */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px'}}>
                {event.photos && event.photos.slice(0, 6).map((p, i) => (
                    <img key={i} src={`https://picsum.photos/100/100?random=${eventId}-${i}`} alt={`Event photo ${i+1}`} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                ))}
            </div>
            <div className="edit-photos-overlay" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <button type="button" className="btn btn-secondary">Edit Photos</button>
            </div>
        </div>

        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          className="review-input" 
        />

        <div className="info-item location-edit" onClick={() => console.log('Open Location Picker')}>
            <span className="material-icons">place</span> 
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              style={{border: 'none', background: 'none', color: 'white', width: '80%'}}
              placeholder="Location"
            />
            <span className="material-icons arrow">chevron_right</span>
        </div>

        <div className="info-item datetime-edit" onClick={() => console.log('Open Date Picker')}>
            <span className="material-icons">calendar_today</span> 
            <input 
              type="datetime-local" 
              name="dateTime" 
              value={formData.dateTime} 
              onChange={handleChange} 
              style={{border: 'none', background: 'none', color: 'white', width: '80%'}}
            />
            <span className="material-icons arrow">chevron_right</span>
        </div>
        
        <div className="info-item categories" onClick={() => console.log('Open Category Picker')}>
            <span className="material-icons">list</span> 
            <p>See Categories</p>
            <span className="material-icons arrow">chevron_right</span>
        </div>
        
        <button type="submit" className="btn btn-primary full-width" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes (PUT /events)'}
        </button>
      </form>
    </div>
  );
};