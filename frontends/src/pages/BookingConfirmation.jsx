import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Users, CreditCard, Mail, Phone, MapPin, Home, FileText } from 'lucide-react';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, hotel, guestDetails } = location.state || {};

  if (!booking || !hotel || !guestDetails) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-green-600 rounded-full mb-6"
            >
              <CheckCircle className="w-16 h-16 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-3">Booking Confirmed!</h1>
            <p className="text-gray-400 text-lg">Your reservation has been successfully completed</p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 mb-6">
            <p className="text-blue-100 text-sm mb-2">Booking Reference</p>
            <p className="text-white text-3xl font-bold tracking-wider">{booking.id}</p>
            <p className="text-blue-100 text-sm mt-2">Please save this reference for your records</p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Home className="w-6 h-6 text-blue-500" />
              <span>Hotel Details</span>
            </h2>
            <div className="flex items-start space-x-4">
              <img 
                src={hotel.image || "/placeholder.svg"} 
                alt={hotel.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{hotel.name}</h3>
                <p className="text-gray-400 text-sm flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{hotel.location}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-blue-500" />
              <span>Stay Details</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Check-in</p>
                <p className="text-white font-semibold">{new Date(booking.checkIn).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Check-out</p>
                <p className="text-white font-semibold">{new Date(booking.checkOut).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1 flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Guests</span>
                </p>
                <p className="text-white font-semibold">{booking.guests} {booking.guests > 1 ? 'Guests' : 'Guest'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1 flex items-center space-x-1">
                  <Home className="w-4 h-4" />
                  <span>Rooms</span>
                </p>
                <p className="text-white font-semibold">{booking.rooms || Math.ceil(booking.guests / 2)} {(booking.rooms || Math.ceil(booking.guests / 2)) > 1 ? 'Rooms' : 'Room'}</p>
                <p className="text-gray-500 text-xs">Max 2 guests per room</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Duration</p>
                <p className="text-white font-semibold">{booking.nights} {booking.nights > 1 ? 'Nights' : 'Night'}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <FileText className="w-6 h-6 text-blue-500" />
              <span>Guest Information</span>
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-white font-medium">{guestDetails.fullName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-white">{guestDetails.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-white">+91 {guestDetails.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-white">{guestDetails.address}, {guestDetails.city}, {guestDetails.state} - {guestDetails.pincode}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <CreditCard className="w-6 h-6 text-blue-500" />
              <span>Payment Summary</span>
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>{booking.rooms || Math.ceil(booking.guests / 2)} Room{(booking.rooms || Math.ceil(booking.guests / 2)) > 1 ? 's' : ''} × {booking.nights} Night{booking.nights > 1 ? 's' : ''}</span>
                <span className="text-white">₹{booking.totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>(₹{hotel.price.toLocaleString('en-IN')} per room per night)</span>
              </div>
              <div className="border-t border-gray-700 pt-3 flex justify-between">
                <span className="text-white font-bold text-lg">Total Paid</span>
                <span className="text-green-400 font-bold text-2xl">₹{booking.totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/20 border border-blue-600 rounded-xl p-4 mb-6">
            <p className="text-blue-300 text-sm text-center">
              <Mail className="w-4 h-4 inline mr-2" />
              Your booking details are registered for <span className="font-semibold">{guestDetails.email}</span>
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              View My Bookings
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Book Another Hotel
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
