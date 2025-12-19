import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { bookingsAPI, hotelsAPI } from '../utils/api';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, CheckCircle, Hotel, XCircle } from 'lucide-react';
import BookingHeader from '../components/booking-details/BookingHeader';
import HotelSection from '../components/booking-details/HotelSection';
import StayDetails from '../components/booking-details/StayDetails';
import GuestInfo from '../components/booking-details/GuestInfo';
import PaymentSummarySection from '../components/booking-details/PaymentSummarySection';

const BookingDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookingDetails = async () => {
      try {
        setLoading(true);
        const bookingsResponse = await bookingsAPI.getUserBookings(user.id);
        const bookingsList = bookingsResponse?.data || bookingsResponse || [];
        const foundBooking = bookingsList.find(b => (b._id || b.id) === bookingId);

        if (!foundBooking) {
          setError('Booking not found');
          return;
        }

        setBooking(foundBooking);

        const rawHotel = foundBooking.hotel;

        let hotelId = null;

        if (typeof foundBooking.hotelId === 'string') {
          hotelId = foundBooking.hotelId;
        } else if (foundBooking.hotelId && typeof foundBooking.hotelId === 'object') {
          hotelId = foundBooking.hotelId._id || null;
        } else if (typeof rawHotel === 'string') {
          hotelId = rawHotel;
        } else if (rawHotel && typeof rawHotel === 'object') {
          hotelId = rawHotel._id || rawHotel.id || null;
        }

        if (hotelId) {
          const hotelData = await hotelsAPI.getById(hotelId);
          const normalizedHotel = hotelData?.data || hotelData || null;
          setHotel(normalizedHotel);
        }
      } catch (err) {
        console.error('Error loading booking details:', err);
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadBookingDetails();
    }
  }, [bookingId, user]);

  const canCancelBooking = () => {
    if (!booking || booking.status !== 'confirmed') return false;
    const now = new Date();
    const checkIn = new Date(booking.checkIn);
    const hoursDifference = (checkIn - now) / (1000 * 60 * 60);
    return hoursDifference >= 24;
  };

  const handleCancelBooking = async () => {
    if (!canCancelBooking()) {
      alert('Sorry, you cannot cancel this booking. Cancellation is only allowed 24 hours before check-in.');
      return;
    }

    if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      try {
        await bookingsAPI.cancel(booking._id || booking.id);
        setBooking({ ...booking, status: 'cancelled' });
        alert('Booking cancelled successfully.');
      } catch (err) {
        console.error('Error cancelling booking:', err);
        alert('Failed to cancel booking. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading booking details...</div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">{error || 'Booking not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <BookingHeader booking={booking} />
        {hotel && <HotelSection hotel={hotel} />}
        <StayDetails booking={booking} />
        <GuestInfo guestDetails={booking.guestDetails} />
        <PaymentSummarySection booking={booking} hotel={hotel} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 mb-6"
        >
          <h3 className="text-blue-400 font-semibold mb-3 flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Important Information</span>
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• A confirmation email has been sent to {booking.guestDetails?.email}</li>
            <li>• Please carry a valid ID proof matching your booking details</li>
            <li>• Check-in time: After 2:00 PM | Check-out time: Before 11:00 AM</li>
            <li>• Early check-in/late check-out subject to availability</li>
            <li>• Contact the hotel directly for any special requests or modifications</li>
            <li className="text-yellow-400">• <strong>Cancellation Policy:</strong> Free cancellation up to 24 hours before check-in</li>
          </ul>
        </motion.div>

        {booking.status === 'confirmed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className={`rounded-xl p-4 mb-6 ${
              canCancelBooking()
                ? 'bg-yellow-900/20 border border-yellow-500/30'
                : 'bg-red-900/20 border border-red-500/30'
            }`}
          >
            <p className={`text-sm flex items-center space-x-2 ${
              canCancelBooking() ? 'text-yellow-300' : 'text-red-300'
            }`}>
              {canCancelBooking() ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>You can cancel this booking for free until {new Date(new Date(booking.checkIn).getTime() - 24 * 60 * 60 * 1000).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  <span>Cancellation period has expired. This booking cannot be cancelled.</span>
                </>
              )}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          {booking.status === 'confirmed' && canCancelBooking() && (
            <button
              onClick={handleCancelBooking}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
            >
              <XCircle className="w-5 h-5" />
              <span>Cancel Booking</span>
            </button>
          )}
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
          >
            <Hotel className="w-5 h-5" />
            <span>Book Another Hotel</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingDetails;

