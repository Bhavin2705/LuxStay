import api from '../apiClient';

export const hotelsAPI = {
  getAll: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/hotels${queryParams ? `?${queryParams}` : ''}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/hotels/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (hotelData) => {
    try {
      const response = await api.post('/hotels', hotelData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, hotelData) => {
    try {
      const response = await api.put(`/hotels/${id}`, hotelData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/hotels/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default hotelsAPI;
