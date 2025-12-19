import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const updateUserName = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update user by email
    const email = 'bhavinjain2705@gmail.com';
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      process.exit(1);
    }

    console.log('Current user data:', {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    // Update the name if it's missing
    if (!user.name) {
      user.name = 'Bhavin Jain'; // Change this to the desired name
      await user.save();
      console.log('✓ User name updated successfully!');
      console.log('Updated user data:', {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      });
    } else {
      console.log('User already has a name:', user.name);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateUserName();
