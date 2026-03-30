const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const axios = require('axios');
const auth = require('../middleware/auth');

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// @route   POST /api/donations/initialize
// @desc    Initialize a Paystack payment
router.post('/initialize', async (req, res) => {
  const { amount, email, donorName } = req.body;

  try {
    // Initialize transaction with Paystack
    const response = await axios.post(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      email,
      amount: amount * 100, // Paystack amount is in kobo
      metadata: { donorName }
    }, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
    });

    // Save pending donation record
    const donation = new Donation({
      donorName,
      email,
      amount,
      reference: response.data.data.reference,
      status: 'pending'
    });
    await donation.save();

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: 'Payment initialization failed' });
  }
});

// @route   GET /api/donations/verify/:reference
// @desc    Verify Paystack payment
router.get('/verify/:reference', async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await axios.get(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
    });

    const data = response.data.data;

    // Update donation record
    const donation = await Donation.findOne({ reference });
    if (donation && data.status === 'success') {
      donation.status = 'success';
      donation.paidAt = new Date(data.paid_at);
      donation.channel = data.channel;
      await donation.save();
    }

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Verification failed' });
  }
});

// @route   GET /api/donations
// @desc    Get all donations (Admin)
router.get('/', auth, async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/donations/stats
// @desc    Get donation stats (Admin)
router.get('/stats', auth, async (req, res) => {
  try {
    const totalRaised = await Donation.aggregate([
      { $match: { status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalCount = await Donation.countDocuments({ status: 'success' });
    
    res.json({
      totalRaised: totalRaised[0]?.total || 0,
      totalCount
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
