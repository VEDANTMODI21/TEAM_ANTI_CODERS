const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  rollNumber: {
    type: String,
    trim: true
  },
  year: {
    type: String,
    trim: true
  },
  degree: {
    type: String,
    trim: true
  },
  aboutProject: {
    type: String,
    trim: true
  },
  hobbies: {
    type: String,
    trim: true
  },
  certificate: {
    type: String,
    trim: true
  },
  internship: {
    type: String,
    trim: true
  },
  aboutYourAim: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Member', memberSchema);
