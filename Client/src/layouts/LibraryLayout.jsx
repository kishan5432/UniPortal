import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LibraryLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="library-layout">
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
                <Link to="/library/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/library/catalog">Catalog Management</Link>
              </li>
              <li>
                <Link to="/library/circulation">Circulation Management</Link>
              </li>
              <li>
                <Link to="/library/users">User Management</Link>
              </li>
              <li>
                <Link to="/library/inventory">Inventory Management</Link>
              </li>
              <li>
                <Link to="/library/reports">Reports</Link>
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

export default LibraryLayout;