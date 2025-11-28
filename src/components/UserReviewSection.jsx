import React, { useState, useEffect } from 'react';
import { Star, Edit2, X } from 'lucide-react';
import { submitReview, updateReview, deleteReview } from '../api/reviews';
import { getCurrentUserId } from '../api/auth';
import { confirm, alert } from '../components/PopupDialog';

export default function UserReviewSection({ eventId, reviews, onRefresh }) {
    const userId = getCurrentUserId();

    const existingReview = reviews.find(r => {
        if (!userId) return false;

        const extractId = (val) => {
            if (!val) return null;
            if (typeof val === 'string') return val;
            return val._id || val.id || null;
        };

        const currentIdString = String(userId);

        const accountId = extractId(r.accountId);
        const uId = extractId(r.userId);
        const userObjId = extractId(r.user);
        const authorId = extractId(r.author);

        return (
            String(accountId) === currentIdString ||
            String(uId) === currentIdString ||
            String(userObjId) === currentIdString ||
            String(authorId) === currentIdString
        );
    });

    const [isEditing, setIsEditing] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (existingReview) {
            setRating(existingReview.rating);
            setComment(existingReview.comment);
        } else {
            setRating(0);
            setComment('');
        }
    }, [existingReview]);

    const handleSubmit = async () => {
        if (rating === 0) return alert("Please add a star rating!");
        setLoading(true);
        try {
            if (existingReview) {
                const revId = existingReview.reviewId || existingReview._id || existingReview.id;
                await updateReview(eventId, revId, { rating, comment });
            } else {
                await submitReview(eventId, { rating, comment });
            }
            setIsEditing(false);
            onRefresh(); 
        } catch (err) {
            console.error(err);
            alert("Failed to save review.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete your review?")) return;
        setLoading(true);
        try {
            const revId = existingReview.reviewId || existingReview._id || existingReview.id;
            await deleteReview(eventId, revId);
            setRating(0);
            setComment('');
            onRefresh();
        } catch (err) {
            console.error(err);
            alert("Failed to delete.");
        } finally {
            setLoading(false);
        }
    };

    // --- FORM RENDER ---
    const renderForm = () => (
        <div style={styles.card}>
            <h3 style={styles.cardTitle}>
                {existingReview ? "Edit your review" : "How was the vibe?"}
            </h3>
            
            <div style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={32}
                        fill={star <= rating ? "#00d4ff" : "transparent"} 
                        color={star <= rating ? "#00d4ff" : "#555"}
                        onClick={() => setRating(star)}
                        style={{ cursor: 'pointer', margin: '0 6px' }}
                    />
                ))}
            </div>

            <textarea
                style={styles.textArea}
                placeholder="Tell us about the party..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <div style={styles.buttonRow}>
                {isEditing && (
                    <button onClick={() => setIsEditing(false)} style={styles.iconBtn}>
                        <X size={20} color="#ff6b6b" />
                    </button>
                )}
                <button onClick={handleSubmit} style={styles.submitBtn} disabled={loading}>
                    {loading ? "Saving..." : (existingReview ? "Update" : "Submit")}
                </button>
            </div>
        </div>
    );

    // --- THANK YOU CARD RENDER ---
    const renderExistingReviewCard = () => (
        <div style={styles.card}>
            <h3 style={styles.cardTitle}>Thank you for your contribution!</h3>

            <div style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={24}
                        fill={star <= existingReview.rating ? "#00d4ff" : "transparent"}
                        color={star <= existingReview.rating ? "#00d4ff" : "#00d4ff"}
                        style={{ margin: '0 4px' }}
                    />
                ))}
            </div>

            <p style={styles.reviewText}>
                {existingReview.comment || "No comment provided."}
            </p>

            <div style={styles.actionIcons}>
                <button onClick={() => setIsEditing(true)} style={styles.iconBtn}>
                    <Edit2 size={18} color="#ccc" />
                </button>
                <button onClick={handleDelete} style={{...styles.iconBtn, marginLeft: '10px'}}>
                    <X size={20} color="#ccc" />
                </button>
            </div>
        </div>
    );

    if (!userId) return null;

    return (
        <div style={{ marginBottom: '20px' }}>
            {/* Logic: If we found a review AND we are NOT currently clicking edit -> Show Card */}
            {existingReview && !isEditing 
                ? renderExistingReviewCard() 
                : renderForm()
            }
        </div>
    );
}

const styles = {
    card: {
        backgroundColor: '#151322', 
        borderRadius: '24px',
        padding: '25px',
        textAlign: 'center',
        marginBottom: '20px',
        border: '1px solid #2a2a40',
        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
    },
    cardTitle: {
        color: '#fff',
        fontSize: '19px',
        margin: '0 0 20px 0',
        fontWeight: '600',
    },
    starContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    reviewText: {
        color: '#a8a8a8',
        fontSize: '15px',
        lineHeight: '1.6',
        marginBottom: '25px',
        maxWidth: '90%',
        margin: '0 auto 25px auto',
    },
    textArea: {
        width: '100%',
        backgroundColor: '#0a0a12',
        border: '1px solid #333',
        borderRadius: '16px',
        color: 'white',
        padding: '15px',
        minHeight: '100px',
        marginBottom: '20px',
        resize: 'none',
        outline: 'none',
        fontSize: '15px',
    },
    actionIcons: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: '0px',
    },
    iconBtn: {
        background: 'rgba(255,255,255,0.05)',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitBtn: {
        backgroundColor: '#6C63FF',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        width: '100%',
        fontSize: '16px',
    },
    buttonRow: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
    }
};