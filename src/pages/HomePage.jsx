import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import this
import EventList from "../components/EventList"; // Keeping your original component

// ... (Keep your DEMO_EVENTS array exactly as it was) ...
// I won't paste the array here to save space, keep your existing one.
const DEMO_EVENTS = [ 
  /* ... keep your existing events ... */ 
  { eventId: 1, title: "Event Name", venueName: "Big Club Downtown", distanceKm: 0.1, imageUrl: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg", likesCount: 125 },
  { eventId: 2, title: "Event Name", venueName: "Chandelier Bar", distanceKm: 0.4, imageUrl: "https://images.pexels.com/photos/2102568/pexels-photo-2102568.jpeg", likesCount: 543 },
  { eventId: 3, title: "Event Name", venueName: "Underground Hall", distanceKm: 0.3, imageUrl: "https://summerrockz.com/wp-content/uploads/2024/03/Lloret-de-Mar-NightLife.jpeg", likesCount: 342 },
  { eventId: 4, title: "Extra Event", venueName: "Scroll Test", distanceKm: 0.5, imageUrl: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg", likesCount: 10 },
  { eventId: 5, title: "Another Event", venueName: "Scroll Test", distanceKm: 0.9, imageUrl: "https://images.pexels.com/photos/2102568/pexels-photo-2102568.jpeg", likesCount: 22 }
];

const HomePage = () => {
  const navigate = useNavigate(); // 2. Initialize Hook
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
    setEvents((prev) => prev.map((e) => e.eventId === event.eventId ? { ...e, likesCount: (e.likesCount || 0) + 1 } : e));
  };

  // 3. Define the helper function
  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', paddingTop: '10px' }}>
      
      {/* Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px', padding: '0 20px' }}>
        <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch} style={{ width: '100%', maxWidth: '300px', padding: '10px 15px', borderRadius: '20px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', textAlign: 'center', outline: 'none', fontSize: '16px' }} />
      </div>

      {/* Filter Row */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px 15px 20px', color: '#ccc', fontSize: '13px' }}>
        <button style={{ background: 'none', border: '1px solid #555', borderRadius: '10px', color: 'white', padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}>Filters</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span>🕒</span> 22:30</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span>📍</span> 1.5 km</div>
        <button onClick={handleClearFilters} style={{ background: 'rgba(255,0,0,0.2)', border: 'none', borderRadius: '10px', color: '#ff9999', padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}>Clear</button>
      </div>

      {/* 4. PASS THE FUNCTION HERE */}
      {/* We keep your EventList component so your styles stay perfect */}
      <div style={{ width: '100%', paddingBottom: '80px' }}>
        <EventList 
           events={events} 
           onLike={handleLike} 
           onEventClick={handleEventClick} // <--- PASSING IT DOWN
        />
      </div>

    </div>
  );
};

export default HomePage;