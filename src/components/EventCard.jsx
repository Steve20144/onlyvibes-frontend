import React from "react";
import { useNavigate } from "react-router-dom";

const RADIUS = 26;

const EventCard = ({ event, onLike }) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/events/${event.eventId}`);
  };

  const distanceKm = event.distanceKm ?? 0.3;
  const likes = event.likesCount ?? event.likes ?? 0;

  return (
    <div
      onClick={handleOpen}
      style={{
        marginBottom: 22,
        borderRadius: RADIUS,
        overflow: "hidden", // THIS is the magic that rounds EVERYTHING
        position: "relative",
        backgroundColor: "#000",
        boxShadow: "0 16px 40px rgba(0,0,0,0.55)",
        cursor: "pointer",
      }}
    >
      {/* FULLY CLIPPED IMAGE */}
      <img
        src={
          event.imageUrl ||
          "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg"
        }
        alt={event.title}
        style={{
          width: "100%",
          height: 230,
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* TOP-LEFT DISTANCE PILL */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          padding: "5px 10px",
          borderRadius: 999,
          background: "rgba(0,0,0,0.65)",
          color: "white",
          fontSize: 12,
          display: "flex",
          gap: 6,
          alignItems: "center",
        }}
      >
        <span>📍</span>
        <span>{distanceKm.toFixed(1)} km</span>
      </div>

      {/* TOP-RIGHT SHARE */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          window.navigator.share?.({
            title: event.title,
            url: window.location.href,
          });
        }}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.65)",
          color: "white",
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
          backdropFilter: "blur(4px)",
        }}
      >
        ⤴️
      </button>

      {/* BOTTOM BAR — ALSO ROUNDED VIA PARENT CLIPPING */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "14px 18px",
          background: "#0a0227d0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LIKE */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike?.(event);
          }}
          style={{
            border: "none",
            background: "transparent",
            color: "white",
            display: "flex",
            gap: 6,
            alignItems: "center",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          <span style={{ color: "#ff5ba5", fontSize: 18 }}>❤</span>
          <span>{likes}</span>
        </button>

        {/* TITLE */}
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: 600,
            fontSize: 15,
            color: "white",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            padding: "0 10px",
          }}
        >
          {event.title}
        </div>

        {/* BELL */}
        <button
          onClick={(e) => e.stopPropagation()}
          style={{
            border: "none",
            background: "transparent",
            color: "white",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          🔔
        </button>
      </div>
    </div>
  );
};

export default EventCard;