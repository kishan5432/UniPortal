import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FinanceLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="finance-layout">
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
                <Link to="/finance/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/finance/fees">Fee Management</Link>
              </li>
              <li>
                <Link to="/finance/payroll">Payroll Management</Link>
              </li>
              <li>
                <Link to="/finance/budget">Budget Management</Link>
              </li>
              <li>
                <Link to="/finance/accounts">Accounts Management</Link>
              </li>
              <li>
                <Link to="/finance/reports">Financial Reports</Link>
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

export default FinanceLayout;