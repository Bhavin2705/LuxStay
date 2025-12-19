import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Suppress index warnings
    mongoose.set('strictQuery', false);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Seed initial data if database is empty
    await seedDatabase();
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Seed database with initial data
const seedDatabase = async () => {
  try {
    const User = (await import('../models/User.js')).default;
    const Hotel = (await import('../models/Hotel.js')).default;
    
    const userCount = await User.countDocuments();
    const hotelCount = await Hotel.countDocuments();

    // Seed users if none exist
    if (userCount === 0) {
      const bcrypt = (await import('bcryptjs')).default;
      
      const adminPassword = await bcrypt.hash('admin123', 10);
      const userPassword = await bcrypt.hash('user123', 10);

      await User.create([
        {
          name: 'Admin User',
          email: 'admin@luxstay.com',
          password: adminPassword,
          role: 'admin'
        },
        {
          name: 'Test User',
          email: 'user@luxstay.com',
          password: userPassword,
          role: 'user'
        }
      ]);
      console.log('✅ Demo users seeded');
    }

    // Seed hotels if none exist
    if (hotelCount === 0) {
      await Hotel.create([
        {
          name: 'The Grand Palace',
          location: 'Mumbai, Maharashtra',
          price: 12500,
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
          description: 'Luxury 5-star hotel in the heart of Mumbai',
          rooms: 150,
          category: 'luxury'
        },
        {
          name: 'Coastal Retreat',
          location: 'Goa',
          price: 8500,
          rating: 4.6,
          image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
          amenities: ['WiFi', 'Beach Access', 'Restaurant', 'Bar'],
          description: 'Beachfront property with stunning ocean views',
          rooms: 80,
          category: 'beach'
        },
        {
          name: 'Heritage Haveli',
          location: 'Jaipur, Rajasthan',
          price: 9500,
          rating: 4.7,
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
          amenities: ['WiFi', 'Traditional Cuisine', 'Cultural Shows'],
          description: 'Experience royal Rajasthani hospitality',
          rooms: 45,
          category: 'heritage'
        },
        {
          name: 'Mountain View Resort',
          location: 'Manali, Himachal Pradesh',
          price: 7500,
          rating: 4.5,
          image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
          amenities: ['WiFi', 'Bonfire', 'Trek Guides', 'Restaurant'],
          description: 'Serene mountain resort with breathtaking views',
          rooms: 60,
          category: 'mountain'
        },
        {
          name: 'Urban Suites',
          location: 'Bangalore, Karnataka',
          price: 6500,
          rating: 4.4,
          image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
          amenities: ['WiFi', 'Business Center', 'Gym', 'Restaurant'],
          description: 'Modern business hotel in tech city',
          rooms: 120,
          category: 'business'
        },
        {
          name: 'Lake Palace Resort',
          location: 'Udaipur, Rajasthan',
          price: 15000,
          rating: 4.9,
          image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
          amenities: ['WiFi', 'Lake View', 'Spa', 'Fine Dining', 'Pool'],
          description: 'Floating palace on the serene Lake Pichola',
          rooms: 30,
          category: 'luxury'
        }
      ]);
      console.log('✅ Demo hotels seeded');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export default connectDB;
