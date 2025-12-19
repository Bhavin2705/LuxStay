import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UserProfilePasswordSection from './UserProfilePasswordSection';

const UserProfile = ({ isOpen, onClose }) => {
  const { user, updateProfile, changePassword } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setMessage({ type: '', text: '' });
    }
  }, [isOpen, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (formData.name !== user.name || formData.email !== user.email) {
        const result = await updateProfile(user.id, {
          name: formData.name,
          email: formData.email
        });

        if (!result.success) {
          setMessage({ type: 'error', text: result.message || 'Failed to update profile' });
          setLoading(false);
          return;
        }
      }

      if (formData.newPassword) {
        if (!formData.currentPassword) {
          setMessage({ type: 'error', text: 'Current password is required' });
          setLoading(false);
          return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
          setMessage({ type: 'error', text: 'New passwords do not match' });
          setLoading(false);
          return;
        }

        if (formData.newPassword.length < 6) {
          setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
          setLoading(false);
          return;
        }

        const result = await changePassword(user.id, formData.currentPassword, formData.newPassword);

        if (!result.success) {
          setMessage({ type: 'error', text: result.message || 'Failed to change password' });
          setLoading(false);
          return;
        }
      }

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      setTimeout(() => onClose(), 1500);
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4" 
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700"
        >
          <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {message.text && (
                <div
                  className={`mb-4 p-3 rounded-lg text-sm ${
                    message.type === 'success'
                      ? 'bg-green-500/10 border border-green-500 text-green-500'
                      : 'bg-red-500/10 border border-red-500 text-red-500'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>
                </div>

                <UserProfilePasswordSection
                  formData={formData}
                  showPasswords={showPasswords}
                  setShowPasswords={setShowPasswords}
                  onChange={handleChange}
                />

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-5 h-5" />
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
    </AnimatePresence>,
    document.body
  );
};

UserProfile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default UserProfile;
