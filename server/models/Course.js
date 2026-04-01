const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String }, // link to .mp4 or youtube
  imageUrl: { type: String }, // NEW: Course thumbnail upload
  icon: { type: String }, // optional icon class or emoji
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
