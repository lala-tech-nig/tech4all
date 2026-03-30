const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donorName: { type: String, default: 'Anonymous' },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'NGN' },
  reference: { type: String, required: true, unique: true },
  status: { type: String, default: 'pending' }, // pending, success, failed
  channel: { type: String }, // card, bank_transfer, etc.
  paidAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Donation', DonationSchema);
