import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/members');
      setMembers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch team members. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container" id="loading-spinner">
        <div className="spinner"></div>
        <span className="spinner-text">Loading team members...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state" id="error-state">
        <h2>⚠️ Something went wrong</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchMembers}>
          Try Again
        </button>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="empty-state" id="empty-state">
        <div className="empty-state-icon">👥</div>
        <h2>No Team Members Yet</h2>
        <p>Start building your team by adding the first member.</p>
        <Link to="/add-member" className="btn btn-primary">
          ✦ Add First Member
        </Link>
      </div>
    );
  }

  return (
    <div className="members-page" id="members-page">
      <div className="members-header">
        <h1>Meet Our <span className="gradient-text">Amazing Team</span></h1>
        <p>{members.length} team member{members.length !== 1 ? 's' : ''} and counting</p>
      </div>

      <div className="members-grid" id="members-grid">
        {members.map((member) => (
          <Link
            to={`/members/${member._id}`}
            key={member._id}
            className="member-card"
            id={`member-card-${member._id}`}
          >
            {member.image ? (
              <img
                src={`http://localhost:5000/uploads/${member.image}`}
                alt={member.name}
                className="member-card-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className="placeholder-image member-card-image"
              style={{ display: member.image ? 'none' : 'flex' }}
            >
              {member.name ? member.name.charAt(0).toUpperCase() : '?'}
            </div>
            <div className="member-card-body">
              <div className="member-card-name">{member.name}</div>
              <div className="member-card-degree">
                {member.degree || 'No degree specified'} {member.year ? `• ${member.year}` : ''}
              </div>
              <div className="member-card-footer">
                <span className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                  View Details →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ViewMembers;
