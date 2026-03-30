const express = require('express');
const router = express.Router();
const HeroSlide = require('../models/HeroSlide');
const auth = require('../middleware/auth');

// GET all active slides (Public)
router.get('/', async (req, res) => {
  try {
    const query = req.query.admin === 'true' ? {} : { isActive: true };
    const slides = await HeroSlide.find(query).sort({ order: 1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create slide (Admin)
router.post('/', auth, async (req, res) => {
  try {
    const slide = new HeroSlide(req.body);
    await slide.save();
    res.status(201).json(slide);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update slide (Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(slide);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE slide (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await HeroSlide.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
