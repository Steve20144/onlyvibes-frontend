// src/pages/HomePage.jsx
import React, { useState } from "react";
import SearchHeader from "../components/SearchHeader";
import FilterBar from "../components/FilterBar";
import EventList from "../components/EventList";
import BottomNav from "../components/BottomNav";

// Demo events to visually match the mockup
const DEMO_EVENTS = [
  {
    eventId: 1,
    title: "Event Name",
    venueName: "Big Club Downtown",
    distanceKm: 0.1,
    imageUrl:
      "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg",
    likesCount: 125,
    description:
      "Huge crowd, big room sound and lasers all night long."
  },
  {
    eventId: 2,
    title: "Event Name",
    venueName: "Chandelier Bar",
    distanceKm: 0.4,
    imageUrl:
      "https://images.pexels.com/photos/2102568/pexels-photo-2102568.jpeg",
    likesCount: 543,
    description: "Live band, cocktails and a warm, intimate atmosphere."
  },
  {
    eventId: 3,
    title: "Event Name",
    venueName: "Underground Hall",
    distanceKm: 0.3,
    imageUrl:
      "https://summerrockz.com/wp-content/uploads/2024/03/Lloret-de-Mar-NightLife.jpeg",
    likesCount: 342,
    description: "Crowd-surfing and high-energy performances all night."
  }
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState(DEMO_EVENTS);

  // Local search just filters the demo events
  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setEvents(DEMO_EVENTS);
      return;
    }
    const filtered = DEMO_EVENTS.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.venueName.toLowerCase().includes(q)
    );
    setEvents(filtered);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setEvents(DEMO_EVENTS);
  };

  const handleLike = (event) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.eventId === event.eventId
          ? { ...e, likesCount: (e.likesCount || 0) + 1 }
          : e
      )
    );
  };

  return (
    <div
      className="home-root"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#050016" // dark purple background outside phone
      }}
    >
      {/* Phone frame */}
      <div
        className="phone-frame"
        style={{
          width: 360,
          maxWidth: "100%",
          height: 780,
          borderRadius: 40,
          padding: 10,
          background:
            "radial-gradient(circle at top, #1b0b3a 0%, #050016 55%, #02000b 100%)",
          boxShadow: "0 0 40px rgba(0,0,0,0.8)",
          overflow: "visible",
          position: "relative",
          color: "#fff"
        }}
      >
        {/* Inner content area */}
        <div
          className="phone-content"
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
          }}
        >
          {/* Search bar at the very top */}
          <div style={{ paddingTop: 0, paddingBottom: 2 }}>
            <SearchHeader
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={handleSearch}
            />
          </div>

          {/* Filters row: View All Filters | 22:30 | 1.5km | Clear Filters */}
          <div style={{ padding: "0px 0px 0px" }}>
            <FilterBar
              timeLabel="22:30"
              radiusKm={1.5}
              onClear={handleClearFilters}
            />
          </div>

          {/* Scrollable list of event cards */}
          <div
              className="home-events-scroll"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "0px 4px",
                paddingBottom: "40px", // <-- KEY: space for bottom-nav
              }}
            >
            <EventList events={events} onLike={handleLike} />
          </div>

          {/* Bottom navigation bar */}
          <div
            style={{
              paddingTop: 4,
              paddingBottom: 4
            }}
          >
            <BottomNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
