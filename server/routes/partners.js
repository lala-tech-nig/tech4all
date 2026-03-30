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

// POST create partner (Admin)
router.post('/', auth, async (req, res) => {
  try {
    const partner = new Partner(req.body);
    await partner.save();
    res.status(201).json(partner);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update partner (Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(partner);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
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
