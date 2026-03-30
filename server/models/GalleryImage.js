const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String },
  category: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);
