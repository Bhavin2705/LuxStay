import React from 'react';
import { UserCircle, Ban } from 'lucide-react';
import { motion } from 'framer-motion';

const UsersTab = ({ users, getUserBookings, setSelectedUser, handleBanUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-800 rounded-2xl p-4 sm:p-8 border border-gray-700">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">User Management</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {users.filter(u => u.role !== 'admin').map(user => (
            <div key={user._id || user.id} className="bg-gray-700 rounded-xl p-4 sm:p-6 border border-gray-600">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 truncate">{user.name}</h3>
                  <p className="text-gray-400 text-sm truncate">{user.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                  user.banned ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                }`}>
                  {user.banned ? 'Banned' : 'Active'}
                </span>
              </div>
              <div className="bg-gray-600 rounded-lg p-3 mb-4">
                <p className="text-gray-400 text-xs mb-1">Total Bookings</p>
                <p className="text-white text-xl font-bold">{getUserBookings(user).length}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition text-sm"
                >
                  <UserCircle className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => handleBanUser(user._id || user.id)}
                  className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition text-sm ${
                    user.banned
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  } text-white`}
                >
                  <Ban className="w-4 h-4" />
                  <span>{user.banned ? 'Unban' : 'Ban'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UsersTab;
