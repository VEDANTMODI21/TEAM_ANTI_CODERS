import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddMember() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    year: '',
    degree: '',
    aboutProject: '',
    hobbies: '',
    certificate: '',
    internship: '',
    aboutYourAim: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, image: 'Only JPG, JPEG, and PNG files are allowed' }));
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'Image must be less than 5MB' }));
      return;
    }

    setImage(file);
    setErrors(prev => ({ ...prev, image: '' }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (image) {
        data.append('image', image);
      }

      await axios.post('http://localhost:5000/api/members', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({ text: '🎉 Member added successfully!', type: 'success' });

      // Reset form
      setFormData({
        name: '',
        rollNumber: '',
        year: '',
        degree: '',
        aboutProject: '',
        hobbies: '',
        certificate: '',
        internship: '',
        aboutYourAim: ''
      });
      setImage(null);
      setImagePreview(null);

      // Navigate after a short delay
      setTimeout(() => {
        navigate('/members');
      }, 1500);

    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to add member. Please try again.';
      setMessage({ text: `❌ ${errorMsg}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page" id="add-member-page">
      <div className="form-container">
        <div className="form-header">
          <h1>Add New <span className="gradient-text">Member</span></h1>
          <p>Fill in the details to add a new team member</p>
        </div>

        {message.text && (
          <div className={`form-message ${message.type}`} id="form-message">
            {message.text}
          </div>
        )}

        <div className="form-card">
          <form onSubmit={handleSubmit} id="add-member-form">
            <div className="form-grid">
              {/* Name */}
              <div className="form-group">
                <label htmlFor="name">Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              {/* Roll Number */}
              <div className="form-group">
                <label htmlFor="rollNumber">Roll Number</label>
                <input
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  placeholder="e.g., 21CS101"
                />
              </div>

              {/* Year */}
              <div className="form-group">
                <label htmlFor="year">Year</label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g., 3rd Year"
                />
              </div>

              {/* Degree */}
              <div className="form-group">
                <label htmlFor="degree">Degree</label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="e.g., B.Tech CSE"
                />
              </div>

              {/* About Project */}
              <div className="form-group full-width">
                <label htmlFor="aboutProject">About Project</label>
                <textarea
                  id="aboutProject"
                  name="aboutProject"
                  value={formData.aboutProject}
                  onChange={handleChange}
                  placeholder="Describe your current project..."
                />
              </div>

              {/* Hobbies */}
              <div className="form-group full-width">
                <label htmlFor="hobbies">Hobbies</label>
                <input
                  type="text"
                  id="hobbies"
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleChange}
                  placeholder="e.g., Coding, Reading, Gaming (comma-separated)"
                />
              </div>

              {/* Certificate */}
              <div className="form-group">
                <label htmlFor="certificate">Certificate</label>
                <input
                  type="text"
                  id="certificate"
                  name="certificate"
                  value={formData.certificate}
                  onChange={handleChange}
                  placeholder="e.g., AWS Certified"
                />
              </div>

              {/* Internship */}
              <div className="form-group">
                <label htmlFor="internship">Internship</label>
                <input
                  type="text"
                  id="internship"
                  name="internship"
                  value={formData.internship}
                  onChange={handleChange}
                  placeholder="e.g., Google Summer Intern"
                />
              </div>

              {/* About Your Aim */}
              <div className="form-group full-width">
                <label htmlFor="aboutYourAim">About Your Aim</label>
                <textarea
                  id="aboutYourAim"
                  name="aboutYourAim"
                  value={formData.aboutYourAim}
                  onChange={handleChange}
                  placeholder="What are your career goals and aspirations?"
                />
              </div>

              {/* Image Upload */}
              <div className="form-group full-width">
                <label htmlFor="image">Profile Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleImageChange}
                />
                {errors.image && <span className="form-error">{errors.image}</span>}
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-submit">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
                id="submit-member-btn"
              >
                {loading ? (
                  <>
                    <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></span>
                    Adding Member...
                  </>
                ) : (
                  '✦ Add Member'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMember;
