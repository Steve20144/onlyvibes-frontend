// src/components/EventList.jsx
import React from "react";
import EventCard from "./EventCard";

const EventList = ({ events, onLike }) => {
  if (!events || events.length === 0) {
    return <p style={{ color: "var(--text-muted)" }}>No events found.</p>;
  }

  return (
    <>
      {events.map((ev) => (
        <EventCard key={ev.eventId} event={ev} onLike={onLike} />
      ))}
    </>
  );
};

export default EventList;
