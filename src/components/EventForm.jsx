// src/components/EventForm.jsx
import React, { useState } from "react";

const initialState = {
  title: "",
  description: "",
  category: "",
  dateTime: "",
  location: "",
  imageUrl: ""
};

const EventForm = ({ onSubmit, submitting }) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!values.title.trim()) e.title = "Title is required";
    if (!values.category.trim()) e.category = "Category is required";
    if (!values.dateTime.trim()) e.dateTime = "Date & time are required";
    if (!values.location.trim()) e.location = "Location is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="form-label">Title</div>
        <input
          className="form-input"
          placeholder="Insert the name of the event..."
          value={values.title}
          onChange={handleChange("title")}
        />
        {errors.title && <div className="form-error">{errors.title}</div>}
      </div>

      <div className="form-group">
        <div className="form-label">Description</div>
        <textarea
          className="form-textarea"
          placeholder="Write a few words about your event..."
          value={values.description}
          onChange={handleChange("description")}
        />
      </div>

      <div className="form-group">
        <div className="form-label">Venue Name</div>
        <input
          className="form-input"
          placeholder="Venue Name"
          value={values.location}
          onChange={handleChange("location")}
        />
        {errors.location && <div className="form-error">{errors.location}</div>}
      </div>

      <div className="form-group">
        <div className="form-label">Select Time</div>
        <input
          className="form-input"
          type="datetime-local"
          value={values.dateTime}
          onChange={handleChange("dateTime")}
        />
        {errors.dateTime && <div className="form-error">{errors.dateTime}</div>}
      </div>

      <div className="form-group">
        <div className="form-label">See Categories</div>
        <select
          className="form-select"
          value={values.category}
          onChange={handleChange("category")}
        >
          <option value="">Select category...</option>
          <option value="club">Club</option>
          <option value="concert">Concert</option>
          <option value="bar">Bar</option>
          <option value="festival">Festival</option>
        </select>
        {errors.category && <div className="form-error">{errors.category}</div>}
      </div>

      <div className="form-group">
        <div className="form-label">Photo URL</div>
        <input
          className="form-input"
          placeholder="https://example.com/photo.jpg"
          value={values.imageUrl}
          onChange={handleChange("imageUrl")}
        />
      </div>

      <button
        type="submit"
        className="button button-primary"
        style={{ width: "100%", marginTop: 8 }}
        disabled={submitting}
      >
        {submitting ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
};

export default EventForm;
