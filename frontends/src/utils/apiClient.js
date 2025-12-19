import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        const publicPages = ['/', '/login', '/register'];
        const isPublicPage = publicPages.includes(window.location.pathname) || window.location.pathname.startsWith('/hotel/');
        
        if (!isPublicPage) {
          window.location.href = '/login';
        }
      } else if (status === 403) {
        console.error('Forbidden access');
      } else if (status === 404) {
        console.error('Resource not found');
      } else if (status >= 500) {
        console.error('Server error:', data.message);
      }
      
      return Promise.reject(data || error);
    } else if (error.request) {
      console.error('Network error - no response received');
      return Promise.reject({
        message: 'Unable to connect to server. Please check your internet connection.'
      });
    } else {
      console.error('Request error:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default api;
