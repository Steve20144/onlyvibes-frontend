import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventList from "../components/EventList"; 

// --- ALL YOUR DEMO EVENTS ---
// We still need the full list to get the initial data
const DEMO_EVENTS = [
  {
    eventId: 1,
    title: "Event Name",
    venueName: "Big Club Downtown",
    distanceKm: 0.1,
    imageUrl: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg",
    likesCount: 125,
    userHasLiked: false, 
  },
  {
    eventId: 2,
    title: "Event Name",
    venueName: "Chandelier Bar",
    distanceKm: 0.4,
    imageUrl: "https://images.pexels.com/photos/2102568/pexels-photo-2102568.jpeg",
    likesCount: 543,
    userHasLiked: true, 
  },
  // ... (all your other events) ...
  {
    eventId: 7,
    title: "Rooftop Party",
    venueName: "Sky Garden",
    distanceKm: 1.0,
    imageUrl: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
    likesCount: 430,
    userHasLiked: false,
  },
];

// 1. RENAMED COMPONENT
const LikedEventsPage = () => {
  const navigate = useNavigate(); 
  
  // 2. FILTERED INITIAL STATE
  // This state holds the "master list" of liked events for this page
  const [likedEvents, setLikedEvents] = useState(
    DEMO_EVENTS.filter(e => e.userHasLiked)
  );
  
  // This state holds what is actually *shown* (after search)
  const [displayedEvents, setDisplayedEvents] = useState(likedEvents);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearchQuery(q);
    if (!q) {
      setDisplayedEvents(likedEvents); // Reset to full liked list
      return; 
    }
    // Filter from the liked list, not the full demo list
    const filtered = likedEvents.filter(ev => ev.title.toLowerCase().includes(q) || ev.venueName.toLowerCase().includes(q));
    setDisplayedEvents(filtered);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setDisplayedEvents(likedEvents); // Reset to full liked list
  };

  // 3. MODIFIED 'handleLike'
  // On this page, "onLike" means "unlike and remove from this list"
  const handleLike = (event) => {
    // Note: This only removes it from this page's view.
    // It doesn't update the "master" DEMO_EVENTS list.
    
    // Update the master liked list
    const newLikedList = likedEvents.filter(e => e.eventId !== event.id);
    setLikedEvents(newLikedList);
    
    // Update the *displayed* list
    setDisplayedEvents(prev => prev.filter(e => e.eventId !== event.id));
  };
  
  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div style={{ 
      width: '100%', 
      height: 'auto', 
      display: 'flex', 
      flexDirection: 'column',
    }}>
      
      {/* --- 1. STICKY HEADER --- */}
      {/* We can change this later if you want a "Back" button */}
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
            placeholder="Search liked events..." // Changed placeholder
            value={searchQuery}
            onChange={handleSearch}
            style={{
              width: '100%', maxWidth: '300px', padding: '10px 15px', borderRadius: '20px',
              border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white',
              textAlign: 'center', outline: 'none', fontSize: '16px'
            }}
          />
        </div>

        {/* Filter Row - You might want to remove this for this page */}
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
        {displayedEvents.length > 0 ? (
          <EventList 
            events={displayedEvents} // Pass the correct state
            onLike={handleLike} 
            onEventClick={handleEventClick}
          />
        ) : (
          <p style={{ color: '#888', textAlign: 'center' }}>You haven't liked any events yet.</p>
        )}
      </div>

    </div>
  );
};

export default LikedEventsPage; // Don't forget to change the export