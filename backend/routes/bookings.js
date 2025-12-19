import express from 'express';
import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';
import { auth, adminAuth } from '../middleware/auth.js';
import { emitBookingNotification, emitUserNotification } from '../socket/socketHandler.js';

const router = express.Router();

router.get('/', [auth, adminAuth], async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('hotelId', 'name location')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
});

router.get('/user/:userId', auth, async (req, res, next) => {
  try {
    if (req.user.userId !== req.params.userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('hotelId', 'name location image')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('hotelId', 'name location image')
      .populate('userId', 'name email');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (booking.userId._id.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    const { hotelId, checkIn, checkOut, guests, rooms, nights, totalPrice, guestDetails, hotelName, userName, userEmail } = req.body;
    if (!hotelId || !checkIn || !checkOut || !guests || !totalPrice) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (isNaN(checkInDate) || isNaN(checkOutDate) || checkOutDate <= checkInDate) {
      return res.status(400).json({ success: false, message: 'Invalid check-in/check-out dates' });
    }

    const overlapping = await Booking.findOne({
      hotelId,
      userId: req.user.userId,
      status: { $ne: 'cancelled' },
      $or: [
        {
          checkIn: { $lt: checkOutDate },
          checkOut: { $gt: checkInDate }
        }
      ]
    });

    if (overlapping) {
      return res.status(400).json({
        success: false,
        message: 'You already have a booking for this hotel that overlaps these dates.'
      });
    }
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }
    const booking = await Booking.create({
      hotelId,
      hotelName: hotelName || hotel.name,
      userId: req.user.userId,
      userName: userName || req.user.name,
      userEmail: userEmail || req.user.email,
      checkIn,
      checkOut,
      guests: parseInt(guests),
      rooms: parseInt(rooms) || Math.ceil(parseInt(guests) / 2),
      nights: parseInt(nights),
      totalPrice: parseFloat(totalPrice),
      guestDetails,
      status: 'confirmed',
      adminRead: false,
      userRead: false
    });
    const populatedBooking = await Booking.findById(booking._id)
      .populate('hotelId', 'name location image')
      .populate('userId', 'name email');
    emitBookingNotification(populatedBooking, 'new');
    emitUserNotification(req.user.userId, 'Booking confirmed successfully!', 'success');
    res.status(201).json({ success: true, message: 'Booking created successfully', data: booking });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/cancel', auth, async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (booking.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled' });
    }
    const checkInDate = new Date(booking.checkIn);
    const now = new Date();
    const hoursDifference = (checkInDate - now) / (1000 * 60 * 60);
    if (hoursDifference < 24 && req.user.role !== 'admin') {
      return res.status(400).json({ success: false, message: 'Cannot cancel booking less than 24 hours before check-in' });
    }
    booking.status = 'cancelled';
    booking.adminRead = false;
    booking.userRead = false;
    const updatedBooking = await booking.save();
    const populatedBooking = await Booking.findById(updatedBooking._id)
      .populate('hotelId', 'name location image')
      .populate('userId', 'name email');
    emitBookingNotification(populatedBooking, 'cancelled');
    emitUserNotification(booking.userId.toString(), 'Booking cancelled successfully', 'info');
    res.json({ success: true, message: 'Booking cancelled successfully', data: updatedBooking });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/read', auth, async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (req.user.role === 'admin') {
      booking.adminRead = true;
    } else {
      if (booking.userId.toString() !== req.user.userId) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }
      booking.userRead = true;
    }

    const updated = await booking.save();
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
});

router.patch('/read/all', auth, async (req, res, next) => {
  try {
    let result;
    if (req.user.role === 'admin') {
      result = await Booking.updateMany({ adminRead: false }, { adminRead: true });
    } else {
      result = await Booking.updateMany({ userId: req.user.userId, userRead: false }, { userRead: true });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

export default router;
