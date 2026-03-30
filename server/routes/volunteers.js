const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const auth = require('../middleware/auth');

// POST submit volunteer application (Public)
router.post('/', async (req, res) => {
  const { name, email, skills } = req.body;
  try {
    const volunteer = new Volunteer({ name, email, skills });
    await volunteer.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all volunteer applications (Admin)
router.get('/', auth, async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH update status (Admin)
router.patch('/:id', auth, async (req, res) => {
  const { status, isRead } = req.body;
  try {
    const update = {};
    if (status) update.status = status;
    if (isRead !== undefined) update.isRead = isRead;
    const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(volunteer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE volunteer (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
