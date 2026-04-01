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

const { upload } = require('../utils/cloudinary');

// POST create slide (Admin)
router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const { title, subtitle, order, isActive } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const slide = new HeroSlide({
      src: req.file.path,
      title,
      subtitle,
      order: parseInt(order),
      isActive: isActive === 'true' // FormData sends boolean as string
    });
    
    await slide.save();
    res.status(201).json(slide);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

// PUT update slide (Admin)
router.put('/:id', [auth, upload.single('image')], async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.src = req.file.path;
    }
    
    // Convert boolean string if present
    if (updateData.isActive) {
      updateData.isActive = updateData.isActive === 'true';
    }

    const slide = await HeroSlide.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(slide);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
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
