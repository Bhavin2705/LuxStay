import { useState, useEffect } from 'react';
import { hotelsAPI, bookingsAPI, usersAPI } from '../utils/api';

export const useAdminDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    image: '',
    description: '',
    rooms: '',
    category: 'luxury'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [hotelsData, bookingsData, usersData] = await Promise.all([
        hotelsAPI.getAll(),
        bookingsAPI.getAll(),
        usersAPI.getAll()
      ]);
      const normalize = (payload) => (payload?.data || payload || []);

      setHotels(normalize(hotelsData));
      setBookings(normalize(bookingsData));
      setUsers(normalize(usersData));
    } catch (error) {
      console.error('Error loading admin data:', error);
      showNotification('Failed to load data', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBanUser = async (userId) => {
    try {
      const user = users.find(u => u._id === userId || u.id === userId);
      if (user.banned) {
        await usersAPI.unbanUser(userId);
      } else {
        await usersAPI.banUser(userId);
      }
      await loadData();
      showNotification(`User ${user.banned ? 'unbanned' : 'banned'} successfully`, 'success');
    } catch (error) {
      console.error('Error banning/unbanning user:', error);
      showNotification('Failed to update user status', 'error');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (confirm('Are you sure you want to cancel this booking? This action will notify the user.')) {
      try {
        await bookingsAPI.cancel(bookingId);
        await loadData();
        showNotification('Booking cancelled successfully. User has been notified.', 'success');
      } catch (error) {
        console.error('Error cancelling booking:', error);
        showNotification('Failed to cancel booking', 'error');
      }
    }
  };

  const getUserBookings = (user) => {
    if (!user) return [];

    const userId = user._id || user.id;
    const email = user.email;

    return bookings.filter(b => {
      const bookingUserId = b.userId || b.user || b.user?._id;
      const bookingEmail = b.userEmail || b.email || b.user?.email;

      return (
        (bookingUserId && userId && String(bookingUserId) === String(userId)) ||
        (bookingEmail && email && String(bookingEmail).toLowerCase() === String(email).toLowerCase())
      );
    });
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    try {
      const newHotel = {
        ...formData,
        price: parseFloat(formData.price),
        rating: 0,
        rooms: parseInt(formData.rooms),
        amenities: ['WiFi', 'Restaurant', 'Parking']
      };
      await hotelsAPI.create(newHotel);
      await loadData();
      setShowAddHotel(false);
      resetForm();
      showNotification('Hotel added successfully', 'success');
    } catch (error) {
      console.error('Error adding hotel:', error);
      showNotification('Failed to add hotel', 'error');
    }
  };

  const handleEditHotel = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        price: parseFloat(formData.price),
        rooms: parseInt(formData.rooms)
      };
      await hotelsAPI.update(editingHotel._id || editingHotel.id, updatedData);
      await loadData();
      setEditingHotel(null);
      resetForm();
      showNotification('Hotel updated successfully', 'success');
    } catch (error) {
      console.error('Error updating hotel:', error);
      showNotification('Failed to update hotel', 'error');
    }
  };

  const handleDeleteHotel = async (id) => {
    try {
      await hotelsAPI.delete(id);
      await loadData();
      showNotification('Hotel deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting hotel:', error);
      showNotification('Failed to delete hotel', 'error');
    }
  };

  const startEdit = (hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      location: hotel.location,
      price: hotel.price.toString(),
      image: hotel.image,
      description: hotel.description,
      rooms: hotel.rooms.toString()
    });
    setActiveTab('hotels');
    setShowAddHotel(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      price: '',
      image: '',
      description: '',
      rooms: ''
    });
  };

  return {
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
  };
};
