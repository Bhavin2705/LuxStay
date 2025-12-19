import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle2, XCircle, Clock3, Bell, Hash, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const NotificationsTab = ({ notifications, onMarkRead, onMarkAllRead }) => {
  const hasUnread = notifications.some((n) => !n.read);

  return (
    <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/10 text-blue-400">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Booking Notifications</h2>
            <p className="text-xs text-gray-400">All booking events across the platform</p>
          </div>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={onMarkAllRead}
            disabled={!hasUnread}
            className="text-xs px-3 py-1 rounded-full border border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900/80">
            <Bell className="w-6 h-6 opacity-70" />
          </div>
          <p className="text-sm font-medium text-gray-300">No booking notifications yet</p>
          <p className="text-xs mt-1 text-gray-500">New bookings and cancellations will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {notifications.map((n) => {
            const isCancelled = n.data?.status === 'cancelled';
            const title = isCancelled
              ? `Booking cancelled - ${n.data?.hotelName || n.data?.hotelId?.name || 'Hotel'}`
              : `New booking - ${n.data?.hotelName || n.data?.hotelId?.name || 'Hotel'}`;
            const guestName = n.data?.guestDetails?.fullName || n.data?.userName;
            const checkIn = n.data?.checkIn ? format(new Date(n.data.checkIn), 'dd MMM yyyy') : null;
            const checkOut = n.data?.checkOut ? format(new Date(n.data.checkOut), 'dd MMM yyyy') : null;
            const amount = n.data?.totalPrice;
            const ref = n.data?._id;

            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                  isCancelled
                    ? 'border-amber-500/40 bg-amber-500/5'
                    : 'border-emerald-500/40 bg-emerald-500/5'
                } ${n.read ? 'opacity-75' : ''}`}
              >
                <div className="mt-1">
                  {isCancelled ? (
                    <XCircle className="w-4 h-4 text-amber-400" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`font-medium ${n.read ? 'text-gray-200' : 'text-white'}`}>{title}</p>
                    <span className={`text-[10px] rounded-full px-2 py-0.5 border ${n.read ? 'border-gray-600 text-gray-400' : 'border-blue-500/60 text-blue-300'}`}>
                      {n.read ? 'Read' : 'Unread'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1 truncate">
                    Guest: {guestName || 'Unknown'} • Guests: {n.data?.guests} • Rooms: {n.data?.rooms}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-400">
                    {checkIn && checkOut && (
                      <span>
                        Stay: {checkIn} → {checkOut}
                      </span>
                    )}
                    {amount != null && (
                      <span className="inline-flex items-center gap-1">
                        <IndianRupee className="w-3 h-3" />
                        {amount.toLocaleString('en-IN')}
                      </span>
                    )}
                    {ref && (
                      <span className="inline-flex items-center gap-1 text-gray-500">
                        <Hash className="w-3 h-3" />
                        {String(ref).slice(-6)}
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex items-center justify-between">
                    <p className="flex items-center gap-1 text-[11px] text-gray-400">
                      <Clock3 className="w-3 h-3" />
                      {n.timestamp ? format(new Date(n.timestamp), 'MMM dd, h:mm a') : '—'}
                    </p>
                    {!n.read && (
                      <button
                        onClick={() => onMarkRead(n.id)}
                        className="text-[11px] text-blue-300 hover:text-blue-200"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

NotificationsTab.propTypes = {
  notifications: PropTypes.array.isRequired,
  onMarkRead: PropTypes.func.isRequired,
  onMarkAllRead: PropTypes.func.isRequired
};

export default NotificationsTab;
