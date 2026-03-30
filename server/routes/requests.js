const express = require('express');
const router = express.Router();
const CourseRequest = require('../models/CourseRequest');
const auth = require('../middleware/auth');

// @route   POST /api/requests
// @desc    Request a program (Public)
router.post('/', async (req, res) => {
  const { name, email, phone, programName, message } = req.body;

  try {
    const newRequest = new CourseRequest({ name, email, phone, programName, message });
    await newRequest.save();
    res.status(201).json({ message: 'Request submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/requests
// @desc    Get all program requests (Admin)
router.get('/', auth, async (req, res) => {
  try {
    const requests = await CourseRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/requests/:id
// @desc    Update request status (Admin)
router.patch('/:id', auth, async (req, res) => {
  const { status } = req.body;
  try {
    const request = await CourseRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
