import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const BookingHeader = ({ booking }) => {
  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-500/20 text-green-500 border-green-500',
      pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500',
      cancelled: 'bg-red-500/20 text-red-500 border-red-500'
    };
    return colors[status] || colors.confirmed;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 mb-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
        </motion.div>
        <h1 className="text-3xl font-bold text-white mb-2">Booking Details</h1>
        <p className="text-blue-100">
          Status: <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ml-2 ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 mb-6 text-center"
      >
        <p className="text-purple-100 text-sm mb-1">Booking Reference</p>
        <p className="text-white text-2xl font-bold tracking-wider">{booking.id || booking._id}</p>
        <p className="text-purple-100 text-xs mt-2">
          Booked on {new Date(booking.createdAt).toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}
        </p>
      </motion.div>
    </>
  );
};

BookingHeader.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]).isRequired
  }).isRequired
};

export default BookingHeader;
