import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/events";
import { alert } from "../components/PopupDialog"; 
import { UploadCloud, MapPin, Calendar, List, ChevronRight, ChevronLeft } from 'lucide-react';

export const CreateEventPage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [category, setCategory] = useState(null); 
  const [imageUrl, setImageUrl] = useState(null); 

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    // Validation (Using the alert popup)
    if (!title || !description || !location || !dateTime || !category) {
      await alert("Please fill out all required fields.", "Missing Fields");
      return;
    }
    
    try {
      setSubmitting(true);

      const now = new Date();

      // 1. Create a date object for the next month
      // Note: setMonth(getMonth() + 1) handles year rollovers automatically (e.g., Dec -> Jan)
      const nextMonthDate = new Date(now);
      nextMonthDate.setMonth(now.getMonth() + 1);

      // Adjust the time component based on the user's input (if applicable)
      // If you are setting the time based on user input, you would typically combine 
      // the new date with the user's selected time (omitted here for simplicity).
      // Since the user input 'dateTime' likely holds the time component, we can use it 
      // to set the time of the calculated date.

      // Assuming the user's 'dateTime' state variable already holds the intended time:
      const userTimeComponent = new Date(dateTime); // Convert user input to Date object

      nextMonthDate.setHours(userTimeComponent.getHours());
      nextMonthDate.setMinutes(userTimeComponent.getMinutes());
      nextMonthDate.setSeconds(0);
      nextMonthDate.setMilliseconds(0);
      
      // 2. CONSTRUCTING THE PAYLOAD for the API
      const payload = {
        title, 
        description, 
        category, 
        dateTime: nextMonthDate.toISOString(), // Ensure ISO format
        location,
        imageUrl: imageUrl || "https://picsum.photos/800/400?random=" + Date.now(),
        latitude: null, 
        longitude: null,
      };

      console.log("FINAL PAYLOAD BEING SENT:", JSON.stringify(payload));
      
      // 3. API CALL
      await createEvent(payload);

      // 4. Success and Redirect
      await alert("Your event has been created! 🎉", "Success");
      navigate('/'); 

    } catch (e) {
      console.error("Failed to create event:", e);
      let errorMsg = "Failed to create event. Please try again.";
      if (e.message && e.message.includes("400")) {
          // If the API provided a specific error message
          errorMsg = "Data validation failed. Check your date format or required fields.";
      }
      await alert(errorMsg, "API Error");
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
      
      <button style={styles.backButton} onClick={handleGoBack}>
        <ChevronLeft size={24} color="white" />
      </button>

      {/* 1. Upload Photos Box */}
      <div style={styles.uploadBox}>
        <div style={styles.uploadIconCircle}>
          <UploadCloud size={40} color="#6C63FF" />
        </div>
        <button 
            style={styles.uploadButton}
            onClick={() => setImageUrl('Mock Image Set')} // Mocking success
        >
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
            onClick={() => setLocation("New York, NY")} // Mock selection
          />
          <SelectButton
            icon={<Calendar size={20} />}
            text="Select Time"
            value={dateTime}
            onClick={() => setDateTime("Nov 20, 2025 @ 10:00 PM")} // Mock selection
          />
          <SelectButton
            icon={<List size={20} />}
            text="Select Categories"
            value={category}
            onClick={() => setCategory("Music")} // Mock selection
          />
        </div>
      </div>

      {/* 5. Submit Button */}
      <button 
        style={styles.submitButton} 
        onClick={handleSubmit} 
        disabled={submitting}
      >
        {submitting ? "Creating..." : "Create Event"}
      </button>

      {/* 6. Cancel Button */}
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
    position: 'relative',
  },
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