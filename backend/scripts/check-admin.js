import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Check if admin exists
    const admin = await User.findOne({ email: 'admin@luxstay.com' });
    
    if (!admin) {
      console.log('❌ Admin user does not exist!');
      console.log('Creating admin user...\n');
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      const newAdmin = await User.create({
        name: 'Admin User',
        email: 'admin@luxstay.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      console.log('✅ Admin user created:');
      console.log({
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role
      });
    } else {
      console.log('✅ Admin user found:');
      console.log({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        banned: admin.banned
      });
      
      // Test password
      const isMatch = await bcrypt.compare('admin123', admin.password);
      console.log(`\n🔑 Password 'admin123' match: ${isMatch ? '✅ YES' : '❌ NO'}`);
      
      if (!isMatch) {
        console.log('\n⚠️  Password mismatch! Updating password...');
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash('admin123', salt);
        await admin.save();
        console.log('✅ Password updated successfully!');
      }
    }

    // Also check regular user
    console.log('\n' + '='.repeat(50) + '\n');
    const user = await User.findOne({ email: 'user@luxstay.com' });
    
    if (!user) {
      console.log('❌ Regular user does not exist!');
      console.log('Creating regular user...\n');
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('user123', salt);
      
      const newUser = await User.create({
        name: 'Test User',
        email: 'user@luxstay.com',
        password: hashedPassword,
        role: 'user'
      });
      
      console.log('✅ Regular user created:');
      console.log({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      });
    } else {
      console.log('✅ Regular user found:');
      console.log({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        banned: user.banned
      });
      
      // Test password
      const isMatch = await bcrypt.compare('user123', user.password);
      console.log(`\n🔑 Password 'user123' match: ${isMatch ? '✅ YES' : '❌ NO'}`);
      
      if (!isMatch) {
        console.log('\n⚠️  Password mismatch! Updating password...');
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash('user123', salt);
        await user.save();
        console.log('✅ Password updated successfully!');
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkAdmin();
