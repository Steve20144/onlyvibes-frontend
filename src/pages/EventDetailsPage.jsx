// src/pages/EventDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventDetailsWithReview, deleteReview, updateReview } from '../api/reviewService';
import { ConfirmModal } from '../components/ConfirmModal';

export const EventDetailsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventDetailsWithReview(eventId);
        setEventData(data);
        // Ενημέρωση τοπικής κατάστασης αν υπάρχει ήδη review
        if(data.userReview) {
            setNewReviewText(data.userReview.comment || '');
            setNewRating(data.userReview.rating || 0);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleDeleteReview = async () => {
    if (!eventData.userReview) return;

    try {
        // Implements DELETE /events/{eventId}/reviews/{reviewId}
        const updatedData = await deleteReview(eventId, eventData.userReview.reviewId);
        
        // Ενημέρωση κατάστασης μετά τη διαγραφή
        setEventData(updatedData); 
        setShowDeleteModal(false);
        setNewReviewText('');
        setNewRating(0);
        alert('Review deleted successfully!');
    } catch (error) {
        console.error("Error deleting review:", error);
        setShowDeleteModal(false);
    }
  };

  const handleReviewSubmission = async () => {
    if (newRating === 0) {
        alert("Please provide a star rating."); 
        return;
    }
    
    const reviewData = { rating: newRating, comment: newReviewText };
    try {
        // Implements POST/PUT /events/{eventId}/reviews
        const updatedData = await updateReview(eventId, eventData.userReview?.reviewId, reviewData);
        setEventData(updatedData);
        alert(eventData.userReview ? 'Review updated!' : 'Review submitted!');
    } catch (error) {
        console.error("Submission failed:", error);
    }
  };

  const renderRatingStars = (rating, setRating) => (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span 
          key={star}
          className="star-icon"
          onClick={() => setRating(star)}
          style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray', fontSize: '30px' }}
        >
          ★
        </span>
      ))}
    </div>
  );

  if (isLoading) return <div className="page-container">Loading Event Details...</div>;
  if (!eventData) return <div className="page-container">Event Not Found.</div>;

  // *** Η ΣΩΣΤΗ ΔΙΟΡΘΩΜΕΝΗ ΓΡΑΜΜΗ ***
  // Ελέγχει αν υπάρχει review του χρήστη στα δεδομένα
  const hasSubmittedReview = !!eventData.userReview; 

  return (
    <div className="page-container event-details-page">
      <header className="event-header" style={{backgroundImage: `url(${eventData.imageUrl})`}}>
        <span className="material-icons back-icon" onClick={() => navigate('/')}>arrow_back</span>
      </header>
      
      <div className="event-info">
        <h2 className="event-title">Cool Party Title #1</h2>
        <p className="event-meta">📍 {eventData.location} | 🗓️ {new Date(eventData.dateTime).toLocaleDateString()}</p>
        
        <div className="review-summary">
            <h3>Review Summary</h3>
            <p className="rating">⭐️ {eventData.reviewSummary} ({eventData.reviewCount} reviews)</p>
        </div>

        {/* --- Area for Review/Edit/Delete --- */}
        <div className="user-review-area card-panel">
          {hasSubmittedReview ? (
            // Mockup: Delete a Review #2 (Review Submitted)
            <div className="submitted-review-container">
                <h4>Thank you for your contribution!</h4>
                {renderRatingStars(newRating, setNewRating)}
                <p className="comment">{newReviewText}</p>
                
                <div className="review-actions">
                    <button className="icon-button" onClick={() => console.log('Edit clicked')}>
                        <span className="material-icons">edit</span> 
                    </button>
                    {/* Activity Diagram: Delete Review -> Display pop-up */}
                    <button className="icon-button" onClick={() => setShowDeleteModal(true)}>
                        <span className="material-icons">close</span> 
                    </button>
                </div>
                <button className="btn btn-primary full-width" onClick={handleReviewSubmission}>Update Review</button>
            </div>
          ) : (
             // Mockup: Delete a Review #4 (Enter New Review)
            <div className="new-review-container">
                <h4>Did you have fun?</h4>
                <p>Please take a moment to rate and review</p>
                {renderRatingStars(newRating, setNewRating)}
                <textarea 
                    value={newReviewText} 
                    onChange={(e) => setNewReviewText(e.target.value)} 
                    placeholder="Type review..."
                    className="review-input"
                ></textarea>
                <button className="btn btn-primary full-width" onClick={handleReviewSubmission}>Submit Review</button>
            </div>
          )}
        </div>
      </div>

      {/* Mockup: Delete a Review #3 (Confirmation Modal) */}
      <ConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteReview}
        message="You are about to delete this review. This action cannot be undone. Are you sure?" 
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
};