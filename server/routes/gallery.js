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
// @desc    Add a gallery image (Admin)
// Expects 'image' file field + other data in body
router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const { caption, category } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const newImage = new GalleryImage({
      url: req.file.path, // Cloudinary secure_url provided by multer-storage-cloudinary
      caption,
      category
    });
    
    await newImage.save();
    res.status(201).json(newImage);
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
