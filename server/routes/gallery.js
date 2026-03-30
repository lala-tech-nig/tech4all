const express = require('express');
const router = express.Router();
const GalleryImage = require('../models/GalleryImage');
const auth = require('../middleware/auth');

// @route   GET /api/gallery
// @desc    Get all gallery images (Public)
router.get('/', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/gallery
// @desc    Add a gallery image (Admin)
router.post('/', auth, async (req, res) => {
  try {
    const newImage = new GalleryImage(req.body);
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete a gallery image (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await GalleryImage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
