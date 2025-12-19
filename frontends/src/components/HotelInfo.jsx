import React from 'react';
import PropTypes from 'prop-types';
import { MapPin, Star, Check, Users } from 'lucide-react';

const HotelInfo = ({ hotel }) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{hotel.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">{hotel.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-white font-semibold">{hotel.rating}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-blue-500">₹{hotel.price.toLocaleString('en-IN')}</p>
          <p className="text-gray-400">per night</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">About</h2>
        <p className="text-gray-400 leading-relaxed">{hotel.description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Amenities</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {hotel.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-300">
              <Check className="w-5 h-5 text-green-500" />
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-700/50 rounded-xl p-6">
        <div className="flex items-center space-x-2 text-gray-300">
          <Users className="w-5 h-5" />
          <span>{hotel.rooms} rooms available</span>
        </div>
      </div>
    </div>
  );
};

HotelInfo.propTypes = {
  hotel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
    rooms: PropTypes.number.isRequired
  }).isRequired
};

export default HotelInfo;
