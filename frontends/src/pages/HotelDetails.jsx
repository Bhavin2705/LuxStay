import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import hotelsAPI from '../utils/api/hotelsAPI';
import bookingsAPI from '../utils/api/bookingsAPI';
import HotelInfo from '../components/HotelInfo';
import BookingPanel from '../components/BookingPanel';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hotel, setHotel] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [showCalendar, setShowCalendar] = useState('');

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id || id === 'undefined') {
        console.error('Invalid hotel ID');
        navigate('/');
        return;
      }
      
      try {
        const response = await hotelsAPI.getById(id);
        if (response.success) {
          setHotel(response.data);
        }
      } catch (error) {
        console.error('Error fetching hotel:', error);
      }
    };

    fetchHotel();
  }, [id, navigate]);

  useEffect(() => {
    if (!user) return;
    
    const savedProgress = sessionStorage.getItem('bookingProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        if (progress.hotelId && progress.hotelId !== id) {
          navigate(`/hotel/${progress.hotelId}`);
        } else if (progress.hotelId === id) {
          if (progress.checkIn) setCheckIn(new Date(progress.checkIn));
          if (progress.checkOut) setCheckOut(new Date(progress.checkOut));
          if (progress.guests) setGuests(progress.guests);
          sessionStorage.removeItem('bookingProgress');
        }
      } catch (error) {
        console.error('Error restoring booking progress:', error);
        sessionStorage.removeItem('bookingProgress');
      }
    }
  }, [user, id, navigate]);

  const handleBooking = async (guestDetails) => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    if (!user) {
      alert('Please log in to complete your booking');
      navigate('/login');
      return;
    }

    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const rooms = Math.ceil(guests / 2);
    const totalPrice = nights * hotel.price * rooms;

    const bookingData = {
      hotelId: hotel._id,
      hotelName: hotel.name,
      userName: user.name,
      userEmail: user.email,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests,
      rooms,
      nights,
      totalPrice,
      guestDetails: {
        fullName: guestDetails.fullName,
        email: guestDetails.email,
        phone: guestDetails.phone,
        idProofType: guestDetails.idProofType,
        idNumber: guestDetails.idNumber,
        address: guestDetails.address,
        city: guestDetails.city,
        state: guestDetails.state,
        pincode: guestDetails.pincode,
        specialRequests: guestDetails.specialRequests || ''
      }
    };

    try {
      console.log('Sending booking data:', bookingData);
      const response = await bookingsAPI.create(bookingData);
      console.log('Booking response:', response);
      if (response && response._id) {
        navigate('/booking-confirmation', { 
          state: { 
            booking: response,
            hotel: hotel,
            guestDetails: guestDetails
          } 
        });
      } else {
        console.error('Booking failed (unexpected response):', JSON.stringify(response, null, 2));
        const message = response?.message || 'Failed to create booking';
        alert(message);
      }
    } catch (error) {
      console.error('Booking error:', JSON.stringify(error, null, 2));
      console.error('Error details:', error);
      alert(error.message || 'Failed to create booking. Please try again.');
    }
  };

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Hotel not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-6 border border-blue-500"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Sign in to book this hotel</h3>
                <p className="text-blue-100 text-sm">Join LuxStay to unlock exclusive deals and manage your bookings</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-950 transition border border-blue-400"
                >
                  Register
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-96 rounded-2xl overflow-hidden mb-6">
                <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-full object-cover" />
              </div>
              <HotelInfo hotel={hotel} />
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {hotel && (
                <BookingPanel
                  hotel={hotel}
                  user={user}
                  checkIn={checkIn}
                  setCheckIn={setCheckIn}
                  checkOut={checkOut}
                  setCheckOut={setCheckOut}
                  guests={guests}
                  setGuests={setGuests}
                  showCalendar={showCalendar}
                  setShowCalendar={setShowCalendar}
                  handleBooking={handleBooking}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
