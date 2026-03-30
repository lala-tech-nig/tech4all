const mongoose = require('mongoose');

const SiteSettingsSchema = new mongoose.Schema({
  contact: {
    address: { type: String, default: '12 LALA TECH Hub, Olambe-Akute, Ogun State, Nigeria' },
    phone: { type: String, default: '+234 812 144 4306' },
    email: { type: String, default: 'lalatechnigltd@gmail.com' },
  },
  socials: {
    facebook: { type: String, default: '#' },
    twitter: { type: String, default: '#' },
    instagram: { type: String, default: '#' },
    youtube: { type: String, default: '#' },
  },
  about: {
    footer_text: { type: String, default: 'Tech4All by LALA TECH — empowering youths and communities worldwide with free technology training.' },
    mission_statement: { type: String, default: '' },
  },
  volunteerRoles: [
    {
      title: { type: String, required: true },
      desc: { type: String, required: true },
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
