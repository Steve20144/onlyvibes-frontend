import React, { useState } from "react";
import { Heart, MapPin, Upload, Bell } from 'lucide-react'; 

const EventCard = ({ event, onLike, onClick }) => {
  const [bellActive, setBellActive] = useState(false);
  const isLiked = event.userHasLiked; 
  const likes = event.likesCount ?? 0;
  
  const handleBellClick = (e) => {
    e.stopPropagation();
    setBellActive(!bellActive);
  };

  return (
    <div
      onClick={onClick}
      style={{
        marginBottom: 22,
        borderRadius: 20,
        overflow: "hidden", 
        position: "relative",
        backgroundColor: '#000', 
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        cursor: "pointer",
      }}
    >
      {/* IMAGE */}
      <img
        src={
          event.imageUrl ||
          "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg"
        }
        alt={event.title}
        style={{
          width: "100%",
          height: 230, // 1. MADE CARD TALLER (was 200)
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
          background: "rgba(0,0,0,0.6)",
          color: "white",
          fontSize: 12,
          display: "flex",
          gap: 6,
          alignItems: "center",
          backdropFilter: "blur(8px)",
        }}
      >
        <MapPin size={14} />
        <span>{event.distanceKm?.toFixed(1) ?? 0.3} km</span>
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
          // 2. REMOVED BACKGROUND
          background: "transparent", 
          color: "white",
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
          // 3. REMOVED backdropFilter
        }}
      >
        <Upload size={16} />
      </button>

      {/* BOTTOM BAR */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "14px 18px",
          // 4. PURPLE TINTED BAR
          background: "linear-gradient(to top, rgba(10, 2, 39, 0.7), rgba(10, 2, 39, 0.5))",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LIKE BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike?.(event);
          }}
          style={{
            border: "none",
            background: "transparent",
            color: isLiked ? "#00d2ff" : "white",
            display: "flex",
            gap: 6,
            alignItems: "center",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          <Heart 
            size={18} 
            fill={isLiked ? "#00d2ff" : "none"}
          />
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

        {/* BELL BUTTON */}
        <button
          onClick={handleBellClick}
          style={{
            border: "none",
            background: "transparent",
            color: bellActive ? "#00d2ff" : "white",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          <Bell 
            size={18} 
            fill={bellActive ? "#00d2ff" : "none"}
          />
        </button>
      </div>
    </div>
  );
};

export default EventCard;