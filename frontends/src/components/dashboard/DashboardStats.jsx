import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, Clock, CreditCard } from 'lucide-react';

const DashboardStats = ({ bookings }) => {
  const totalSpent = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const activeBookings = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-white">{bookings.length}</p>
          </div>
          <Calendar className="w-12 h-12 text-blue-500" />
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 mb-1">Active Bookings</p>
            <p className="text-3xl font-bold text-white">{activeBookings}</p>
          </div>
          <Clock className="w-12 h-12 text-green-500" />
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 mb-1">Total Spent</p>
            <p className="text-3xl font-bold text-white">₹{totalSpent.toLocaleString('en-IN')}</p>
          </div>
          <CreditCard className="w-12 h-12 text-purple-500" />
        </div>
      </div>
    </div>
  );
};

DashboardStats.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.shape({
    status: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired
  })).isRequired
};

export default DashboardStats;
