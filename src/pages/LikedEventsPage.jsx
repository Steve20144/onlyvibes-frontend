import { useState } from "react";
import EventList from "../components/EventList";
import PageHeader from "../components/PageHeader"; 
import PageContent from "../components/PageContent";
import PageLayout from "../components/PageLayout";
import { useEventNavigation } from "../hooks/useEventNavigation";

// --- ALL YOUR DEMO EVENTS ---
// We still need the full list to get the initial data
const DEMO_EVENTS = [
  {
    id: 1,
    title: "Event Name",
    venueName: "Big Club Downtown",
    distanceKm: 0.1,
    imageUrl: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg",
    likesCount: 125,
    userHasLiked: false, 
  },
  {
    id: 2,
    title: "Event Name",
    venueName: "Chandelier Bar",
    distanceKm: 0.4,
    imageUrl: "https://images.pexels.com/photos/2102568/pexels-photo-2102568.jpeg",
    likesCount: 543,
    userHasLiked: true, 
  },
  {
    id: 7,
    title: "Rooftop Party",
    venueName: "Sky Garden",
    distanceKm: 1.0,
    imageUrl: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
    likesCount: 430,
    userHasLiked: false,
  },
];

// 1. RENAMED COMPONENT
const LikedEventsPage = () => {
  const { handleEventClick } = useEventNavigation(); 
  
  // 2. FILTERED INITIAL STATE
  // This state holds the "master list" of liked events for this page
  const [likedEvents, setLikedEvents] = useState(
    DEMO_EVENTS.filter(e => e.userHasLiked)
  );
  
  // This state holds what is actually *shown* (after search)
  const [displayedEvents, setDisplayedEvents] = useState(likedEvents);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearchQuery(q);
    if (!q) {
      setDisplayedEvents(likedEvents); // Reset to full liked list
      return; 
    }
    // Filter from the liked list, not the full demo list
    const filtered = likedEvents.filter(ev => ev.title.toLowerCase().includes(q) || ev.venueName.toLowerCase().includes(q));
    setDisplayedEvents(filtered);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setDisplayedEvents(likedEvents); // Reset to full liked list
  };

  // 3. MODIFIED 'handleLike'
  // On this page, "onLike" means "unlike and remove from this list"
  const handleLike = (event) => {
    // Note: This only removes it from this page's view.
    // It doesn't update the "master" DEMO_EVENTS list.
    
    // Update the master liked list
    const newLikedList = likedEvents.filter(e => e.id !== event.id);
    setLikedEvents(newLikedList);
    
    // Update the *displayed* list
    setDisplayedEvents(prev => prev.filter(e => e.id !== event.id));
  };

  return (
    <PageLayout>
      <PageHeader 
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onClearFilters={handleClearFilters}
        placeholder="Search liked events..."
      />

      <PageContent>
        {displayedEvents.length > 0 ? (
          <EventList 
            events={displayedEvents}
            onLike={handleLike} 
            onEventClick={handleEventClick}
          />
        ) : (
          <p style={{ color: '#888', textAlign: 'center' }}>You haven't liked any events yet.</p>
        )}
      </PageContent>
    </PageLayout>
  );
};

export default LikedEventsPage;