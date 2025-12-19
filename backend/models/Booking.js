import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  hotelName: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  checkIn: {
    type: Date,
    required: [true, 'Check-in date is required']
  },
  checkOut: {
    type: Date,
    required: [true, 'Check-out date is required']
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: 1
  },
  rooms: {
    type: Number,
    required: [true, 'Number of rooms is required'],
    min: 1
  },
  nights: {
    type: Number,
    required: [true, 'Number of nights is required'],
    min: 1
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: 0
  },
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'confirmed'
  },
  adminRead: {
    type: Boolean,
    default: false
  },
  userRead: {
    type: Boolean,
    default: false
  },
  guestDetails: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    idProofType: { type: String, required: true },
    idNumber: { type: String, required: true },
    specialRequests: { type: String }
  }
}, {
  timestamps: true
});

// Indexes for faster queries
bookingSchema.index({ userId: 1 });
bookingSchema.index({ hotelId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ checkIn: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
