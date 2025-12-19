import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Bell } from 'lucide-react';
import { useSocket } from '../contexts/SocketContext';

const WebSocketDemo = () => {
  const { connected, notifications } = useSocket();
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-40">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDemo(!showDemo)}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-full shadow-lg"
        title="WebSocket Info"
      >
        <Zap className="w-6 h-6" />
      </motion.button>

      {showDemo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="absolute bottom-16 right-0 bg-gray-800 border border-purple-500/50 rounded-lg p-4 w-80 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              WebSocket Status
            </h3>
            <span className={`text-xs px-2 py-1 rounded ${
              connected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Protocol:</span>
              <span className="text-white font-mono">WebSocket</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Transport:</span>
              <span className="text-white font-mono">Socket.IO</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Notifications:</span>
              <span className="text-white font-bold">{notifications.length}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-purple-500/10 rounded border border-purple-500/30">
            <p className="text-xs text-purple-300 mb-2 flex items-center gap-1">
              <Bell className="w-3 h-3" />
              Features:
            </p>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>Real-time booking notifications</li>
              <li>Live hotel updates</li>
              <li>Instant admin alerts</li>
              <li>User confirmations</li>
            </ul>
          </div>

          {connected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-xs text-center text-green-400"
            >
              <span className="inline-block animate-pulse">●</span> Receiving real-time updates
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default WebSocketDemo;
