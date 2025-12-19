import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, CheckCheck, Trash2 } from 'lucide-react';
import { useSocket } from '../contexts/SocketContext';
import { format } from 'date-fns';

const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification, clearAllNotifications, connected } = useSocket();

  const getIcon = (type, level) => {
    if (level === 'success') return 'S';
    if (level === 'error') return 'E';
    if (level === 'warning') return 'W';
    if (type === 'booking') return 'B';
    if (type === 'hotel') return 'H';
    if (type === 'system') return 'N';
    return 'I';
  };

  const getColor = (level) => {
    if (level === 'success') return 'bg-gradient-to-r from-emerald-500/20 to-emerald-600/5 border-emerald-500/40';
    if (level === 'error') return 'bg-gradient-to-r from-red-500/20 to-red-600/5 border-red-500/40';
    if (level === 'warning') return 'bg-gradient-to-r from-amber-400/20 to-amber-500/5 border-amber-400/40';
    return 'bg-gradient-to-r from-blue-500/20 to-indigo-600/5 border-blue-500/40';
  };

  const getTitleAndSubtitle = (n) => {
    if (n.message) {
      return { title: n.message, subtitle: null };
    }

    if (n.type === 'booking' && n.data) {
      const hotelName = n.data.hotelName || n.data.hotelId?.name || 'Hotel';
      const guestName = n.data.guestDetails?.fullName || n.data.userName;
      const checkIn = n.data.checkIn ? format(new Date(n.data.checkIn), 'dd MMM') : null;
      const checkOut = n.data.checkOut ? format(new Date(n.data.checkOut), 'dd MMM') : null;
      const nights = n.data.nights;
      const guests = n.data.guests;

      if (n.action === 'cancelled') {
        return {
          title: `Booking cancelled • ${hotelName}`,
          subtitle: [
            guestName && `Guest: ${guestName}`,
            checkIn && checkOut && `Stay: ${checkIn} → ${checkOut}`,
            nights && `${nights} night${nights > 1 ? 's' : ''}`,
            guests && `${guests} guest${guests > 1 ? 's' : ''}`
          ].filter(Boolean).join(' • ')
        };
      }

      return {
        title: `New booking • ${hotelName}`,
        subtitle: [
          guestName && `Guest: ${guestName}`,
          checkIn && checkOut && `Stay: ${checkIn} → ${checkOut}`,
          nights && `${nights} night${nights > 1 ? 's' : ''}`,
          guests && `${guests} guest${guests > 1 ? 's' : ''}`
        ].filter(Boolean).join(' • ')
      };
    }

    if (n.type === 'hotel' && n.data) {
      const base = n.data.name || 'Hotel updated';
      if (n.action === 'created') return { title: `New hotel added`, subtitle: base };
      if (n.action === 'updated') return { title: `Hotel updated`, subtitle: base };
      if (n.action === 'deleted') return { title: `Hotel deleted`, subtitle: base };
    }

    return { title: 'You have a new notification', subtitle: null };
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-800/80 text-gray-300 shadow-sm ring-1 ring-gray-700 hover:bg-gray-700 hover:text-white transition-colors"
      >
        <Bell className="w-6 h-6" />
        <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-500'}`} />
        {unreadCount > 0 && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-96 max-h-[600px] overflow-hidden rounded-2xl bg-gray-900/95 shadow-2xl border border-gray-800 z-50 flex flex-col backdrop-blur">
              <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-900/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/10 text-blue-400">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-wide">Notifications</h3>
                    <p className="text-[11px] text-gray-400">Stay up to date with your bookings</p>
                  </div>
                </div>
                {notifications.length > 0 && (
                  <div className="flex gap-2">
                    {unreadCount > 0 && (
                      <button onClick={markAllAsRead} className="p-1 text-gray-400 hover:text-white transition-colors" title="Mark all as read">
                        <CheckCheck className="w-5 h-5" />
                      </button>
                    )}
                    <button onClick={clearAllNotifications} className="p-1 text-gray-400 hover:text-red-400 transition-colors" title="Clear all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="overflow-y-auto flex-1">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800/80">
                      <Bell className="w-6 h-6 opacity-70" />
                    </div>
                    <p className="text-sm font-medium text-gray-300">You're all caught up</p>
                    <p className="text-xs mt-1 text-gray-500">We'll let you know when something new happens.</p>
                  </div>
                ) : (
                  <div className="p-2 space-y-2">
                    {notifications.map((n) => (
                      <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                        className={`relative p-3 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                          n.read
                            ? 'bg-gray-900/70 border-gray-800'
                            : `${getColor(n.level)} border-l-4`
                        }`}>
                        <div className="flex items-start gap-3">
                          <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900/80 text-xs font-semibold text-gray-100 shadow-inner">
                            {getIcon(n.type, n.level)}
                          </div>
                          <div className="flex-1 min-w-0">
                            {(() => {
                              const { title, subtitle } = getTitleAndSubtitle(n);
                              return (
                                <>
                                  <p className={`text-sm leading-snug ${n.read ? 'text-gray-200' : 'text-white'}`}>{title}</p>
                                  {subtitle && (
                                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{subtitle}</p>
                                  )}
                                </>
                              );
                            })()}
                            {n.data?.totalPrice && (
                              <p className="text-xs text-gray-400 mt-1">Amount: ₹{n.data.totalPrice?.toLocaleString('en-IN')}</p>
                            )}
                            <div className="mt-2 flex items-center justify-between gap-2">
                              <p className="text-[11px] text-gray-500">
                                {format(new Date(n.timestamp), 'MMM dd, h:mm a')}
                              </p>
                              {!n.read && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-medium text-blue-300">
                                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                  New
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {!n.read && (
                              <button onClick={() => markAsRead(n.id)} className="p-1 text-gray-400 hover:text-green-400 transition-colors" title="Mark as read">
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button onClick={() => clearNotification(n.id)} className="p-1 text-gray-400 hover:text-red-400 transition-colors" title="Remove">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPanel;
                