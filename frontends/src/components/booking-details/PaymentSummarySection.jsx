import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';

const PaymentSummarySection = ({ booking, hotel }) => {
  const rooms = booking.rooms || Math.ceil(booking.guests / 2);
  const basePrice = hotel?.price ?? Math.round(booking.totalPrice / (booking.nights * rooms));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <CreditCard className="w-5 h-5 text-pink-500" />
        <h2 className="text-xl font-bold text-white">Payment Summary</h2>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-gray-300">
          <span>{rooms} Room{rooms > 1 ? 's' : ''} × {booking.nights} Night{booking.nights > 1 ? 's' : ''}</span>
          <span>₹{(basePrice * booking.nights * rooms).toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-gray-400 text-sm">
          <span>(₹{basePrice.toLocaleString('en-IN')} per room per night)</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Taxes & Service Charges (18%)</span>
          <span>₹{(basePrice * booking.nights * rooms * 0.18).toLocaleString('en-IN')}</span>
        </div>
        <div className="border-t border-gray-700 pt-3 flex justify-between items-center">
          <span className="text-white font-bold text-xl">Total Amount Paid</span>
          <span className="text-green-400 font-bold text-2xl">
            ₹{booking.totalPrice.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

PaymentSummarySection.propTypes = {
  booking: PropTypes.shape({
    guests: PropTypes.number.isRequired,
    rooms: PropTypes.number,
    nights: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired
  }).isRequired,
  hotel: PropTypes.shape({
    price: PropTypes.number
  })
};

export default PaymentSummarySection;
