import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventList from "../components/EventList"; 
import { getEvents, likeEvent } from "../api/events"; // Assuming file is eventService.js
import { alert } from "../components/PopupDialog";

// No longer need static DEMO_EVENTS
// const DEMO_EVENTS = [...]; 

const HomePage = () => {
  const navigate = useNavigate(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]); // Start with empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- API CALL: Fetch events on component mount/filter change ---
  const loadEvents = async (filters = {}) => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await getEvents(filters);
      setEvents(data || []); // Ensure it's an array
    } catch (err) {
      console.error("Failed to load events:", err);
      setError(err.message || "Could not load events from server.");
      // Use the custom alert popup
      await alert("Failed to load events. Please check the network.", "Error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []); // Load initial events

  // --- API CALL: Handle dynamic search/filtering ---
  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    
    // Trigger a new API call with the search query
    loadEvents({ q: q.trim() });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    // Reload all events without filters
    loadEvents();
  };

  // --- API CALL: Handle liking/unliking ---
  const handleLike = async (event) => {
    const { eventId, userHasLiked } = event;
    
    // Optimistic UI Update: Update state first for responsiveness
    setEvents((prev) =>
      prev.map((e) => {
        if (e.eventId === eventId) {
          const newLikedState = !userHasLiked;
          const newLikesCount = newLikedState ? (e.likesCount || 0) + 1 : (e.likesCount || 0) - 1;
          return { ...e, userHasLiked: newLikedState, likesCount: newLikesCount < 0 ? 0 : newLikesCount };
        }
        return e;
      })
    );

    try {
      // API Call: Toggle the like status
      await likeEvent(eventId);
    } catch (error) {
      console.error("Like failed, reverting UI:", error);
      // Revert the UI state if API fails
      setEvents((prev) =>
        prev.map((e) => (e.eventId === eventId ? { ...e, userHasLiked: userHasLiked, likesCount: e.likesCount } : e))
      );
      await alert("Failed to toggle like status.", "Error");
    }
  };
  
  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  // --- Render Logic ---
  const renderContent = () => {
    if (isLoading) {
      return <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>Loading vibes...</div>;
    }
    if (error) {
      return <div style={{ color: '#ff6666', padding: '20px', textAlign: 'center' }}>Error: {error}</div>;
    }
    if (events.length === 0 && searchQuery) {
      return <div style={{ color: '#ccc', padding: '20px', textAlign: 'center' }}>No events found matching "{searchQuery}".</div>;
    }
    if (events.length === 0) {
      return <div style={{ color: '#ccc', padding: '20px', textAlign: 'center' }}>No events available right now.</div>;
    }
    
    return (
      <EventList 
         events={events} 
         onLike={handleLike} 
         onEventClick={handleEventClick}
      />
    );
  };

  return (
    <div style={{ 
      width: '100%', 
      height: 'auto', 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      
      {/* --- 1. STICKY HEADER --- */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: '#050016', 
        paddingTop: '10px',
        paddingLeft: '20px', 
        paddingRight: '20px', 
        boxSizing: 'border-box',
      }}>
        {/* Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
          <input 
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            style={{
              width: '100%', maxWidth: '300px', padding: '10px 15px', borderRadius: '20px',
              border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white',
              textAlign: 'center', outline: 'none', fontSize: '16px'
            }}
          />
        </div>

        {/* Filter Row */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingBottom: '15px',
          color: '#ccc', 
          fontSize: '13px' 
        }}>
          <button style={{ background: 'none', border: '1px solid #555', borderRadius: '10px', color: 'white', padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}>Filters</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span>🕒</span> 22:30</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span>📍</span> 1.5 km</div>
          <button onClick={handleClearFilters} style={{ background: 'rgba(255,0,0,0.2)', border: 'none', borderRadius: '10px', color: '#ff9999', padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}>Clear</button>
        </div>
      </div>

      {/* --- 2. SCROLLABLE EVENT LIST --- */}
      <div style={{ 
        width: '100%', 
        paddingBottom: '80px',
        paddingLeft: '20px',
        paddingRight: '20px',
        boxSizing: 'border-box',
        marginTop: '10px'
      }}>
        {renderContent()}
      </div>

    </div>
  );
};

export default HomePage;