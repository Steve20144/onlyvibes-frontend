// src/components/EventList.jsx
import React from "react";
import EventCard from "./EventCard";

// 1. Accept 'onEventClick' here
const EventList = ({ events, onLike, onEventClick }) => {
  if (!events || events.length === 0) {
    return <p style={{ color: "var(--text-muted)" }}>No events found.</p>;
  }

  return (
    <>
      {events.map((ev) => (
        <EventCard 
            key={ev.eventId} 
            event={ev} 
            onLike={onLike}
            
            // 2. Pass it down to the Card component
            onClick={() => onEventClick(ev.eventId)} 
        />
      ))}
    </>
  );
};

export default EventList;