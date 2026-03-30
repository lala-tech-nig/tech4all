const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/ContactSubmission');
const auth = require('../middleware/auth');

// @route   POST /api/contacts
// @desc    Submit a contact form (Public)
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const newSubmission = new ContactSubmission({ name, email, phone, message });
    await newSubmission.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/contacts
// @desc    Get all contact submissions (Admin)
router.get('/', auth, async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/contacts/:id/read
// @desc    Mark a submission as read (Admin)
router.patch('/:id/read', auth, async (req, res) => {
  try {
    const submission = await ContactSubmission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Not found' });

    submission.isRead = true;
    await submission.save();
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete a submission (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await ContactSubmission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
