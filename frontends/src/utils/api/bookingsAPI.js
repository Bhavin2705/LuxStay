import api from '../apiClient';

export const bookingsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/bookings');
      return response.data.data || response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserBookings: async (userId) => {
    try {
      const response = await api.get(`/bookings/user/${userId}`);
      return response.data.data || response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (bookingData) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data.data || response.data;
    } catch (error) {
      throw error;
    }
  },

  cancel: async (id) => {
    try {
      const response = await api.patch(`/bookings/${id}/cancel`);
      return response.data.data || response.data;
    } catch (error) {
      throw error;
    }
  },

  markRead: async (id) => {
    try {
      const response = await api.patch(`/bookings/${id}/read`);
      return response.data.data || response.data;
    } catch (error) {
      throw error;
    }
  },

  markAllRead: async () => {
    try {
      const response = await api.patch('/bookings/read/all');
      return response.data.data || response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default bookingsAPI;
