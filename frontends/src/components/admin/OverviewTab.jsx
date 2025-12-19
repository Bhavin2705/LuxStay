import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import StatsCards from './StatsCards';

const OverviewTab = ({ hotels, bookings, activeUsers, totalRevenue }) => {
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
  const cancellationRate = bookings.length > 0 ? ((cancelledBookings / bookings.length) * 100).toFixed(1) : 0;
  const averageBookingValue = bookings.length > 0 ? (totalRevenue / confirmedBookings).toFixed(0) : 0;
  
  const recentBookings = [...bookings].sort((a, b) => 
    new Date(b.createdAt || b.checkIn) - new Date(a.createdAt || a.checkIn)
  ).slice(0, 5);

  const hotelBookingCount = {};
  bookings.forEach(booking => {
    if (booking.status !== 'cancelled') {
      hotelBookingCount[booking.hotelName] = (hotelBookingCount[booking.hotelName] || 0) + 1;
    }
  });
  const topHotels = Object.entries(hotelBookingCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <StatsCards 
        hotels={hotels} 
        bookings={bookings} 
        activeUsers={activeUsers} 
        totalRevenue={totalRevenue} 
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Avg Booking Value</span>
            <DollarSign className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-white">₹{averageBookingValue}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Confirmed</span>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-white">{confirmedBookings}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Cancelled</span>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-white">{cancelledBookings}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Cancel Rate</span>
            <Calendar className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-white">{cancellationRate}%</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {recentBookings.map(booking => (
              <div key={booking._id || booking.id} className="bg-gray-700 rounded-lg p-4">\n                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate">{booking.hotelName}</p>
                    <p className="text-gray-400 text-sm truncate">{booking.userName}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                    booking.status === 'cancelled' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{new Date(booking.checkIn).toLocaleDateString('en-IN')}</span>
                  <span className="text-blue-400 font-semibold">₹{booking.totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
            {recentBookings.length === 0 && (
              <p className="text-gray-400 text-center py-8">No bookings yet</p>
            )}
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Top Performing Hotels</h3>
          <div className="space-y-3">
            {topHotels.map(([hotelName, count], index) => (
              <div key={hotelName} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold">
                      {index + 1}
                    </div>
                    <span className="text-white font-semibold">{hotelName}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{count} bookings</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(count / topHotels[0][1]) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {topHotels.length === 0 && (
              <p className="text-gray-400 text-center py-8">No booking data available</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OverviewTab;
