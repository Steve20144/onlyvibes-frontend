import { useState, useEffect } from "react";
import EventList from "../components/EventList";
import PageHeader from "../components/PageHeader";
import PageContent from "../components/PageContent";
import { getEvents, likeEvent } from "../api/events";
import { alert } from "../components/PopupDialog";
import { useEventNavigation } from "../hooks/useEventNavigation";

/**
 * The main landing page for the application.
 * Displays a scrollable feed of events with search and filtering capabilities.
 * Handles:
 * - Fetching event data from the API.
 * - Dynamic client-side searching.
 * - Optimistic UI updates for the "Like" feature.
 * * @returns {JSX.Element} The Home Page component.
 */
const HomePage = () => {
  const { handleEventClick } = useEventNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- API CALL: Fetch events on component mount/filter change ---
  const loadEvents = async (filters = {}) => {
    setError(null);
    setIsLoading(true);
    try {
      const eventArray = await getEvents(filters); 
      
      setEvents(eventArray); 
      
    } catch (err) {
      console.error('Failed to load events:', err);
      setError('Failed to load events. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);
  
  // --- API CALL: Handle dynamic search/filtering ---
  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    
    // Trigger a new API call with the search query
    loadEvents({ q: q.trim() });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    // Reload all events without filters
    loadEvents();
  };

  // --- API CALL: Handle liking/unliking ---
  const handleLike = async (event) => {
    const { id, userHasLiked } = event;
    
    // Optimistic UI Update: Update state first for responsiveness
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const newLikedState = !userHasLiked;
          const newLikesCount = newLikedState ? (e.likesCount || 0) + 1 : (e.likesCount || 0) - 1;
          return { ...e, userHasLiked: newLikedState, likesCount: newLikesCount < 0 ? 0 : newLikesCount };
        }
        return e;
      })
    );

    try {
      // API Call: Toggle the like status
      await likeEvent(id);
    } catch (error) {
      console.error("Like failed, reverting UI:", error);
      // Revert the UI state if API fails
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, userHasLiked: userHasLiked, likesCount: e.likesCount } : e))
      );
      await alert("Failed to toggle like status.", "Error");
    }
  };

  // --- Render Logic ---
  const renderContent = () => {
    if (isLoading) {
      return <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>Loading vibes...</div>;
    }
    if (error) {
      return <div style={{ color: '#ff6666', padding: '20px', textAlign: 'center' }}>Error: {error}</div>;
    }
    if (events.length === 0 && searchQuery) {
      return <div style={{ color: '#ccc', padding: '20px', textAlign: 'center' }}>No events found matching "{searchQuery}".</div>;
    }
    if (events.length === 0) {
      return <div style={{ color: '#ccc', padding: '20px', textAlign: 'center' }}>No events available right now.</div>;
    }
    
    return (
      <EventList 
         events={events} 
         onLike={handleLike} 
         onEventClick={handleEventClick}
      />
    );
  };

  return (
    <div style={{ 
      width: '100%', 
      height: 'auto', 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      
      <PageHeader 
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onClearFilters={handleClearFilters}
        placeholder="Search..."
      />

      <PageContent>
        {renderContent()}
      </PageContent>

    </div>
  );
};

export default HomePage;