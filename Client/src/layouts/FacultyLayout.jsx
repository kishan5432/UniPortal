import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FacultyLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="faculty-layout">
      <header>
        <div className="logo">College ERP Portal</div>
        <div className="user-info">
          <span>Welcome, {currentUser?.firstName} {currentUser?.lastName}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      
      <div className="container">
        <aside className="sidebar">
          <nav>
            <ul>
              <li>
                <Link to="/faculty/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/faculty/courses">Course Management</Link>
              </li>
              <li>
                <Link to="/faculty/assessment">Student Assessment</Link>
              </li>
              <li>
                <Link to="/faculty/communication">Communication</Link>
              </li>
              <li>
                <Link to="/faculty/research">Research & Publications</Link>
              </li>
              <li>
                <Link to="/faculty/profile">Profile</Link>
              </li>
            </ul>
          </nav>
        </aside>
        
        <main className="content">
          <Outlet />
        </main>
      </div>
      
      <footer>
        <p>&copy; {new Date().getFullYear()} College ERP Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FacultyLayout;