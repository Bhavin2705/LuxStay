import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Hotel, LogOut, User, LayoutDashboard, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import NotificationPanel from './NotificationPanel';
import UserProfile from './UserProfile';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <Hotel className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </motion.div>
            <span className="text-lg sm:text-2xl font-bold text-white">Lux<span className="text-blue-500">Stay</span></span>
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                <NotificationPanel />
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-white"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.role === 'admin' ? 'Admin' : 'Dashboard'}</span>
                </Link>
                <button
                  onClick={() => setShowProfile(true)}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition"
                  title="Edit Profile"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline max-w-[100px] truncate">{user.name}</span>
                  <Settings className="w-3 h-3 text-gray-400" />
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 sm:px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-white text-sm">
                  Login
                </Link>
                <Link to="/register" className="px-3 sm:px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white text-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </nav>
  );
};
export default Navbar;
