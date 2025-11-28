import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Calendar, Clock, Trash2, User } from 'lucide-react';

// API Imports
import { getEventById, deleteEvent } from '../api/events'; 
import { fetchEventReviews } from '../api/reviews';
import { getCurrentUserId } from '../api/auth';

// Component Imports
import { confirm, alert } from '../components/PopupDialog'; 
import UserReviewSection from '../components/UserReviewSection'; 

export const EventDetailsPage = () => {  
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUserId = getCurrentUserId();

  // State
  const [eventData, setEventData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- FETCH DATA ---
  const loadData = useCallback(async () => {
      try {
          const [eventRes, reviewsRes] = await Promise.all([
              getEventById(id),
              fetchEventReviews(id)
          ]);

          const cleanEventData = eventRes.data || eventRes;

          setEventData(cleanEventData);
          setReviews(reviewsRes);
          
      } catch (error) {
          console.error("Failed to load event details", error);
      } finally {
          setIsLoading(false);
      }
  }, [id]);

  useEffect(() => {
      loadData();
  }, [loadData]);

  // --- DELETE EVENT HANDLER ---
  const handleDeleteEvent = async () => {
      const isConfirmed = await confirm(
          "Are you sure you want to cancel this event? This action cannot be undone.", 
          "Delete Event"
      );

      if (isConfirmed) {
          try {
              await deleteEvent(id);
              await alert("Event cancelled successfully.", "Deleted");
              navigate('/'); 
          } catch (error) {
              await alert("Failed to delete event. Please try again.", "Error");
          }
      }
  };

  // --- LOADING STATES ---
  if (isLoading) return <div style={{color:'white', padding:'40px', textAlign:'center'}}>Loading Vibes...</div>;
  if (!eventData) return <div style={{color:'white', padding:'40px', textAlign:'center'}}>Event Not Found.</div>;

  // 1. Get the Creator ID from the cleaned data
  const ownerId = eventData.data.creatorId;
  console.log(eventData)
  // 2. Compare Strings (to handle ObjectId vs String differences)
  const isEventOwner = currentUserId && String(ownerId) === String(currentUserId);
  
//   console.log("MY ID:", currentUserId, "OWNER ID:", ownerId, "MATCH:", isEventOwner);

  // Calculate Average Rating
  const avgRating = reviews.length > 0 
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
      : (eventData.reviewSummary || "New");

  return (
    <div style={{ width: '100%', minHeight: '100%', background: '#000', paddingBottom: '100px' }}>
      
      {/* 1. HERO IMAGE HEADER */}
      <div style={{ height: '350px', width: '100%', position: 'relative', backgroundImage: `url(${eventData.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), #050016)' }} />
        
        <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', cursor: 'pointer', color: 'white' }}>
          <ArrowLeft size={24} />
        </button>

        {/* DELETE BUTTON: Only renders if isEventOwner is true */}
        {isEventOwner && (
            <button 
                onClick={handleDeleteEvent} 
                style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    right: '20px', 
                    background: 'rgba(255,50,50,0.8)', 
                    border: 'none', 
                    borderRadius: '50%', 
                    width: '40px', 
                    height: '40px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    backdropFilter: 'blur(10px)', 
                    cursor: 'pointer', 
                    color: 'white' 
                }}
            >
              <Trash2 size={20} />
            </button>
        )}
      </div>

      {/* 2. CONTENT SHEET */}
      <div style={{ marginTop: '-50px', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', background: '#050016', position: 'relative', padding: '30px 25px', color: 'white', minHeight: '500px' }}>
        
        {/* Title & Rating */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', margin: 0, lineHeight: 1.2, maxWidth: '80%' }}>{eventData.title}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,215,0,0.15)', padding: '5px 12px', borderRadius: '20px' }}>
            <Star size={16} fill="#FFD700" color="#FFD700" />
            <span style={{ fontWeight: 'bold', color: '#FFD700' }}>{avgRating}</span>
          </div>
        </div>

        {/* Meta Info Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '25px' }}>
            <span style={pillStyle}><MapPin size={14}/> {eventData.location}</span>
            <span style={pillStyle}><Calendar size={14}/> {new Date(eventData.date || eventData.dateTime).toLocaleDateString()}</span>
            <span style={pillStyle}><Clock size={14}/> {eventData.time || new Date(eventData.date || eventData.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>

        <h3 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: '600' }}>About</h3>
        <p style={{ color: '#b3b3b3', lineHeight: '1.6', fontSize: '14px', marginBottom: '40px' }}>
             {eventData.description || "No description provided."}
        </p>

        {/* --- 3. REVIEWS SECTION --- */}
        <hr style={{ borderColor: '#222', marginBottom: '30px' }} />
        
        {/* A) The Interactive User Section (Your Review / Submit Form) */}
        <UserReviewSection 
            eventId={id} 
            reviews={reviews} 
            onRefresh={loadData} 
        />

        {/* B) COMMUNITY REVIEWS (Bottom) */}
        <h3 style={{ fontSize: '20px', marginBottom: '20px', marginTop: '30px' }}>
            Community Vibes ({reviews.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {reviews.length === 0 && <p style={{color: '#666'}}>No reviews yet.</p>}
            
            {reviews
              .filter(r => {
                  // Hide current user from this list using robust ID check
                  const getId = (f) => (f && typeof f === 'object') ? (f._id || f.id) : f;
                  const rId = getId(r.accountId) || getId(r.userId) || getId(r.user);
                  return String(rId) !== String(currentUserId);
              })
              .map(review => (
                <ReviewItem key={review.reviewId || review._id || review.id} review={review} /> 
            ))}
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: Single Review Item ---
const ReviewItem = ({ review }) => {
    const displayName = 
        review.username || 
        review.user?.username || 
        review.accountId?.username || 
        review.author?.username || 
        review.user?.firstName ||
        "Community Member";

    const stars = [1,2,3,4,5].map(star => (
        <Star key={star} size={14} fill={star <= review.rating ? "#FFD700" : "none"} color={star <= review.rating ? "#FFD700" : "#444"} />
    ));

    return (
        <div style={{ padding: '15px', background: '#11101C', borderRadius: '15px', border: '1px solid #222' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={16} color="#aaa" />
                    </div>
                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'white' }}>
                        {displayName}
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '2px' }}>{stars}</div>
            </div>
            <p style={{ color: '#ccc', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
                {review.comment}
            </p>
        </div>
    );
};

// Styles
const pillStyle = { display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', padding: '8px 12px', borderRadius: '12px', fontSize: '13px', color: '#ccc' };