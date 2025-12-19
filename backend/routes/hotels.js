import express from 'express';
import { body, validationResult } from 'express-validator';
import Hotel from '../models/Hotel.js';
import { auth, adminAuth } from '../middleware/auth.js';
import { emitHotelUpdate } from '../socket/socketHandler.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: hotels
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    res.json({
      success: true,
      data: hotel
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', [auth, adminAuth], async (req, res, next) => {
  try {
    const { name, location, price, image, description, rooms, category, amenities } = req.body;      

    if (!name || !location || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name, location, and price are required'
      });
    }

    const hotel = await Hotel.create({
      name,
      location,
      price: parseFloat(price),
      image,
      description,
      rooms: parseInt(rooms) || 0,
      category,
      amenities: amenities || [],
      rating: 0
    });

    emitHotelUpdate(hotel, 'created');

    res.status(201).json({
      success: true,
      message: 'Hotel created successfully',
      data: hotel
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', [auth, adminAuth], async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.price) updates.price = parseFloat(updates.price);
    if (updates.rooms) updates.rooms = parseInt(updates.rooms);

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    emitHotelUpdate(updatedHotel, 'updated');

    res.json({
      success: true,
      message: 'Hotel updated successfully',
      data: updatedHotel
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', [auth, adminAuth], async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    emitHotelUpdate({ _id: req.params.id, name: hotel.name }, 'deleted');

    res.json({
      success: true,
      message: 'Hotel deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
