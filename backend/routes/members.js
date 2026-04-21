const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Member = require('../models/Member');

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg and .png files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// POST /api/members - Create a new member
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const memberData = {
      name: req.body.name,
      rollNumber: req.body.rollNumber,
      year: req.body.year,
      degree: req.body.degree,
      aboutProject: req.body.aboutProject,
      hobbies: req.body.hobbies,
      certificate: req.body.certificate,
      internship: req.body.internship,
      aboutYourAim: req.body.aboutYourAim,
      image: req.file ? req.file.filename : ''
    };

    const member = new Member(memberData);
    const savedMember = await member.save();
    res.status(201).json(savedMember);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error while creating member', error: error.message });
  }
});

// GET /api/members - Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching members', error: error.message });
  }
});

// GET /api/members/:id - Get a single member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid member ID format' });
    }
    res.status(500).json({ message: 'Server error while fetching member', error: error.message });
  }
});

// DELETE /api/members/:id - Delete a member
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Delete image file if exists
    if (member.image) {
      const fs = require('fs');
      const imagePath = path.join(__dirname, '..', 'uploads', member.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Member.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid member ID format' });
    }
    res.status(500).json({ message: 'Server error while deleting member', error: error.message });
  }
});

module.exports = router;
