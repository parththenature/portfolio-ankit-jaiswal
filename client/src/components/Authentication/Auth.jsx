import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null); // Default to null
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;

  // const API = import.meta.env.VITE_APP_URI_API;

  const [isLogged, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken") // Check if token exists
  );

  const loginUser = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  const storeTokenInLocalStorage = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;
  const isAdmin = user?.isAdmin || false; // Check if user.isAdmin is true, default to false
  console.log("isLoggedIn:", isLoggedIn, "isAdmin:", isAdmin);

  // Logout functionality
  const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  // Fetch logged-in user data from the backend
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://portfolio-ankit-jaiswal.onrender.com/api/auth/user`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("User data:", data.userData);
        setUser(data.userData); // Update the user state with fetched data
      } else {
        console.error("Failed to fetch user data");
        setUser(null); // Reset user if API call fails
      }
    } catch (error) {
      console.error("Error fetching user data from backend:", error);
      setUser(null); // Reset user in case of an error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    } else {
      setUser(null); // Clear user if no token is present
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        loginUser,
        logoutUser,
        isLoggedIn,
        isAdmin,
        storeTokenInLocalStorage,
        LogoutUser,
        user,
        authorizationToken,
        isLoading,
        userAuthentication,
        // API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Add PropTypes for validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
