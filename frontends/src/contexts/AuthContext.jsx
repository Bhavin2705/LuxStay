import React, { createContext, useContext, useState, useEffect } from 'react';
import authAPI from '../utils/api/authAPI';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await authAPI.verifyToken();
        if (response.success && response.data.user) {
          const emailUsername = response.data.user.email.split('@')[0];
          const userData = {
            id: response.data.user._id || response.data.user.id,
            email: response.data.user.email,
            name: response.data.user.name || emailUsername,
            role: response.data.user.role
          };
          setUser(userData);
        }
      } catch (error) {
        console.error('Unexpected token verification error:', error);
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.success && response.data) {
        const emailUsername = response.data.user.email.split('@')[0];
        const userData = {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name || emailUsername,
          role: response.data.user.role
        };
        setUser(userData);
        return { success: true, user: userData };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.message || 'Network error. Please try again.' 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register(name, email, password);
      if (response.success) {
        return { success: true };
      }
      return { success: false, message: response.message || 'Registration failed' };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Network error. Please try again.' 
      };
    }
  };

  const updateProfile = async (userId, updates) => {
    try {
      const response = await authAPI.updateProfile(userId, updates);
      if (response.success && response.data) {
        const updatedUserData = {
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          role: response.data.role
        };
        
        if (user && user.id === userId) {
          setUser(updatedUserData);
        }
        
        return { success: true };
      }
      return { success: false, message: response.message || 'Update failed' };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Network error. Please try again.' 
      };
    }
  };

  const changePassword = async (userId, currentPassword, newPassword) => {
    try {
      const response = await authAPI.changePassword(userId, currentPassword, newPassword);
      return response;
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Failed to change password' 
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, changePassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
