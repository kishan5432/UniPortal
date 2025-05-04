import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TNPLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="tnp-layout">
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
                <Link to="/tnp/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/tnp/companies">Company Management</Link>
              </li>
              <li>
                <Link to="/tnp/jobs">Job/Internship Management</Link>
              </li>
              <li>
                <Link to="/tnp/students">Student Management</Link>
              </li>
              <li>
                <Link to="/tnp/events">Event Management</Link>
              </li>
              <li>
                <Link to="/tnp/reports">Reports & Analytics</Link>
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

export default TNPLayout;