import React from 'react';
import { XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const BookingsTab = ({ bookings, handleCancelBooking }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-800 rounded-2xl p-4 sm:p-8 border border-gray-700">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Booking Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 pb-3 px-2 sm:px-4 text-xs sm:text-sm">ID</th>
                <th className="text-left text-gray-400 pb-3 px-2 sm:px-4 text-xs sm:text-sm">Hotel</th>
                <th className="text-left text-gray-400 pb-3 px-2 sm:px-4 text-xs sm:text-sm">Guest</th>
                <th className="text-left text-gray-400 pb-3 px-2 sm:px-4 text-xs sm:text-sm">Check-in</th>
                <th className="text-left text-gray-400 pb-3 px-2 sm:px-4 text-xs sm:text-sm">Amount</th>
                <th className="text-left text-gray-400 pb-3 px-2 sm:px-4 text-xs sm:text-sm">Status</th>
                <th className="text-left text-gray-400 pb-3 px-2 sm:px-4 text-xs sm:text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id || booking.id} className="border-b border-gray-700">
                  <td className="py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm">{(booking._id || booking.id).slice(0, 8)}</td>
                  <td className="py-3 px-2 sm:px-4 text-white text-xs sm:text-sm">{booking.hotelName}</td>
                  <td className="py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm">{booking.userName}</td>
                  <td className="py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm">{new Date(booking.checkIn).toLocaleDateString('en-IN')}</td>
                  <td className="py-3 px-2 sm:px-4 text-blue-400 font-semibold text-xs sm:text-sm">₹{booking.totalPrice.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-2 sm:px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'cancelled'
                        ? 'bg-red-500/20 text-red-500'
                        : 'bg-green-500/20 text-green-500'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4">
                    {booking.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                        title="Cancel Booking"
                      >
                        <XCircle className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingsTab;
