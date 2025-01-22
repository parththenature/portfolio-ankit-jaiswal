import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

const AuthRedirect = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Check if user is logged in

  if (isLoggedIn) {
    return <Navigate to="/" replace />; // Redirect to home if logged in
  }

  return children;
};

// Add PropTypes validation
AuthRedirect.propTypes = {
  children: PropTypes.node.isRequired, // 'node' ensures it accepts any valid React children
};

export default AuthRedirect;
