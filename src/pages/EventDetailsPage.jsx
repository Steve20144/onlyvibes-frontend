import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// --- NEW ALIGNED IMPORTS ---
import { getEventById } from '../api/events'; 
import { deleteReview, updateReview, submitReview } from '../api/reviews';
// ---------------------------
import { ArrowLeft, Star, MapPin, Calendar, Clock, Trash2, Edit2 } from 'lucide-react';
import { confirm, alert } from '../components/PopupDialog';

// --- FALLBACK DATA (Preserved) ---
const FALLBACK_EVENT = {
  eventId: 1,
  title: "Big Club Downtown",
  location: "Downtown Ave, New York",
  dateTime: "2025-11-16T22:30:00",
  imageUrl: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg",
  description: "Get ready for the biggest night of the year! We have world-class DJs spinning the best house and techno tracks until sunrise.",
  reviewSummary: 4.5,
  reviewCount: 128,
  userReview: null 
};

export const EventDetailsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Fetch event data (which includes userReview if logged in)
        console.log(eventId)
        const data = await getEventById(eventId);
        
        if (data) {
          setEventData(data);
          if(data.userReview) {
              setNewReviewText(data.userReview.comment || '');
              setNewRating(data.userReview.rating || 0);
          }
        } else {
          // If API returns null/empty success object
          throw new Error("No valid event data returned from API.");
        }
      } catch (error) {
        console.warn("API fetch failed, using fallback data:", error);
        setEventData(FALLBACK_EVENT);
        if (FALLBACK_EVENT.userReview) {
            setNewReviewText(FALLBACK_EVENT.userReview.comment);
            setNewRating(FALLBACK_EVENT.userReview.rating);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  // --- DELETE LOGIC (Uses deleteReview from reviewService) ---
  const handleDeleteReview = async () => {
    const isConfirmed = await confirm(
      "You are about to delete this review.<br/>This action cannot be undone.<br/>Are you sure?",
      "Delete Review?"
    );

    if (!isConfirmed) return;

    try {
        // API Call: DELETE /reviews/{reviewId}
        await deleteReview(eventData.userReview.reviewId); // eventId is not strictly needed here if service is well-designed
        
        setEventData(prev => ({ ...prev, userReview: null }));
        setNewReviewText('');
        setNewRating(0);
        
        await alert("Review deleted successfully.", "Deleted");

    } catch (error) {
        console.error("Error deleting review:", error);
        // Show failure alert
        await alert("Failed to delete review. Try again.", "Error");
    }
  };

  // --- SUBMIT/UPDATE LOGIC (Uses submitReview and updateReview from reviewService) ---
  const handleReviewSubmission = async () => {
    if (newRating === 0) { 
      await alert("Please provide a star rating.", "Rating Required"); 
      return; 
    }
    
    const reviewData = { rating: newRating, comment: newReviewText };
    let apiCall;

    try {
        // Determine if this is an UPDATE (PUT) or a new SUBMISSION (POST)
        if (eventData.userReview?.reviewId) {
            // UPDATE: /reviews/{reviewId}
            apiCall = updateReview(eventData.userReview.reviewId, reviewData);
        } else {
            // SUBMISSION: /events/{eventId}/reviews
            // apiCall = submitReview(eventId, reviewData);
        }

        const updatedData = await apiCall;
        
        // Update local state with the new/updated review data
        setEventData(updatedData || { 
            ...eventData, 
            userReview: { ...reviewData, reviewId: eventData.userReview?.reviewId || Date.now() } 
        });
        
        setIsEditing(false);
        
        await alert(eventData.userReview ? 'Review updated!' : 'Review submitted!', "Success");

    } catch (error) {
        console.error("Submission failed:", error);
        await alert("Submission failed. Please check the network.", "API Error");
    }
  };

  if (isLoading) return <div style={{color:'white', padding:'20px'}}>Loading...</div>;
  if (!eventData) return <div style={{color:'white', padding:'20px'}}>Event Not Found.</div>;

  const hasSubmittedReview = !!eventData.userReview; 

  return (
    <div style={{ width: '100%', minHeight: '100%', background: '#000', paddingBottom: '100px' }}>
      
      {/* --- HERO IMAGE HEADER (JSX Preserved) --- */}
      <div style={{ height: '350px', width: '100%', position: 'relative', backgroundImage: `url(${eventData.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' }} />
        <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', cursor: 'pointer', color: 'white' }}>
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* --- CONTENT SHEET (JSX Preserved) --- */}
      <div style={{ marginTop: '-50px', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', background: '#050016', position: 'relative', padding: '30px 25px', color: 'white', boxShadow: '0 -10px 40px rgba(0,0,0,0.5)', minHeight: '500px' }}>
        
        {/* Title & Rating */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', margin: 0, lineHeight: 1.2 }}>{eventData.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,215,0,0.15)', padding: '5px 10px', borderRadius: '20px' }}>
            <Star size={16} fill="#FFD700" color="#FFD700" />
            <span style={{ fontWeight: 'bold', color: '#FFD700' }}>{eventData.reviewSummary || 4.5}</span>
          </div>
        </div>

        {/* Meta Info Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '25px' }}>
            <span style={pillStyle}><MapPin size={14}/> {eventData.location}</span>
            <span style={pillStyle}><Calendar size={14}/> {new Date(eventData.dateTime).toLocaleDateString()}</span>
            <span style={pillStyle}><Clock size={14}/> {new Date(eventData.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>

        <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>About</h3>
        <p style={{ color: '#b3b3b3', lineHeight: '1.6', fontSize: '14px', marginBottom: '40px' }}>
             {eventData.description || "No description available."}
        </p>

        {/* --- REVIEW SECTION (JSX Preserved) --- */}
        <div style={{ background: '#1a1a2e', borderRadius: '20px', padding: '20px', border: '1px solid #333' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, fontSize: '18px' }}>Your Review</h3>
                {hasSubmittedReview && !isEditing && (
                   <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => setIsEditing(true)} style={{background:'none', border:'none', color:'#ccc', cursor:'pointer'}}><Edit2 size={18}/></button>
                      <button onClick={handleDeleteReview} style={{background:'none', border:'none', color:'#ff6b6b', cursor:'pointer'}}>
                        <Trash2 size={18}/>
                      </button>
                   </div>
                )}
            </div>

            {/* Logic: Show Form (New/Edit) OR Show Submitted Review */}
            {(!hasSubmittedReview || isEditing) ? (
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '15px',
                    alignItems: 'center', 
                    textAlign: 'center' 
                }}>
                    {/* Star Selector */}
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        {[1,2,3,4,5].map(star => (
                            <Star key={star} size={32} 
                                fill={star <= newRating ? "#FFD700" : "none"}
                                color={star <= newRating ? "#FFD700" : "#555"}
                                onClick={() => setNewRating(star)}
                                style={{ cursor: 'pointer' }}
                            />
                        ))}
                    </div>
                    {/* Text Area */}
                    <textarea 
                        value={newReviewText} 
                        onChange={(e) => setNewReviewText(e.target.value)} 
                        placeholder="How was the vibe?"
                        style={{ 
                            width: '100%',
                            maxWidth: '300px',
                            height: '80px', 
                            borderRadius: '12px', 
                            background: '#000', 
                            border: '1px solid #333', 
                            color: 'white', 
                            padding: '10px', 
                            outline: 'none',
                            margin: '0 auto' 
                        }}
                    />
                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '300px' }}>
                         {isEditing && <button onClick={() => setIsEditing(false)} style={{...btnStyle, background:'#333'}}>Cancel</button>}
                         <button onClick={handleReviewSubmission} style={{...btnStyle, background:'#6C63FF'}}>
                             {isEditing ? 'Update' : 'Submit'}
                         </button>
                    </div>
                </div>
            ) : (
                // View Submitted Review
                <div style={{ textAlign: 'center' }}>
                     <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'center' }}>
                        {[1,2,3,4,5].map(star => (
                            <Star key={star} size={20} fill={star <= eventData.userReview.rating ? "#FFD700" : "none"} color={star <= eventData.userReview.rating ? "#FFD700" : "#555"} />
                        ))}
                     </div>
                     <p style={{ color: '#ddd', fontStyle: 'italic', margin: '0 auto', maxWidth: '300px' }}>"{eventData.userReview.comment}"</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

// Helper Styles (Preserved)
const pillStyle = { display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: '12px', fontSize: '13px', color: '#ddd' };
const btnStyle = { flex: 1, padding: '12px', borderRadius: '12px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' };