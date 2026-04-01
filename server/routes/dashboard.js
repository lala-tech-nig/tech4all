const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ContactSubmission = require('../models/ContactSubmission');
const CourseRequest = require('../models/CourseRequest');
const Course = require('../models/Course');
const Donation = require('../models/Donation');

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics (Admin)
router.get('/stats', auth, async (req, res) => {
  try {
    const totalContacts = await ContactSubmission.countDocuments();
    const courseRequests = await CourseRequest.countDocuments();
    const activePrograms = await Course.countDocuments({ isActive: true });
    
    const donations = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalDonations = donations.length > 0 ? donations[0].total : 0;

    res.json({
      totalContacts,
      courseRequests,
      activePrograms,
      totalDonations: `₦${(totalDonations / 1000000).toFixed(1)}M`, // Formatted for the UI
      rawDonations: totalDonations
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server statistical error' });
  }
});

// @route   GET /api/dashboard/recent
// @desc    Get recent submissions (Admin)
router.get('/recent', auth, async (req, res) => {
  try {
    const recentContacts = await ContactSubmission.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject createdAt');
      
    const recentRequests = await CourseRequest.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('courseId', 'title');

    res.json({
      contacts: recentContacts,
      requests: recentRequests
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching recent data' });
  }
});

module.exports = router;
