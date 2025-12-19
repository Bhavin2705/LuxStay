import React from 'react';
import { X, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserDetailModal = ({ selectedUser, setSelectedUser, getUserBookings, handleBanUser, handleCancelBooking, users }) => {
  if (!selectedUser) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedUser(null)}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">User Details</h3>
            <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-white font-semibold">{selectedUser.name}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-semibold">{selectedUser.email}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                selectedUser.banned ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
              }`}>
                {selectedUser.banned ? 'Banned' : 'Active'}
              </span>
            </div>
          </div>

          <h4 className="text-xl font-bold text-white mb-4">Booking History</h4>
          <div className="space-y-3">
            {getUserBookings(selectedUser).map(booking => (
              <div key={booking._id || booking.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <h5 className="text-white font-semibold">{booking.hotelName}</h5>
                    <p className="text-gray-400 text-sm">
                      {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                    <p className="text-blue-400 font-semibold mt-1">₹{booking.totalPrice.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'cancelled'
                        ? 'bg-red-500/20 text-red-500'
                        : 'bg-green-500/20 text-green-500'
                    }`}>
                      {booking.status}
                    </span>
                    {booking.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancelBooking(booking._id || booking.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                        title="Cancel Booking"
                      >
                        <XCircle className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {getUserBookings(selectedUser).length === 0 && (
              <p className="text-gray-400 text-center py-4">No bookings found</p>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                handleBanUser(selectedUser._id || selectedUser.id);
                setSelectedUser(users.find(u => (u._id || u.id) === (selectedUser._id || selectedUser.id)));
              }}
              className={`flex-1 px-4 py-2 rounded-lg transition ${
                selectedUser.banned
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              } text-white font-semibold`}
            >
              {selectedUser.banned ? 'Unban User' : 'Ban User'}
            </button>
            <button
              onClick={() => setSelectedUser(null)}
              className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserDetailModal;
