import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, MapPin, Calendar, DollarSign, Activity } from 'lucide-react';
import { useSocket } from '../../contexts/SocketContext';
import { format } from 'date-fns';

const LiveBookingFeed = () => {
  const { socket, connected } = useSocket();
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const handleBookingNotification = (notification) => {
      if (notification.action === 'new') {
        setRecentBookings(prev => [
          {
            ...notification.data,
            receivedAt: new Date()
          },
          ...prev
        ].slice(0, 10));
      }
    };

    socket.on('booking:notification', handleBookingNotification);

    return () => {
      socket.off('booking:notification', handleBookingNotification);
    };
  }, [socket]);

  if (!connected) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-500" />
            Live Booking Feed
          </h3>
          <span className="text-xs text-red-400">Disconnected</span>
        </div>
        <p className="text-gray-400 text-sm text-center py-8">
          WebSocket disconnected. Real-time updates unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-500 animate-pulse" />
          Live Booking Feed
        </h3>
        <span className="text-xs text-green-400">Live</span>
      </div>

      {recentBookings.length === 0 ? (
        <div className="text-center py-8">
          <Activity className="w-12 h-12 mx-auto text-gray-600 mb-2" />
          <p className="text-gray-400 text-sm">Waiting for new bookings...</p>
          <p className="text-gray-500 text-xs mt-1">Real-time updates will appear here</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          <AnimatePresence>
            {recentBookings.map((booking, index) => (
              <motion.div
                key={booking._id || index}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4 hover:border-blue-500/50 transition-all"
              >
                {index === 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mb-2"
                  >
                    NEW BOOKING
                  </motion.div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <p className="text-white font-bold text-lg">
                      {booking.hotelId?.name || 'Hotel'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-400 text-xs">Guest</p>
                      <p className="text-white">{booking.userId?.name || 'Guest'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-400 text-xs">Location</p>
                      <p className="text-white">{booking.hotelId?.location || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-400 text-xs">Check-in</p>
                      <p className="text-white">
                        {booking.checkIn ? format(new Date(booking.checkIn), 'MMM dd') : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-gray-400 text-xs">Amount</p>
                      <p className="text-green-400 font-bold">
                        ₹{booking.totalPrice?.toLocaleString() || '0'}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center gap-2 text-xs text-gray-500 mt-2 pt-2 border-t border-gray-700">
                    <Clock className="w-3 h-3" />
                    Received {format(booking.receivedAt || new Date(), 'h:mm:ss a')}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default LiveBookingFeed;
