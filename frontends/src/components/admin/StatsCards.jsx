import React from 'react';
import { Hotel, Calendar, Users, DollarSign } from 'lucide-react';

const StatsCards = ({ hotels, bookings, activeUsers, totalRevenue }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 mb-1 text-xs sm:text-sm">Total Hotels</p>
            <p className="text-2xl sm:text-3xl font-bold text-white">{hotels.length}</p>
          </div>
          <Hotel className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500" />
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 mb-1 text-xs sm:text-sm">Total Bookings</p>
            <p className="text-2xl sm:text-3xl font-bold text-white">{bookings.length}</p>
          </div>
          <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-green-500" />
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 mb-1 text-xs sm:text-sm">Active Users</p>
            <p className="text-2xl sm:text-3xl font-bold text-white">{activeUsers}</p>
          </div>
          <Users className="w-8 h-8 sm:w-12 sm:h-12 text-purple-500" />
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 mb-1 text-xs sm:text-sm">Total Revenue</p>
            <p className="text-xl sm:text-3xl font-bold text-white">₹{(totalRevenue/1000).toFixed(1)}K</p>
          </div>
          <DollarSign className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500" />
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
