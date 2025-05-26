import React, { useEffect, useState } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import useSetAuthHeaders from '../hooks/useSetAuthHeaders';

const MainLayout = ({ children }) => {

  useSetAuthHeaders()
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setSidebarVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    alert('Logged out!');
    localStorage.removeItem('auth_token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className={`main-layout d-flex ${sidebarVisible ? 'show-sidebar' : ''}`}>
      {/* Sidebar */}
      <div className="sidebar d-none d-md-flex flex-column text-white p-4">
        <h4 className="mb-4">MyApp</h4>
        <Nav className="flex-column">
          <Nav.Link href="#" className="text-white mb-2">Dashboard</Nav.Link>
          <Nav.Link href="#" className="text-white mb-2">Profile</Nav.Link>
          <Nav.Link href="#" className="text-white mb-2">Settings</Nav.Link>
        </Nav>
        <div className="mt-auto">
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-area flex-grow-1 p-4 bg-light">
        {children}
      </div>

      {/* Inline Styles */}
      <style jsx="true">{`
        .main-layout {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          min-height: 100vh;
          transition: padding-left 0.6s ease-out;
          padding-left: 0;
        }

        .main-layout.show-sidebar {
          padding-left: 250px;
        }

        .sidebar {
          width: 250px;
          background: linear-gradient(to bottom, #1f4037, #99f2c8);
          box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          transform: translateX(-260px);
          transition: transform 0.6s ease-out;
          opacity: 0;
        }

        .main-layout.show-sidebar .sidebar {
          transform: translateX(0);
          opacity: 1;
        }

        .content-area {
          overflow-y: auto;
          width: 100%;
          transition: margin-left 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
