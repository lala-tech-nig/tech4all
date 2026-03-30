const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const email = 'tech4all@tech4all.com.ng';
    const password = 'Lalatech2021';
    const name = 'Tech4All Main Admin';

    // Check if admin already exists
    let admin = await Admin.findOne({ email });

    if (admin) {
      console.log('🔄 Admin already exists, updating password...');
      admin.password = password; // Pre-save hook will hash this
      await admin.save();
      console.log('✨ Admin credentials updated successfully!');
    } else {
      console.log('🆕 Creating new admin account...');
      admin = new Admin({
        name,
        email,
        password,
        role: 'admin'
      });
      await admin.save();
      console.log('🎉 Admin account created successfully!');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedAdmin();
