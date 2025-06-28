import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, Phone, Shield, Heart, Users, User as UserIcon, CheckCircle, LogOut } from 'lucide-react';
import './UI/Header.css';

const Header = ({ onNav, isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNav = (section) => {
    if (onNav) {
      onNav(section);
    } else {
      // If not on landing page, navigate to landing page and pass section
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: section } });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('tapsos_logged_in');
    localStorage.removeItem('tapsos_user_email');
    localStorage.removeItem('tapsos_user_name');
    navigate('/');
    window.location.reload(); // Ensures UI updates everywhere
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => handleNav ? handleNav('home') : navigate('/') }>
          <Shield size={32} className="logo-icon" />
          <h1>TapSOS</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <ul className="nav-list">
            <li><button onClick={() => handleNav('home')}>Home</button></li>
            <li><button onClick={() => handleNav('about')}>About</button></li>
            <li><button onClick={() => handleNav('emergency')}>Emergency</button></li>
            <li><button onClick={() => handleNav('contact')}>Contact</button></li>
          </ul>
        </nav>

        {/* Login/Profile Button */}
        {isLoggedIn ? (
          <div className="profile-status-group">
            <div className="profile-status">
              <UserIcon size={24} className="profile-icon" />
              <span className="logged-in-status"><CheckCircle size={16} style={{marginRight: 4}}/>Logged in</span>
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Log out">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <button className="login-btn" onClick={handleLoginClick}>
            <LogIn size={20} />
            <span>Login</span>
          </button>
        )}

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-mobile-list">
          <li><button onClick={() => handleNav('home')}>Home</button></li>
          <li><button onClick={() => handleNav('about')}>About</button></li>
          <li><button onClick={() => handleNav('emergency')}>Emergency</button></li>
          <li><button onClick={() => handleNav('contact')}>Contact</button></li>
          <li className="mobile-login">
            {isLoggedIn ? (
              <div className="profile-status-group">
                <div className="profile-status">
                  <UserIcon size={20} className="profile-icon" />
                  <span className="logged-in-status"><CheckCircle size={14} style={{marginRight: 2}}/>Logged in</span>
                </div>
                <button className="logout-btn" onClick={handleLogout} title="Log out">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button onClick={handleLoginClick}>
                <LogIn size={20} />
                <span>Login</span>
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
