import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useAdminDashboard } from '../hooks/useAdminDashboard';
import { getMonthlyStats, getTotalRevenue, getActiveUsers } from '../utils/adminStats';
import NotificationToast from '../components/admin/NotificationToast';
import UserDetailModal from '../components/admin/UserDetailModal';
import TabNavigation from '../components/admin/TabNavigation';
import OverviewTab from '../components/admin/OverviewTab';
import HotelsTab from '../components/admin/HotelsTab';
import UsersTab from '../components/admin/UsersTab';
import BookingsTab from '../components/admin/BookingsTab';
import StatisticsTab from '../components/admin/StatisticsTab';
import AdminProfileTab from '../components/admin/AdminProfileTab';
import LiveBookingFeed from '../components/admin/LiveBookingFeed';
import NotificationsTab from '../components/admin/NotificationsTab';
import { useSocket } from '../contexts/SocketContext';

const AdminDashboard = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const { notifications, markAsRead, markAllAsRead } = useSocket();
  const {
    hotels,
    bookings,
    users,
    showAddHotel,
    setShowAddHotel,
    editingHotel,
    setEditingHotel,
    selectedUser,
    setSelectedUser,
    activeTab,
    setActiveTab,
    notification,
    formData,
    setFormData,
    handleBanUser,
    handleCancelBooking,
    getUserBookings,
    handleAddHotel,
    handleEditHotel,
    handleDeleteHotel,
    startEdit,
    resetForm,
    showNotification
  } = useAdminDashboard();

  const handleUpdateProfile = async (profileData) => {
    try {
      if (profileData.name || profileData.email) {
        const updates = {};
        if (profileData.name) updates.name = profileData.name;
        if (profileData.email) updates.email = profileData.email;
        
        const result = await updateProfile(user.id, updates);
        if (!result.success) {
          showNotification(result.message || 'Failed to update profile', 'error');
          return;
        }
      }

      if (profileData.newPassword) {
        if (!profileData.currentPassword) {
          showNotification('Current password is required to change password', 'error');
          return;
        }
        
        const passwordResult = await changePassword(
          user.id, 
          profileData.currentPassword, 
          profileData.newPassword
        );
        
        if (!passwordResult.success) {
          showNotification(passwordResult.message || 'Failed to change password', 'error');
          return;
        }
      }
      
      showNotification('Profile updated successfully', 'success');
    } catch (error) {
      console.error('Profile update error:', error);
      showNotification('An error occurred while updating profile', 'error');
    }
  };

  const totalRevenue = getTotalRevenue(bookings);
  const activeUsers = getActiveUsers(users);
  const monthlyStats = getMonthlyStats(bookings);
  const maxRevenue = Math.max(...monthlyStats.map(m => m.revenue), 1);
  const maxBookings = Math.max(...monthlyStats.map(m => m.bookings), 1);

  return (
    <div className="min-h-screen bg-gray-900 py-4 sm:py-8">
      <NotificationToast notification={notification} />
      <UserDetailModal 
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        getUserBookings={getUserBookings}
        handleBanUser={handleBanUser}
        handleCancelBooking={handleCancelBooking}
        users={users}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 sm:p-8 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-purple-100 text-sm sm:text-base">Manage hotels, bookings, and users</p>
          </div>

          <TabNavigation 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            setShowAddHotel={setShowAddHotel}
            setEditingHotel={setEditingHotel}
          />

          {activeTab === 'overview' && (
            <>
              <div className="mb-8">
                <LiveBookingFeed />
              </div>
              <OverviewTab 
                hotels={hotels}
                bookings={bookings}
                activeUsers={activeUsers}
                totalRevenue={totalRevenue}
              />
            </>
          )}

          {activeTab === 'hotels' && (
            <HotelsTab
              hotels={hotels}
              showAddHotel={showAddHotel}
              setShowAddHotel={setShowAddHotel}
              editingHotel={editingHotel}
              setEditingHotel={setEditingHotel}
              formData={formData}
              setFormData={setFormData}
              handleAddHotel={handleAddHotel}
              handleEditHotel={handleEditHotel}
              handleDeleteHotel={handleDeleteHotel}
              startEdit={startEdit}
              resetForm={resetForm}
            />
          )}

          {activeTab === 'users' && (
            <UsersTab
              users={users}
              getUserBookings={getUserBookings}
              setSelectedUser={setSelectedUser}
              handleBanUser={handleBanUser}
            />
          )}

          {activeTab === 'bookings' && (
            <BookingsTab
              bookings={bookings}
              handleCancelBooking={handleCancelBooking}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationsTab
              notifications={notifications.filter((n) => n.type === 'booking')}
              onMarkRead={markAsRead}
              onMarkAllRead={markAllAsRead}
            />
          )}

          {activeTab === 'stats' && (
            <StatisticsTab
              monthlyStats={monthlyStats}
              maxRevenue={maxRevenue}
              maxBookings={maxBookings}
            />
          )}

          {activeTab === 'profile' && (
            <AdminProfileTab
              user={user}
              onUpdateProfile={handleUpdateProfile}
              showNotification={showNotification}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
