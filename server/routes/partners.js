const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');
const auth = require('../middleware/auth');

// GET all active partners (Public)
router.get('/', async (req, res) => {
  try {
    const query = req.query.admin === 'true' ? {} : { isActive: true };
    const partners = await Partner.find(query).sort({ order: 1 });
    res.json(partners);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

const { upload } = require('../utils/cloudinary');

// POST create partner (Admin)
router.post('/', [auth, upload.single('logo')], async (req, res) => {
  try {
    const partnerData = { ...req.body };
    
    let finalOrder = parseInt(partnerData.order);
    if (isNaN(finalOrder)) {
      const lastPartner = await Partner.findOne().sort('-order');
      finalOrder = lastPartner ? (lastPartner.order || 0) + 1 : 1;
    }
    partnerData.order = finalOrder;

    if (req.file) {
      partnerData.logoUrl = req.file.path;
    }
    const partner = new Partner(partnerData);
    await partner.save();
    res.status(201).json(partner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

// PUT update partner (Admin)
router.put('/:id', [auth, upload.single('logo')], async (req, res) => {
  try {
    const partnerData = { ...req.body };
    if (req.file) {
      partnerData.logoUrl = req.file.path;
    }
    const partner = await Partner.findByIdAndUpdate(req.params.id, partnerData, { new: true });
    res.json(partner);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// DELETE partner (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Partner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
