import React from 'react';
import PropTypes from 'prop-types';
import { Eye, EyeOff } from 'lucide-react';

const UserProfilePasswordSection = ({ formData, showPasswords, setShowPasswords, onChange }) => {
  return (
    <div className="pt-4 border-t border-gray-700">
      <p className="text-gray-400 text-sm mb-3">Leave blank if you don't want to change password</p>
      <div className="space-y-3">
        <div>
          <label className="block text-gray-300 mb-2 font-medium text-sm">Current Password</label>
          <div className="relative">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={onChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-4 pr-12 py-2.5 text-white focus:outline-none focus:border-blue-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition"
            >
              {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium text-sm">New Password</label>
          <div className="relative">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={onChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-4 pr-12 py-2.5 text-white focus:outline-none focus:border-blue-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition"
            >
              {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium text-sm">Confirm New Password</label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-4 pr-12 py-2.5 text-white focus:outline-none focus:border-blue-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition"
            >
              {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

UserProfilePasswordSection.propTypes = {
  formData: PropTypes.shape({
    currentPassword: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired
  }).isRequired,
  showPasswords: PropTypes.shape({
    current: PropTypes.bool.isRequired,
    new: PropTypes.bool.isRequired,
    confirm: PropTypes.bool.isRequired
  }).isRequired,
  setShowPasswords: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default UserProfilePasswordSection;
