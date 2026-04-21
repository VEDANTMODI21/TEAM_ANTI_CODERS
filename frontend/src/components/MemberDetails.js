import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchMember = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/members/${id}`);
      setMember(response.data);
      setError('');
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Member not found.');
      } else {
        setError('Failed to fetch member details.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to remove ${member.name} from the team?`);
    if (!confirmed) return;

    try {
      setDeleting(true);
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      navigate('/members');
    } catch (err) {
      alert('Failed to delete member. Please try again.');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <span className="spinner-text">Loading member details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <h2>{error}</h2>
        <p>The member you're looking for doesn't exist or has been removed.</p>
        <button className="btn btn-primary" onClick={() => navigate('/members')}>
          ← Back to Members
        </button>
      </div>
    );
  }

  if (!member) return null;

  const hobbies = member.hobbies
    ? member.hobbies.split(',').map(h => h.trim()).filter(h => h)
    : [];

  return (
    <div className="details-page" id="member-details-page">
      <div className="details-card">
        {/* Image */}
        <div className="details-image-wrapper">
          {member.image ? (
            <img
              src={`http://localhost:5000/uploads/${member.image}`}
              alt={member.name}
              className="details-image"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="placeholder-image" style={{ fontSize: '5rem' }}>
              {member.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="details-image-overlay"></div>
        </div>

        {/* Body */}
        <div className="details-body">
          <h1 className="details-name">{member.name}</h1>
          <p className="details-subtitle">
            {member.degree || 'No degree'} {member.year ? `• ${member.year}` : ''}
            {member.rollNumber ? ` • ${member.rollNumber}` : ''}
          </p>

          {/* Info Grid */}
          <div className="details-info-grid">
            <div className="details-info-item">
              <div className="details-info-label">Roll Number</div>
              <div className="details-info-value">{member.rollNumber || '—'}</div>
            </div>
            <div className="details-info-item">
              <div className="details-info-label">Year</div>
              <div className="details-info-value">{member.year || '—'}</div>
            </div>
            <div className="details-info-item">
              <div className="details-info-label">Degree</div>
              <div className="details-info-value">{member.degree || '—'}</div>
            </div>
            <div className="details-info-item">
              <div className="details-info-label">Certificate</div>
              <div className="details-info-value">{member.certificate || '—'}</div>
            </div>
          </div>

          {/* Internship */}
          {member.internship && (
            <div className="details-section">
              <div className="details-section-title">Internship</div>
              <div className="details-section-content">{member.internship}</div>
            </div>
          )}

          {/* About Project */}
          {member.aboutProject && (
            <div className="details-section">
              <div className="details-section-title">About Project</div>
              <div className="details-section-content">{member.aboutProject}</div>
            </div>
          )}

          {/* About Your Aim */}
          {member.aboutYourAim && (
            <div className="details-section">
              <div className="details-section-title">About Your Aim</div>
              <div className="details-section-content">{member.aboutYourAim}</div>
            </div>
          )}

          {/* Hobbies */}
          {hobbies.length > 0 && (
            <div className="details-section">
              <div className="details-section-title">Hobbies</div>
              <div className="hobbies-tags">
                {hobbies.map((hobby, index) => (
                  <span key={index} className="hobby-tag">{hobby}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="details-actions">
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/members')}
            id="btn-back-members"
          >
            ← Back to Members
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={deleting}
            id="btn-delete-member"
          >
            {deleting ? 'Deleting...' : '🗑 Delete Member'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemberDetails;
