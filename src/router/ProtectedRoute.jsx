import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../api/auth";

/**
 * A Higher-Order Component (HOC) that protects routes from unauthenticated access.
 * Checks if a valid user session exists; if not, redirects to the login page
 * while preserving the original location in history.
 * * @param {object} props - The component props.
 * @param {JSX.Element} props.children - The child components (route element) to render if authenticated.
 * @returns {JSX.Element} The child component or a Redirect object.
 */
const ProtectedRoute = ({ children }) => {
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