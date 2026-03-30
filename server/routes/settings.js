const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const auth = require('../middleware/auth');

// GET all site settings (Public)
router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      // Create default if none exists
      settings = new SiteSettings({
        volunteerRoles: [
          { title: '🎤 Facilitators', desc: 'Facilitators are the heart of our training programs.' },
          { title: '🛠 Field Support', desc: 'Field Support volunteers ensure our training grounds run smoothly.' },
          { title: '📢 Promoters', desc: 'Promoters are our community champions.' },
          { title: '🤝 Coordinators', desc: 'Coordinators oversee program flow.' }
        ]
      });
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update site settings (Admin)
router.put('/', auth, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (settings) {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, { new: true });
    } else {
      settings = new SiteSettings(req.body);
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
