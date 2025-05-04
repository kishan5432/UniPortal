import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StudentLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="student-layout">
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
                <Link to="/student/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/student/academics">Academic Information</Link>
              </li>
              <li>
                <Link to="/student/finance">Financial Management</Link>
              </li>
              <li>
                <Link to="/student/registration">Course Registration</Link>
              </li>
              <li>
                <Link to="/student/communication">Communication</Link>
              </li>
              <li>
                <Link to="/student/profile">Profile</Link>
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

export default StudentLayout;