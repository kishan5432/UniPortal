import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;