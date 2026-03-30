const mongoose = require('mongoose');

const HeroSlideSchema = new mongoose.Schema({
  src: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('HeroSlide', HeroSlideSchema);
