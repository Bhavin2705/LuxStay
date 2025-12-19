import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationToast = ({ notification }) => {
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className={`${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2`}>
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span className="text-sm">{notification.message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;
