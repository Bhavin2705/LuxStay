import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Calendar, Users, Hotel, Clock } from 'lucide-react';

const StayDetails = ({ booking }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-green-500" />
        <h2 className="text-xl font-bold text-white">Stay Details</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-1">Check-in</p>
          <p className="text-white text-lg font-semibold">
            {new Date(booking.checkIn).toLocaleDateString('en-IN', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
          <p className="text-gray-400 text-xs mt-1">After 2:00 PM</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-1">Check-out</p>
          <p className="text-white text-lg font-semibold">
            {new Date(booking.checkOut).toLocaleDateString('en-IN', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
          <p className="text-gray-400 text-xs mt-1">Before 11:00 AM</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <p className="text-gray-400 text-sm">Number of Guests</p>
          </div>
          <p className="text-white text-2xl font-bold">{booking.guests}</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Hotel className="w-5 h-5 text-orange-400" />
            <p className="text-gray-400 text-sm">Number of Rooms</p>
          </div>
          <p className="text-white text-2xl font-bold">{booking.rooms || Math.ceil(booking.guests / 2)}</p>
          <p className="text-gray-400 text-xs mt-1">Max 2 guests per room</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <p className="text-gray-400 text-sm">Number of Nights</p>
          </div>
          <p className="text-white text-2xl font-bold">{booking.nights}</p>
        </div>
      </div>
    </motion.div>
  );
};

StayDetails.propTypes = {
  booking: PropTypes.shape({
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    rooms: PropTypes.number,
    nights: PropTypes.number.isRequired
  }).isRequired
};

export default StayDetails;
