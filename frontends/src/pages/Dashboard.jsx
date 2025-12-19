import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Hotel as HotelIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import hotelsAPI from '../utils/api/hotelsAPI';
import bookingsAPI from '../utils/api/bookingsAPI';
import HotelCard from '../components/HotelCard';
import DashboardStats from '../components/dashboard/DashboardStats';
import BookingsList from '../components/dashboard/BookingsList';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const bookingsData = await bookingsAPI.getUserBookings(user.id);
      const normalizedBookings = bookingsData?.data || bookingsData || [];
      setBookings(normalizedBookings);

      const hotelsResponse = await hotelsAPI.getAll();
      const normalizedHotels = hotelsResponse?.data || hotelsResponse || [];
      setHotels(normalizedHotels);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const canCancelBooking = (checkInDate) => {
    const now = new Date();
    const checkIn = new Date(checkInDate);
    const hoursDifference = (checkIn - now) / (1000 * 60 * 60);
    return hoursDifference >= 24;
  };

  const handleCancelBooking = async (e, booking) => {
    e.stopPropagation();
    
    if (booking.status === 'cancelled') {
      alert('This booking is already cancelled.');
      return;
    }

    if (!canCancelBooking(booking.checkIn)) {
      alert('Sorry, you cannot cancel this booking. Cancellation is only allowed 24 hours before check-in.');
      return;
    }

    if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      try {
        const response = await bookingsAPI.cancel(booking._id);
        if (response.success) {
          loadData();
          alert('Booking cancelled successfully.');
        } else {
          alert(response.message || 'Failed to cancel booking');
        }
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Failed to cancel booking. Please try again.');
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-500/20 text-green-500 border-green-500',
      pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500',
      cancelled: 'bg-red-500/20 text-red-500 border-red-500'
    };
    return colors[status] || colors.confirmed;
  };
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
            <p className="text-blue-100">Manage your bookings and explore new destinations</p>
          </div>
          
          <DashboardStats bookings={bookings} />

          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Explore Hotels</h2>
              <HotelIcon className="w-8 h-8 text-blue-500" />
            </div>
            
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search hotels by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.slice(0, 6).map((hotel) => (
                <HotelCard key={hotel._id || hotel.id} hotel={hotel} />
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center py-12">
                <HotelIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No hotels found matching your search</p>
              </div>
            )}

            {filteredHotels.length > 6 && (
              <div className="text-center mt-6">
                <Link
                  to="/"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  View All Hotels ({filteredHotels.length})
                </Link>
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Your Bookings</h2>
            <BookingsList 
              bookings={bookings}
              onCancel={handleCancelBooking}
              canCancel={canCancelBooking}
              getStatusColor={getStatusColor}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default Dashboard;
