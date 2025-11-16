import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { createEvent } from "../api/events";
// 2. Import ChevronLeft for the back button
import { UploadCloud, MapPin, Calendar, List, ChevronRight, ChevronLeft } from 'lucide-react';

export const CreateEventPage = () => {
  const navigate = useNavigate(); // 3. Initialize useNavigate
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // State for the form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [category, setCategory] = useState(null); 
  const [imageUrl, setImageUrl] = useState(null);

  // 4. Create a function to go back
  const handleGoBack = () => {
    navigate(-1); // This means "go back one page"
  };

  const handleSubmit = async () => {
    if (!title || !description || !location || !dateTime || !category) {
      setError("Please fill out all fields.");
      return;
    }
    
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      await createEvent({
        title, description, category, dateTime, location,
        imageUrl: imageUrl || undefined
      });

      setSuccess("Your event has been created! Redirecting...");
      // Redirect home after success
      setTimeout(() => navigate('/'), 2000); 
    } catch (e) {
      setError("Failed to create event. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Helper component for the form row buttons
  const SelectButton = ({ icon, text, onClick, value }) => (
    <button style={styles.selectButton} onClick={onClick}>
      <div style={styles.selectIcon}>{icon}</div>
      <span style={styles.selectText}>{value || text}</span>
      <ChevronRight size={20} style={styles.selectChevron} />
    </button>
  );

  return (
    <div style={styles.pageContainer}>
      
      {/* 5. ADD THE BACK BUTTON HERE */}
      <button style={styles.backButton} onClick={handleGoBack}>
        <ChevronLeft size={24} color="white" />
      </button>

      {/* 1. Upload Photos Box */}
      <div style={styles.uploadBox}>
        <div style={styles.uploadIconCircle}>
          <UploadCloud size={40} color="#6C63FF" />
        </div>
        <button style={styles.uploadButton}>
          Upload Photos
        </button>
      </div>

      {/* 2. Form Fields */}
      <div style={styles.form}>
        
        {/* Title */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            placeholder="Insert the name of the event..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Description */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            placeholder="Write a few words about your event..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
        </div>

        {/* 3. Select Buttons */}
        <div style={styles.selectGroup}>
          <SelectButton
            icon={<MapPin size={20} />}
            text="Select Location"
            value={location}
            onClick={() => setLocation("New York, NY")} // Mock
          />
          <SelectButton
            icon={<Calendar size={20} />}
            text="Select Time"
            value={dateTime}
            onClick={() => setDateTime("Nov 20, 2025 @ 10:00 PM")} // Mock
          />
          <SelectButton
            icon={<List size={20} />}
            text="Select Categories"
            value={category}
            onClick={() => setCategory("Music")} // Mock
          />
        </div>
      </div>

      {/* 4. Error/Success Messages */}
      <div style={styles.messageContainer}>
        {error && (
          <p style={{...styles.message, ...styles.errorMsg}}>
            {error}
          </p>
        )}
        {success && (
          <p style={{...styles.message, ...styles.successMsg}}>
            {success}
          </p>
        )}
      </div>

      {/* 5. Submit Button */}
      <button 
        style={styles.submitButton} 
        onClick={handleSubmit} 
        disabled={submitting}
      >
        {submitting ? "Creating..." : "Create Event"}
      </button>

      {/* 6. ADD THE CANCEL BUTTON HERE */}
      <button 
        style={styles.cancelButton} 
        onClick={handleGoBack}
      >
        Cancel
      </button>
    </div>
  );
};

// --- STYLES ---
const styles = {
  pageContainer: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#050016',
    color: 'white',
    padding: '20px 25px 100px 25px',
    boxSizing: 'border-box',
    position: 'relative', // Needed for the back button
  },
  // Style for the new Back Button
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    zIndex: 10,
  },
  uploadBox: {
    width: '100%',
    height: '200px',
    borderRadius: '20px',
    backgroundColor: '#1a1a2e',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    border: '1px dashed #333',
    marginBottom: '30px',
  },
  uploadIconCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    padding: '8px 20px',
    borderRadius: '20px',
    border: '1px solid #6C63FF',
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '16px',
    fontWeight: '500',
    color: 'white',
  },
  input: {
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #333',
    color: 'white',
    fontSize: '14px',
    padding: '8px 0',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    height: '100px',
    background: '#1a1a2e',
    border: '1px solid #333',
    borderRadius: '12px',
    color: 'white',
    fontSize: '14px',
    padding: '12px',
    outline: 'none',
    resize: 'none',
    boxSizing: 'border-box',
  },
  selectGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginTop: '10px',
  },
  selectButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 5px',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #222',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
  },
  selectIcon: {
    marginRight: '15px',
    color: '#a8a8a8',
  },
  selectText: {
    flex: 1,
    fontSize: '16px',
    fontWeight: '500',
    color: 'white',
  },
  selectChevron: {
    color: '#a8a8a8',
  },
  messageContainer: {
    marginTop: '20px',
  },
  message: {
    borderRadius: '8px',
    padding: '10px',
    fontSize: '14px',
    textAlign: 'center',
  },
  errorMsg: {
    background: 'rgba(255, 50, 50, 0.1)',
    border: '1px solid #ff3232',
    color: '#ff6b6b',
  },
  successMsg: {
    background: 'rgba(0, 210, 255, 0.1)',
    border: '1px solid #00d2ff',
    color: '#00d2ff',
  },
  submitButton: {
    width: '100%',
    padding: '15px',
    borderRadius: '16px',
    background: 'linear-gradient(145deg, #6C63FF, #584ed8)',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '30px',
  },
  // Style for the new Cancel Button
  cancelButton: {
    width: '100%',
    padding: '10px',
    background: 'none',
    border: 'none',
    color: '#a8a8a8',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '10px',
  }
};

export default CreateEventPage;