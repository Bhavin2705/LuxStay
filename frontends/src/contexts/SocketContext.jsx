import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { bookingsAPI } from '../utils/api';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setConnected(false);
      }
      return;
    }

    const socketUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    const newSocket = io(socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('WebSocket connected');
      setConnected(true);
      
      newSocket.emit('join', {
        userId: user.id,
        role: user.role
      });
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    });

    newSocket.on('booking:notification', (notification) => {
      console.log('Booking notification:', notification);
      addNotification({
        id: Date.now(),
        type: 'booking',
        ...notification,
        read: false
      });
    });

    newSocket.on('booking:update', (notification) => {
      console.log('Booking update:', notification);
      addNotification({
        id: Date.now(),
        type: 'booking',
        ...notification,
        read: false
      });
    });

    newSocket.on('hotel:update', (notification) => {
      console.log('Hotel update:', notification);
      addNotification({
        id: Date.now(),
        type: 'hotel',
        ...notification,
        read: false
      });
    });

    newSocket.on('notification', (notification) => {
      console.log('Notification:', notification);
      addNotification({
        id: Date.now(),
        ...notification,
        read: false
      });
    });

    newSocket.on('system:notification', (notification) => {
      console.log('System notification:', notification);
      addNotification({
        id: Date.now(),
        type: 'system',
        ...notification,
        read: false
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const loadPersistedNotifications = async () => {
      if (!user) {
        setNotifications([]);
        return;
      }

      try {
        const data = user.role === 'admin'
          ? await bookingsAPI.getAll()
          : await bookingsAPI.getUserBookings(user.id);

        const bookings = data?.data || data || [];

        const mapped = bookings.map((b) => ({
          id: b._id,
          type: 'booking',
          level: b.status === 'cancelled' ? 'warning' : 'success',
          action: b.status === 'cancelled' ? 'cancelled' : 'new',
          data: b,
          timestamp: b.updatedAt || b.createdAt,
          read: user.role === 'admin' ? !!b.adminRead : !!b.userRead
        }));

        mapped.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setNotifications((prev) => {
          const byId = new Map();
          [...mapped, ...prev].forEach((n) => {
            if (!n.id) return;
            if (!byId.has(n.id)) byId.set(n.id, n);
          });
          return Array.from(byId.values());
        });
      } catch (err) {
        console.error('Failed to load persisted notifications', err);
      }
    };

    loadPersistedNotifications();
  }, [user]);

  const addNotification = useCallback((notification) => {
    setNotifications(prev => [notification, ...prev].slice(0, 50));
  }, []);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      const target = notifications.find((n) => n.id === notificationId);
      if (target && target.type === 'booking' && notificationId) {
        await bookingsAPI.markRead(notificationId);
      }
    } catch (err) {
      console.error('Failed to mark notification as read', err);
    }

    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  }, [notifications]);

  const markAllAsRead = useCallback(async () => {
    try {
      await bookingsAPI.markAllRead();
    } catch (err) {
      console.error('Failed to mark all notifications as read', err);
    }

    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearNotification = useCallback((notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = {
    socket,
    connected,
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
