import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DeleteHotelModal = ({ hotel, onConfirm, onCancel }) => {
  if (!hotel) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Delete Hotel</h3>
            </div>
            <button 
              onClick={onCancel}
              className="text-gray-400 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete this hotel? This action cannot be undone.
            </p>
            
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-start space-x-3">
                <img 
                  src={hotel.image || "/placeholder.svg"} 
                  alt={hotel.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold truncate">{hotel.name}</h4>
                  <p className="text-gray-400 text-sm truncate">{hotel.location}</p>
                  <p className="text-blue-400 font-semibold text-sm mt-1">
                    ₹{hotel.price.toLocaleString('en-IN')}/night
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>All bookings associated with this hotel will remain in the system, but future bookings will be disabled.</span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition"
            >
              Delete Hotel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteHotelModal;
