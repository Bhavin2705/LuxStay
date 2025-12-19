import { Server } from 'socket.io';

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join room based on user role
    socket.on('join', (data) => {
      const { userId, role } = data;
      socket.userId = userId;
      socket.userRole = role;
      
      if (role === 'admin') {
        socket.join('admin');
        console.log(`Admin ${userId} joined admin room`);
      } else {
        socket.join(`user:${userId}`);
        console.log(`User ${userId} joined their room`);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

// Emit booking notification
export const emitBookingNotification = (booking, type = 'new') => {
  if (!io) return;

  const notification = {
    type: 'booking',
    action: type,
    data: booking,
    timestamp: new Date()
  };

  // Notify admins
  io.to('admin').emit('booking:notification', notification);

  // Notify specific user
  if (booking.userId) {
    io.to(`user:${booking.userId}`).emit('booking:update', notification);
  }
};

// Emit hotel update
export const emitHotelUpdate = (hotel, type = 'update') => {
  if (!io) return;

  const notification = {
    type: 'hotel',
    action: type,
    data: hotel,
    timestamp: new Date()
  };

  // Broadcast to all connected clients
  io.emit('hotel:update', notification);
};

// Emit user notification
export const emitUserNotification = (userId, message, type = 'info') => {
  if (!io) return;

  const notification = {
    type: 'notification',
    message,
    level: type,
    timestamp: new Date()
  };

  io.to(`user:${userId}`).emit('notification', notification);
};

// Emit system-wide notification
export const emitSystemNotification = (message, type = 'info') => {
  if (!io) return;

  const notification = {
    type: 'system',
    message,
    level: type,
    timestamp: new Date()
  };

  io.emit('system:notification', notification);
};
