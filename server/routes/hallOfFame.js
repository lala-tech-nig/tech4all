const express = require('express');
const router = express.Router();
const HallOfFameEntry = require('../models/HallOfFameEntry');
const auth = require('../middleware/auth');

// GET all active entries (Public)
router.get('/', async (req, res) => {
  try {
    const query = req.query.admin === 'true' ? {} : { isActive: true };
    if (req.query.category) query.category = req.query.category;
    const entries = await HallOfFameEntry.find(query).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create entry (Admin)
router.post('/', auth, async (req, res) => {
  try {
    const entry = new HallOfFameEntry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update entry (Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const entry = await HallOfFameEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE entry (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await HallOfFameEntry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
