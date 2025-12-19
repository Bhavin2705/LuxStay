// In-memory database (replace with real database in production)
class Database {
  constructor() {
    this.users = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@luxstay.com',
        password: '$2a$10$rOj5Z5Z5Z5Z5Z5Z5Z5Z5Ze5J5J5J5J5J5J5J5J5J5J5J5J5J5J5J5', // admin123
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Test User',
        email: 'user@luxstay.com',
        password: '$2a$10$rOj5Z5Z5Z5Z5Z5Z5Z5Z5Ze5J5J5J5J5J5J5J5J5J5J5J5J5J5J5J5', // user123
        role: 'user',
        createdAt: new Date().toISOString()
      }
    ];

    this.hotels = [
      {
        id: '1',
        name: 'The Grand Palace',
        location: 'Mumbai, Maharashtra',
        price: 12500,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
        description: 'Luxury 5-star hotel in the heart of Mumbai',
        rooms: 150,
        category: 'luxury',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Coastal Retreat',
        location: 'Goa',
        price: 8500,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
        amenities: ['WiFi', 'Beach Access', 'Restaurant', 'Bar'],
        description: 'Beachfront property with stunning ocean views',
        rooms: 80,
        category: 'beach',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Heritage Haveli',
        location: 'Jaipur, Rajasthan',
        price: 9500,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        amenities: ['WiFi', 'Traditional Cuisine', 'Cultural Shows'],
        description: 'Experience royal Rajasthani hospitality',
        rooms: 45,
        category: 'heritage',
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Mountain View Resort',
        location: 'Manali, Himachal Pradesh',
        price: 7500,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        amenities: ['WiFi', 'Bonfire', 'Trek Guides', 'Restaurant'],
        description: 'Serene mountain resort with breathtaking views',
        rooms: 60,
        category: 'mountain',
        createdAt: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Urban Suites',
        location: 'Bangalore, Karnataka',
        price: 6500,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
        amenities: ['WiFi', 'Business Center', 'Gym', 'Restaurant'],
        description: 'Modern business hotel in tech city',
        rooms: 120,
        category: 'business',
        createdAt: new Date().toISOString()
      },
      {
        id: '6',
        name: 'Lake Palace Resort',
        location: 'Udaipur, Rajasthan',
        price: 15000,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
        amenities: ['WiFi', 'Lake View', 'Spa', 'Fine Dining', 'Pool'],
        description: 'Floating palace on the serene Lake Pichola',
        rooms: 30,
        category: 'luxury',
        createdAt: new Date().toISOString()
      }
    ];

    this.bookings = [];
  }

  // User methods
  findUserByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  createUser(user) {
    const newUser = { ...user, id: Date.now().toString(), createdAt: new Date().toISOString() };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updates) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates, updatedAt: new Date().toISOString() };
      return this.users[index];
    }
    return null;
  }

  getAllUsers() {
    return this.users.map(({ password, ...user }) => user);
  }

  // Hotel methods
  getAllHotels() {
    return this.hotels;
  }

  findHotelById(id) {
    return this.hotels.find(h => h.id === id);
  }

  createHotel(hotel) {
    const newHotel = { ...hotel, id: Date.now().toString(), createdAt: new Date().toISOString() };
    this.hotels.push(newHotel);
    return newHotel;
  }

  updateHotel(id, updates) {
    const index = this.hotels.findIndex(h => h.id === id);
    if (index !== -1) {
      this.hotels[index] = { ...this.hotels[index], ...updates, updatedAt: new Date().toISOString() };
      return this.hotels[index];
    }
    return null;
  }

  deleteHotel(id) {
    const index = this.hotels.findIndex(h => h.id === id);
    if (index !== -1) {
      this.hotels.splice(index, 1);
      return true;
    }
    return false;
  }

  // Booking methods
  getAllBookings() {
    return this.bookings;
  }

  findBookingById(id) {
    return this.bookings.find(b => b.id === id);
  }

  findBookingsByUser(userId) {
    return this.bookings.filter(b => b.userId === userId);
  }

  createBooking(booking) {
    const newBooking = { ...booking, id: Date.now().toString(), createdAt: new Date().toISOString(), status: 'confirmed' };
    this.bookings.push(newBooking);
    return newBooking;
  }

  updateBooking(id, updates) {
    const index = this.bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      this.bookings[index] = { ...this.bookings[index], ...updates, updatedAt: new Date().toISOString() };
      return this.bookings[index];
    }
    return null;
  }
}

// Create single instance
const db = new Database();

export default db;
