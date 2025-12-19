import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff } from 'lucide-react';
import { useSocket } from '../contexts/SocketContext';

const ConnectionStatus = () => {
  const { connected } = useSocket();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg border ${
        connected 
          ? 'bg-green-500/20 border-green-500/50 text-green-400' 
          : 'bg-red-500/20 border-red-500/50 text-red-400'
      }`}>
        {connected ? (
          <>
            <Wifi className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">Live</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-medium">Offline</span>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ConnectionStatus;
