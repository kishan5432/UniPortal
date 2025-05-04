import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NotFoundPage = () => {
  const { currentUser } = useAuth();

  // Determine redirect link based on user role
  const getRoleHomePage = () => {
    if (!currentUser) return "/login";

    const roleRedirectMap = {
      admin: "/admin/dashboard",
      faculty: "/faculty/dashboard",
      student: "/student/dashboard",
      library: "/library/dashboard",
      tnp: "/tnp/dashboard",
      finance: "/finance/dashboard",
    };

    return roleRedirectMap[currentUser.role] || "/login";
  };

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1>Page Not Found</h1>
        <div className="error-icon">404</div>
        <p>The page you are looking for does not exist.</p>
        <Link to={getRoleHomePage()} className="back-button">
          {currentUser ? "Return to Dashboard" : "Go to Login"}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
