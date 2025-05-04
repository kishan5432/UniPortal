import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in when app loads
  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        setLoading(true);
        // Get the token from localStorage
        const token = localStorage.getItem("erpToken");

        if (token) {
          // Set default axios auth header
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Verify token and get user data
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify`
          );
          setCurrentUser(response.data.user);
        }
      } catch (err) {
        console.error("Auth verification error:", err);
        localStorage.removeItem("erpToken");
        delete axios.defaults.headers.common["Authorization"];
      } finally {
        setLoading(false);
      }
    };

    checkLoggedInUser();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setError(null);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        credentials
      );
      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem("erpToken", token);

      // Set default axios auth header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Remove token from localStorage
      localStorage.removeItem("erpToken");

      // Remove auth header
      delete axios.defaults.headers.common["Authorization"];

      // Clear user from state
      setCurrentUser(null);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!currentUser,
    role: currentUser?.role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
