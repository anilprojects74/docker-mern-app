import React, { useState, useEffect, useRef } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaTachometerAlt, FaUser, FaCog } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import useSetAuthHeaders from '../hooks/useSetAuthHeaders';

const sidebarVariants = {
  hidden: { x: -260, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'ease', stiffness: 120 } },
  exit: { x: -260, opacity: 0, transition: { duration: 0.3 } }
};

const MainLayout = ({ children }) => {
  useSetAuthHeaders();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef();

  // Close sidebar automatically on small screens
  useEffect(() => {
    const mdBreakpoint = 768; // px

    function handleResize() {
      if (window.innerWidth < mdBreakpoint) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // check on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close user menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  const handleLogout = () => {
    alert('Logged out!');
    localStorage.removeItem('auth_token');
    navigate('/login');
    window.location.reload();
  };

  // Example country info (you can enhance with a real library or API)
  const country = {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
  };

  return (
    <div
      className="main-layout"
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        position: 'relative',
      }}
    >
      {/* Sidebar toggle button */}
      <div
        onClick={toggleSidebar}
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          background: '#1f4037',
          borderRadius: '6px',
          padding: 8,
          color: 'white',
          cursor: 'pointer',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          userSelect: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
        title={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Sidebar with animation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            style={{
              width: 250,
              background: 'linear-gradient(to bottom, #1f4037, #99f2c8)',
              boxShadow: '2px 0 12px rgba(0,0,0,0.15)',
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              padding: 20,
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 900,
              userSelect: 'none',
            }}
          >
            <h4 style={{ marginBottom: '2rem', fontWeight: '700', letterSpacing: '1.2px' }}>MyApp</h4>
            <Nav className="flex-column" style={{ flexGrow: 1 }}>
              <Nav.Link href="#" style={navStyle}>
                <FaTachometerAlt style={iconStyle} /> Dashboard
              </Nav.Link>
              <Nav.Link href="#" style={navStyle}>
                <FaUser style={iconStyle} /> Profile
              </Nav.Link>
              <Nav.Link href="#" style={navStyle}>
                <FaCog style={iconStyle} /> Settings
              </Nav.Link>
            </Nav>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top-right user menu */}
      <div
        ref={userMenuRef}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          userSelect: 'none',
        }}
      >
        <div
          onClick={toggleUserMenu}
          style={{
            cursor: 'pointer',
            backgroundColor: '#1f4037',
            color: 'white',
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
          title="User menu"
        >
          <FaUser />
        </div>

        {/* Dropdown */}
        {userMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              marginTop: 8,
              backgroundColor: 'white',
              color: '#1f4037',
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              minWidth: 160,
              overflow: 'hidden',
              fontSize: '0.9rem',
              userSelect: 'auto',
            }}
          >
            <div
              style={{
                padding: '10px 16px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>{country.flag}</span>
              <span>{country.name}</span>
            </div>

            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '10px 16px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#1f4037',
                fontWeight: 600,
                outline: 'none',
                userSelect: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Logout
            </button>
          </motion.div>
        )}
      </div>

      {/* Main Content */}
      <main
        style={{
          marginLeft: isSidebarOpen ? 250 : 0,
          flexGrow: 1,
          padding: 20,
          transition: 'margin-left 0.4s ease',
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
          width: '100%',
        }}
      >
        {children}
      </main>
    </div>
  );
};

const navStyle = {
  color: 'white',
  marginBottom: '10px',
  fontWeight: 600,
  fontSize: '1.1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const iconStyle = {
  fontSize: '1.2rem',
};

export default MainLayout;
