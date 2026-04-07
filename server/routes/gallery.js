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

const { upload } = require('../utils/cloudinary');

// @route   POST /api/gallery
// @desc    Add gallery images (Admin)
// Expects 'images' file array + other data in body
router.post('/', [auth, upload.array('images', 20)], async (req, res) => {
  try {
    const { caption, category } = req.body;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const savedImages = [];
    for (const file of req.files) {
      const newImage = new GalleryImage({
        url: file.path, 
        caption,
        category
      });
      await newImage.save();
      savedImages.push(newImage);
    }
    
    res.status(201).json({ message: `${savedImages.length} images added`, images: savedImages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server upload error' });
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
