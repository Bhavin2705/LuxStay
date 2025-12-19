import api from '../apiClient';

export const usersAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/users');
      return response.data.data || response.data;
    } catch (error) {
      throw error;
    }
  },

  banUser: async (id) => {
    try {
      const response = await api.patch(`/users/${id}/ban`);
      return response.data.data || response.data;
    } catch (error) {
      throw error;
    }
  },

  unbanUser: async (id) => {
    try {
      const response = await api.patch(`/users/${id}/unban`);
      return response.data.data || response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default usersAPI;
