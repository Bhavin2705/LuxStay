import React from 'react';
import PropTypes from 'prop-types';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CustomCalendar from '../CustomCalendar';
import CustomDropdown from '../CustomDropdown';
import { calculateNights, calculateRooms, calculateTotal, guestOptions } from './BookingCalculations';

const DateSelection = ({
  hotel,
  user,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  showCalendar,
  setShowCalendar,
  onContinue
}) => {
  const navigate = useNavigate();
  const nights = calculateNights(checkIn, checkOut);
  const rooms = calculateRooms(guests);
  const total = calculateTotal(hotel, checkIn, checkOut, guests);

  const handleContinue = () => {
    if (!user) {
      sessionStorage.setItem('bookingProgress', JSON.stringify({
        hotelId: hotel._id || hotel.id,
        checkIn: checkIn?.toISOString(),
        checkOut: checkOut?.toISOString(),
        guests: guests
      }));
      navigate('/login');
    } else {
      onContinue();
    }
  };

  return (
    <motion.div
      key="dates"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div>
        <label className="block text-gray-300 mb-2 font-medium">Check-in Date</label>
        <button
          onClick={() => setShowCalendar(showCalendar === 'checkin' ? '' : 'checkin')}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-left text-white hover:border-gray-500 transition flex items-center justify-between"
          aria-label="Select check-in date"
        >
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span>{checkIn ? checkIn.toLocaleDateString('en-IN') : 'Select date'}</span>
          </div>
        </button>
        {showCalendar === 'checkin' && (
          <div className="mt-2">
            <CustomCalendar
              selectedDate={checkIn}
              onDateSelect={(date) => {
                setCheckIn(date);
                if (checkOut && checkOut <= date) {
                  const nextDay = new Date(date);
                  nextDay.setDate(nextDay.getDate() + 1);
                  setCheckOut(nextDay);
                }
                setShowCalendar('');
              }}
              minDate={new Date()}
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-gray-300 mb-2 font-medium">Check-out Date</label>
        <button
          onClick={() => setShowCalendar(showCalendar === 'checkout' ? '' : 'checkout')}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-left text-white hover:border-gray-500 transition flex items-center justify-between"
          aria-label="Select check-out date"
          disabled={!checkIn}
        >
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span>{checkOut ? checkOut.toLocaleDateString('en-IN') : 'Select date'}</span>
          </div>
        </button>
        {showCalendar === 'checkout' && (
          <div className="mt-2">
            <CustomCalendar
              selectedDate={checkOut}
              onDateSelect={(date) => {
                setCheckOut(date);
                setShowCalendar('');
              }}
              minDate={checkIn ? (() => {
                const minDate = new Date(checkIn);
                minDate.setDate(minDate.getDate() + 1);
                return minDate;
              })() : new Date()}
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-gray-300 mb-2 font-medium">Guests</label>
        <CustomDropdown
          options={guestOptions}
          value={guests}
          onChange={setGuests}
          placeholder="Select guests"
        />
      </div>

      {checkIn && checkOut && (
        <div className="bg-gray-700 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-gray-300 text-sm">
            <span>{rooms} Room{rooms > 1 ? 's' : ''} × {nights} night{nights > 1 ? 's' : ''}</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-gray-400 text-xs">
            <span>(₹{hotel.price.toLocaleString('en-IN')} per room per night)</span>
          </div>
          {rooms > 1 && (
            <div className="bg-blue-600/20 border border-blue-600 rounded p-2 mt-2">
              <p className="text-blue-300 text-xs">
                {guests} guests require {rooms} rooms (max 2 guests per room)
              </p>
            </div>
          )}
          <div className="border-t border-gray-600 pt-2 flex justify-between text-white font-bold">
            <span>Total</span>
            <span className="text-green-400">₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      <button
        onClick={handleContinue}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        {user ? 'Continue' : 'Login to Continue'}
      </button>
    </motion.div>
  );
};

DateSelection.propTypes = {
  hotel: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    price: PropTypes.number.isRequired
  }).isRequired,
  user: PropTypes.object,
  checkIn: PropTypes.instanceOf(Date),
  setCheckIn: PropTypes.func.isRequired,
  checkOut: PropTypes.instanceOf(Date),
  setCheckOut: PropTypes.func.isRequired,
  guests: PropTypes.number.isRequired,
  setGuests: PropTypes.func.isRequired,
  showCalendar: PropTypes.string.isRequired,
  setShowCalendar: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired
};

export default DateSelection;
