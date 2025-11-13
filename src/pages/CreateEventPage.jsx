// src/pages/CreateEventPage.jsx
import React, { useState } from "react";
import BottomNav from "../components/BottomNav";
import EventForm from "../components/EventForm";
import ErrorMessage from "../components/ErrorMessage";
import { createEvent } from "../api/events";

const CreateEventPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      // OnlyVibes backend expects EventCreate model
      await createEvent({
        title: values.title,
        description: values.description,
        category: values.category,
        dateTime: values.dateTime,
        location: values.location,
        imageUrl: values.imageUrl || undefined
      });

      setSuccess("Your event has been created!");
    } catch (e) {
      setError("Failed to create event.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <div className="phone-content">
          <div className="phone-scroll">
            <div
              style={{
                marginBottom: 16,
                borderRadius: 24,
                background: "#130828",
                height: 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px dashed var(--border-subtle)"
              }}
            >
              <button
                type="button"
                className="button button-outline"
                style={{ borderRadius: 999 }}
              >
                Upload Photos
              </button>
            </div>

            <ErrorMessage message={error} />
            {success && (
              <div
                style={{
                  background: "rgba(0,210,255,0.08)",
                  border: "1px solid var(--accent)",
                  color: "#fff",
                  borderRadius: 8,
                  padding: 8,
                  fontSize: 13,
                  marginBottom: 12
                }}
              >
                {success}
              </div>
            )}

            <EventForm onSubmit={handleSubmit} submitting={submitting} />
          </div>
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
