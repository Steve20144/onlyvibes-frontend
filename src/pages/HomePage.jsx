import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventList from "../components/EventList"; 

// --- ALL YOUR DEMO EVENTS ---
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
  {
    eventId: 3,
    title: "Event Name",
    venueName: "Underground Hall",
    distanceKm: 0.3,
    imageUrl: "https://summerrockz.com/wp-content/uploads/2024/03/Lloret-de-Mar-NightLife.jpeg",
    likesCount: 342,
    userHasLiked: false,
  },
  {
    eventId: 4,
    title: "Sunset Vibes",
    venueName: "Beachside Lounge",
    distanceKm: 1.2,
    imageUrl: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
    likesCount: 88,
    userHasLiked: false,
  },
  {
    eventId: 5,
    title: "Techno Bunker",
    venueName: "The Warehouse",
    distanceKm: 2.5,
    imageUrl: "https://images.pexels.com/photos/3754300/pexels-photo-3754300.jpeg",
    likesCount: 720,
    userHasLiked: true,
  },
  {
    eventId: 6,
    title: "Jazz Night",
    venueName: "The Speakeasy",
    distanceKm: 0.8,
    imageUrl: "https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg",
    likesCount: 215,
    userHasLiked: false,
  },
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

const HomePage = () => {
  const navigate = useNavigate(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState(DEMO_EVENTS);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearchQuery(q);
    if (!q) { setEvents(DEMO_EVENTS); return; }
    const filtered = DEMO_EVENTS.filter(ev => ev.title.toLowerCase().includes(q) || ev.venueName.toLowerCase().includes(q));
    setEvents(filtered);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setEvents(DEMO_EVENTS);
  };

  const handleLike = (event) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.eventId === event.eventId) {
          const newLikedState = !e.userHasLiked;
          const newLikesCount = newLikedState ? (e.likesCount || 0) + 1 : (e.likesCount || 0) - 1;
          return { ...e, userHasLiked: newLikedState, likesCount: newLikesCount < 0 ? 0 : newLikesCount };
        }
        return e;
      })
    );
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
      {/* This wrapper makes everything inside it stick to the top */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: '#050016', // Match page background
        paddingTop: '10px',
        paddingLeft: '20px',  // Add padding here
        paddingRight: '20px', // Add padding here
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
          paddingBottom: '15px', // Space below
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
        marginTop: '10px' // Add a little space
      }}>
        <EventList 
           events={events} 
           onLike={handleLike} 
           onEventClick={handleEventClick}
        />
      </div>

    </div>
  );
};

export default HomePage;