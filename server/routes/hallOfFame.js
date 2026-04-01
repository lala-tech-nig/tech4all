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

const { upload } = require('../utils/cloudinary');

// POST create entry (Admin)
router.post('/', [auth, upload.single('photo')], async (req, res) => {
  try {
    const entryData = { ...req.body };
    if (req.file) {
      entryData.photo = req.file.path;
    }
    const entry = new HallOfFameEntry(entryData);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

// PUT update entry (Admin)
router.put('/:id', [auth, upload.single('photo')], async (req, res) => {
  try {
    const entryData = { ...req.body };
    if (req.file) {
      entryData.photo = req.file.path;
    }
    const entry = await HallOfFameEntry.findByIdAndUpdate(req.params.id, entryData, { new: true });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
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
