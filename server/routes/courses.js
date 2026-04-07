const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const { upload } = require('../utils/cloudinary');

// @route   GET /api/courses
// @desc    Get all courses (Active only for public, all for admin)
router.get('/', async (req, res) => {
  try {
    const isAdmin = req.query.admin === 'true';
    
    // If admin query is present, optionally verify auth
    if (isAdmin) {
      // We can use a soft-auth here or just require the 'auth' middleware
      // actually let's use the 'auth' middleware for admin=true for security
      return auth(req, res, async () => {
        const courses = await Course.find({}).sort({ order: 1 });
        res.json(courses);
      });
    }

    const courses = await Course.find({ isActive: true }).sort({ order: 1 });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/courses
// @desc    Create a new course (Admin)
router.post('/', [auth, upload.single('video')], async (req, res) => {
  try {
    const { title, description, videoUrl, icon, order, isActive } = req.body;
    
    let finalOrder = parseInt(order);
    if (isNaN(finalOrder)) {
      const lastCourse = await Course.findOne().sort('-order');
      finalOrder = lastCourse ? (lastCourse.order || 0) + 1 : 1;
    }

    const courseData = {
      title,
      description,
      videoUrl,
      icon,
      order: finalOrder,
      isActive: isActive === 'true'
    };

    if (req.file) {
      courseData.videoUrl = req.file.path;
    }



    const newCourse = new Course(courseData);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update a course (Admin)
router.put('/:id', [auth, upload.single('video')], async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (req.file) {
      updateData.videoUrl = req.file.path;
    }


    if (updateData.order) updateData.order = parseInt(updateData.order);
    if (updateData.isActive !== undefined) updateData.isActive = updateData.isActive === 'true';

    const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete a course (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
