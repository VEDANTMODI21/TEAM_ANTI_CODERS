import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    // Fetch member count for stats
    axios.get('http://localhost:5000/api/members')
      .then(res => setMemberCount(res.data.length))
      .catch(() => setMemberCount(0));
  }, []);

  return (
    <div className="home-container" id="home-page">
      <div className="home-badge">
        <span className="pulse"></span>
        Student Team Management Platform
      </div>

      <h1 className="home-title">
        Meet the <span className="gradient-text">Anti Coders</span>
      </h1>

      <p className="home-subtitle">
        A powerful team management platform designed for students. Manage your
        team members, track projects, and showcase achievements — all in one
        beautiful interface.
      </p>

      <div className="home-buttons">
        <Link to="/add-member" className="btn btn-primary btn-lg" id="btn-add-member">
          ✦ Add Member
        </Link>
        <Link to="/members" className="btn btn-secondary btn-lg" id="btn-view-members">
          👥 View Members
        </Link>
      </div>

      <div className="home-stats">
        <div className="stat-item">
          <div className="stat-number">{memberCount}</div>
          <div className="stat-label">Team Members</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">∞</div>
          <div className="stat-label">Possibilities</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Collaboration</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
