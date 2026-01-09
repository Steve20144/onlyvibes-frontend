import { useNavigate } from "react-router-dom";

/**
 * Custom hook to handle navigation related to events.
 * Provides a unified handler for navigating to event details.
 * * @returns {object} An object containing the event navigation handlers.
 * @property {function} handleEventClick - Function that navigates to the event details page given an ID.
 */
export const useEventNavigation = () => {
  const navigate = useNavigate();
  
  /**
   * Navigates to the details page of a specific event.
   * @param {string|number} id - The unique identifier of the event.
   */
  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };
  
  return { handleEventClick };
};