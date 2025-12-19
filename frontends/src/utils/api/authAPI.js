import api from '../apiClient';

export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Login failed. Please try again.'
      };
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verifyToken: async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      
      return {
        success: false,
        message: 'No valid token'
      };
    } catch (error) {
      return {
        success: false,
        message: 'No valid token'
      };
    }
  },

  updateProfile: async (userId, updates) => {
    try {
      const response = await api.put(`/auth/profile/${userId}`, updates);
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to update profile'
      };
    }
  },

  changePassword: async (userId, currentPassword, newPassword) => {
    try {
      const response = await api.put(`/auth/change-password/${userId}`, {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to change password'
      };
    }
  }
};

export default authAPI;
