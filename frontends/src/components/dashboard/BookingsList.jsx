import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Clock, CreditCard } from 'lucide-react';

const BookingsList = ({ bookings, onCancel, canCancel, getStatusColor }) => {
  const navigate = useNavigate();

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400 text-lg mb-2">No bookings yet</p>
        <p className="text-gray-500 mb-6">Start exploring and book your dream stay!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking, index) => (
        <motion.div
          key={booking._id || booking.id || index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(`/booking/${booking._id || booking.id}`)}
          className="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition cursor-pointer"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">{booking.hotelName}</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">
                    {new Date(booking.checkIn).toLocaleDateString('en-IN')} - {new Date(booking.checkOut).toLocaleDateString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{booking.guests} Guest{booking.guests > 1 ? 's' : ''} • {booking.rooms || Math.ceil(booking.guests / 2)} Room{(booking.rooms || Math.ceil(booking.guests / 2)) > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{booking.nights} Night{booking.nights > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold">₹{booking.totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-600 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Booking ID: {booking._id || booking.id} • Booked on {new Date(booking.createdAt).toLocaleDateString('en-IN')}
            </p>
            <div className="flex items-center gap-2">
              {booking.status === 'confirmed' && (
                <button
                  onClick={(e) => onCancel(e, booking)}
                  className={`text-xs px-3 py-1 rounded-lg font-semibold transition ${
                    canCancel(booking.checkIn)
                      ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-600'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600'
                  }`}
                  disabled={!canCancel(booking.checkIn)}
                >
                  {canCancel(booking.checkIn) ? 'Cancel Booking' : 'Cannot Cancel'}
                </button>
              )}
              <p className="text-xs text-blue-400 font-semibold">View details →</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

BookingsList.propTypes = {
  bookings: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired,
  canCancel: PropTypes.func.isRequired,
  getStatusColor: PropTypes.func.isRequired
};

export default BookingsList;
