import React from 'react';
import { motion } from 'framer-motion';

const StatisticsTab = ({ monthlyStats, maxRevenue, maxBookings }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6 sm:space-y-8">
        <div className="bg-gray-800 rounded-2xl p-4 sm:p-8 border border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Monthly Revenue</h2>
          <div className="space-y-3">
            {monthlyStats.map((stat, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">{stat.month}</span>
                  <span className="text-white font-semibold text-sm">₹{(stat.revenue/1000).toFixed(1)}K</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.revenue / maxRevenue) * 100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-4 sm:p-8 border border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Monthly Bookings</h2>
          <div className="space-y-3">
            {monthlyStats.map((stat, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">{stat.month}</span>
                  <span className="text-white font-semibold text-sm">{stat.bookings} bookings</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.bookings / maxBookings) * 100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatisticsTab;
