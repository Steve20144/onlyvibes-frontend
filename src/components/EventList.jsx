// src/components/EventList.jsx
import React from "react";
import EventCard from "./EventCard";

const EventList = ({ events, onLike, onEventClick }) => {
  if (!events || events.length === 0) {
    return <p style={{ color: "var(--text-muted)" }}>No events found.</p>;
  }
  if (!Array.isArray(events)) {
        console.error("EventList received invalid data:", events);
        return <div>Error loading events.</div>; 
    }

  return (
    <>
      {events.map((ev) => (
        <EventCard 
            key={ev.id} 
            event={ev} 
            onLike={onLike}
            onClick={() => onEventClick(ev.id)} 
        />
      ))}
    </>
  );
};

export default EventList;