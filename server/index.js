require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // Auto-seed Admin
    try {
      const Admin = require('./models/Admin');
      const email = 'tech4all@tech4all.com.ng';
      const adminExists = await Admin.findOne({ email });
      if (!adminExists) {
        const newAdmin = new Admin({
          name: 'Tech4All Main Admin',
          email,
          password: 'Lalatech2021', // Pre-save hook hashes this
          role: 'admin'
        });
        await newAdmin.save();
        console.log('🎉 Primary admin account seeded successfully!');
      } else {
        // Update password if needed to match requested credentials
        adminExists.password = 'Lalatech2021';
        await adminExists.save();
        console.log('✨ Admin credentials verified/updated.');
      }
    } catch (seedErr) {
      console.error('❌ Admin seeding failed:', seedErr.message);
    }
  })
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/requests', require('./routes/requests'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/donations', require('./routes/donations'));
app.use('/api/hero-slides', require('./routes/heroSlides'));
app.use('/api/hall-of-fame', require('./routes/hallOfFame'));
app.use('/api/partners', require('./routes/partners'));
app.use('/api/volunteers', require('./routes/volunteers'));
app.use('/api/settings', require('./routes/settings'));

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
