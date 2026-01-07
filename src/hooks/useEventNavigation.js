import { useNavigate } from "react-router-dom";

export const useEventNavigation = () => {
  const navigate = useNavigate();
  
  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };
  
  return { handleEventClick };
};
