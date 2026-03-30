const mongoose = require('mongoose');

const HallOfFameEntrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  photo: { type: String, required: true },
  bio: { type: String, required: true },
  badge: { type: String, required: true },
  category: { type: String, enum: ['volunteer', 'community', 'organization', 'donor'], required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  joined: { type: String, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('HallOfFameEntry', HallOfFameEntrySchema);
