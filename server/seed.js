require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding');

    const adminExists = await Admin.findOne({ email: 'admin@tech4all.com' });
    if (adminExists) {
      console.log('⚠️ Admin already exists. Skipping seed.');
      process.exit();
    }

    const admin = new Admin({
      name: 'Tech4All Admin',
      email: 'admin@tech4all.com',
      password: 'password123', // This will be hashed by the pre-save hook
      role: 'admin',
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@tech4all.com');
    console.log('🔑 Password: password123');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();
