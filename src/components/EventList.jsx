// src/components/EventList.jsx
import React from "react";
import EventCard from "./EventCard";

/**
 * Renders a vertical list of EventCards.
 * Handles cases for empty lists or invalid data types gracefully.
 * * @param {object} props - The component props.
 * @param {Array} props.events - The array of event objects to display.
 * @param {function} props.onLike - Handler function passed to each card for the like action.
 * @param {function} props.onEventClick - Handler function for navigating to event details.
 * @returns {JSX.Element} A fragment containing the list of cards or an empty state message.
 */
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