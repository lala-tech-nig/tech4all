require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

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
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed.');
    process.exit(0);
  }
};

seedAdmin();
