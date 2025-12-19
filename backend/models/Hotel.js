import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hotel name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
  },
  amenities: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  rooms: {
    type: Number,
    required: [true, 'Number of rooms is required'],
    min: 0
  },
  category: {
    type: String,
    enum: ['luxury', 'beach', 'heritage', 'mountain', 'business'],
    default: 'luxury'
  }
}, {
  timestamps: true
});

// Indexes for faster queries
hotelSchema.index({ name: 'text', location: 'text' });
hotelSchema.index({ category: 1 });
hotelSchema.index({ price: 1 });

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
