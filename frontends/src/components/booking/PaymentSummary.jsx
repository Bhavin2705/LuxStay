import React from 'react';
import PropTypes from 'prop-types';
import { CreditCard, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { calculateNights, calculateRooms, calculateTotal } from './BookingCalculations';

const PaymentSummary = ({ hotel, checkIn, checkOut, guests, guestDetails, onBack, onConfirm }) => {
  const nights = calculateNights(checkIn, checkOut);
  const rooms = calculateRooms(guests);
  const total = calculateTotal(hotel, checkIn, checkOut, guests);

  return (
    <motion.div
      key="payment"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <CreditCard className="w-5 h-5" />
          <span>Booking Summary</span>
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-300">
            <span>Hotel:</span>
            <span className="text-white font-medium">{hotel.name}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Guest:</span>
            <span className="text-white">{guestDetails.fullName}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Phone:</span>
            <span className="text-white">+91 {guestDetails.phone}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Check-in:</span>
            <span className="text-white">{checkIn?.toLocaleDateString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Check-out:</span>
            <span className="text-white">{checkOut?.toLocaleDateString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Guests:</span>
            <span className="text-white">{guests} {guests > 1 ? 'Guests' : 'Guest'}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Rooms:</span>
            <span className="text-white">{rooms} {rooms > 1 ? 'Rooms' : 'Room'}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Nights:</span>
            <span className="text-white">{nights} {nights > 1 ? 'Nights' : 'Night'}</span>
          </div>
          <div className="flex justify-between text-gray-400 text-xs">
            <span>Rate:</span>
            <span>₹{hotel.price.toLocaleString('en-IN')} × {rooms} room × {nights} night</span>
          </div>
          <div className="border-t border-gray-600 pt-2 mt-2 flex justify-between">
            <span className="text-white font-bold">Total Amount:</span>
            <span className="text-green-400 font-bold text-lg">₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-600/20 border border-blue-600 rounded-lg p-4">
        <p className="text-blue-300 text-sm flex items-center justify-center">
          <CreditCard className="w-4 h-4 mr-2" />
          This is a simulated payment. No actual charge will be made.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Confirm & Pay</span>
        </button>
      </div>
    </motion.div>
  );
};

PaymentSummary.propTypes = {
  hotel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  checkIn: PropTypes.instanceOf(Date),
  checkOut: PropTypes.instanceOf(Date),
  guests: PropTypes.number.isRequired,
  guestDetails: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default PaymentSummary;
