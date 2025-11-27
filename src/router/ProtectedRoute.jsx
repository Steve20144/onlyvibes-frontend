// src/router/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../api/auth";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('currentUserId');
  const location = useLocation();
  const userIsAuthenticated = isAuthenticated();

  // if (loading) {
  //   return (
  //     <div className="app-shell">
  //       <div className="phone-frame">
  //         <div className="phone-content center">
  //           <p>Loading...</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (!userIsAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
