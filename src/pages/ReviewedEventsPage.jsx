import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventList from "../components/EventList";
import PageHeader from "../components/PageHeader";
import PageContent from "../components/PageContent";
import PageLayout from "../components/PageLayout";
import { useEventNavigation } from "../hooks/useEventNavigation";

// --- ALL YOUR DEMO EVENTS ---
// We need to add 'userReview' to the data
const DEMO_EVENTS = [
  {
    id: 1,
    title: "Event Name",
    venueName: "Big Club Downtown",
    distanceKm: 0.1,
    imageUrl: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg",
    likesCount: 125,
    userHasLiked: false, 
    userReview: null,
  },
  {
    id: 2,
    title: "Event Name",
    venueName: "Chandelier Bar",
    distanceKm: 0.4,
    imageUrl: "https://images.pexels.com/photos/2102568/pexels-photo-2102568.jpeg",
    likesCount: 543,
    userHasLiked: true, 
    userReview: { rating: 5, comment: "Amazing!" }, 
  },
  {
    id: 3,
    title: "Event Name",
    venueName: "Underground Hall",
    distanceKm: 0.3,
    imageUrl: "https://summerrockz.com/wp-content/uploads/2024/03/Lloret-de-Mar-NightLife.jpeg",
    likesCount: 342,
    userHasLiked: false,
    userReview: null, 
  },
  {
    id: 4,
    title: "Sunset Vibes",
    venueName: "Beachside Lounge",
    distanceKm: 1.2,
    imageUrl: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
    likesCount: 88,
    userHasLiked: false,
    userReview: null, 
  },
  {
    id: 5,
    title: "Techno Bunker",
    venueName: "The Warehouse",
    distanceKm: 2.5,
    imageUrl: "https://images.pexels.com/photos/3754300/pexels-photo-3754300.jpeg",
    likesCount: 720,
    userHasLiked: true,
    userReview: { rating: 4, comment: "Intense." }, 
  },
  {
    id: 6,
    title: "Jazz Night",
    venueName: "The Speakeasy",
    distanceKm: 0.8,
    imageUrl: "https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg",
    likesCount: 215,
    userHasLiked: false,
    userReview: null, 
  },
  {
    id: 7,
    title: "Rooftop Party",
    venueName: "Sky Garden",
    distanceKm: 1.0,
    imageUrl: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
    likesCount: 430,
    userHasLiked: false,
    userReview: null, 
  },
];

// 1. RENAMED COMPONENT
const ReviewedEventsPage = () => {
  const navigate = useNavigate(); 
  const { handleEventClick } = useEventNavigation(); 
  
  // 2. FILTERED INITIAL STATE
  // This state holds the "master list" of reviewed events
  const [reviewedEvents, setReviewedEvents] = useState(
    DEMO_EVENTS.filter(e => e.userReview !== null)
  );
  
  // This state holds what is actually *shown* (after search)
  const [displayedEvents, setDisplayedEvents] = useState(reviewedEvents);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearchQuery(q);
    if (!q) {
      setDisplayedEvents(reviewedEvents); // Reset to full reviewed list
      return; 
    }
    // Filter from the reviewed list
    const filtered = reviewedEvents.filter(ev => ev.title.toLowerCase().includes(q) || ev.venueName.toLowerCase().includes(q));
    setDisplayedEvents(filtered);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setDisplayedEvents(reviewedEvents); // Reset to full reviewed list
  };

  // 3. KEPT 'handleLike' as a toggle
  // Liking/Unliking an event shouldn't remove it from this page
  const handleLike = (event) => {
    // Update the master list
    setReviewedEvents(prev => prev.map(e => {
      if (e.id === event.id) {
        const newLikedState = !e.userHasLiked;
        const newLikesCount = newLikedState ? (e.likesCount || 0) + 1 : (e.likesCount || 0) - 1;
        return { ...e, userHasLiked: newLikedState, likesCount: newLikesCount < 0 ? 0 : newLikesCount };
      }
      return e;
    }));
    
    // Update the displayed list
    setDisplayedEvents(prev => prev.map(e => {
      if (e.id === event.id) {
        const newLikedState = !e.userHasLiked;
        const newLikesCount = newLikedState ? (e.likesCount || 0) + 1 : (e.likesCount || 0) - 1;
        return { ...e, userHasLiked: newLikedState, likesCount: newLikesCount < 0 ? 0 : newLikesCount };
      }
      return e;
    }));
  };

  return (
    <PageLayout>
      <PageHeader 
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onClearFilters={handleClearFilters}
        placeholder="Search reviewed events..."
      />

      <PageContent>
        {displayedEvents.length > 0 ? (
          <EventList 
            events={displayedEvents} 
            onLike={handleLike} 
            onEventClick={handleEventClick}
          />
        ) : (
          <p style={{ color: '#888', textAlign: 'center' }}>You haven't reviewed any events yet.</p>
        )}
      </PageContent>
    </PageLayout>
  );
};

export default ReviewedEventsPage; 