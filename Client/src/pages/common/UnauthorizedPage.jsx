import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UnauthorizedPage = () => {
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
    <div className="unauthorized-page">
      <div className="unauthorized-container">
        <h1>Access Denied</h1>
        <div className="error-icon">403</div>
        <p>You do not have permission to access this page.</p>
        <Link to={getRoleHomePage()} className="back-button">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
