import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="header" id="main-header">
      <Link to="/" className="header-logo">
        <span className="logo-icon">⚡</span>
        TEAM ANTI CODERS
      </Link>
      <nav className="header-nav" id="main-nav">
        <Link
          to="/"
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
          id="nav-home"
        >
          Home
        </Link>
        <Link
          to="/add-member"
          className={`nav-link ${isActive('/add-member') ? 'active' : ''}`}
          id="nav-add-member"
        >
          Add Member
        </Link>
        <Link
          to="/members"
          className={`nav-link ${isActive('/members') ? 'active' : ''}`}
          id="nav-members"
        >
          Members
        </Link>
      </nav>
    </header>
  );
}

export default Header;
