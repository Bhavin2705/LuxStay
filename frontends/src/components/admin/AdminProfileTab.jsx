import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Save, Eye, EyeOff } from 'lucide-react';

const AdminProfileTab = ({ user, onUpdateProfile, showNotification }) => {
  const [profileData, setProfileData] = useState({
    name: user.name || '',
    email: user.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (profileData.newPassword) {
      if (!profileData.currentPassword) {
        newErrors.currentPassword = 'Current password is required to change password';
      }
      if (profileData.newPassword.length < 6) {
        newErrors.newPassword = 'New password must be at least 6 characters';
      }
      if (profileData.newPassword !== profileData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('Please fix the errors in the form', 'error');
      return;
    }

    onUpdateProfile(profileData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-800 rounded-2xl p-4 sm:p-8 border border-gray-700 max-w-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Admin Profile Settings</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Name</span>
              </div>
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className={`w-full bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </div>
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className={`w-full bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
            <p className="text-gray-400 text-sm mb-4">Leave blank if you don't want to change your password</p>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Current Password</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={profileData.currentPassword}
                    onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                    className={`w-full bg-gray-700 border ${errors.currentPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 pr-12 py-3 text-white focus:outline-none focus:border-blue-500`}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-blue-400 transition focus:outline-none"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>New Password</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={profileData.newPassword}
                    onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                    className={`w-full bg-gray-700 border ${errors.newPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 pr-12 py-3 text-white focus:outline-none focus:border-blue-500`}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-blue-400 transition focus:outline-none"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Confirm New Password</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={profileData.confirmPassword}
                    onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                    className={`w-full bg-gray-700 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 pr-12 py-3 text-white focus:outline-none focus:border-blue-500`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-blue-400 transition focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminProfileTab;
