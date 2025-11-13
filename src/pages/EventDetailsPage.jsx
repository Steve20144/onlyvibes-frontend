// src/pages/EventDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getEventById } from "../api/events";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getEventById(eventId);
        setEvent(data);
      } catch (e) {
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [eventId]);

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <div className="phone-content">
          <div className="phone-scroll">
            <button
              type="button"
              className="button button-outline"
              style={{ marginBottom: 12 }}
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>

            <ErrorMessage message={error} />
            {loading && <Loader />}
            {!loading && event && (
              <>
                <img
                  src={
                    event.imageUrl ||
                    "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg"
                  }
                  alt={event.title}
                  style={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                    borderRadius: 18,
                    marginBottom: 12
                  }}
                />
                <h2 style={{ margin: "4px 0 4px" }}>{event.title}</h2>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    margin: "0 0 10px"
                  }}
                >
                  {event.location} •{" "}
                  {event.dateTime
                    ? new Date(event.dateTime).toLocaleString()
                    : "Time TBA"}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-primary)",
                    lineHeight: 1.5
                  }}
                >
                  {event.description || "No description provided."}
                </p>
              </>
            )}
          </div>
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
