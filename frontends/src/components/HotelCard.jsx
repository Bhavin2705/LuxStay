import React from 'react';
import PropTypes from 'prop-types';
import { Star, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 cursor-pointer"
      onClick={() => navigate(`/hotel/${hotel._id || hotel.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ₹{hotel.price.toLocaleString('en-IN')}/night
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{hotel.name}</h3>
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">{hotel.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm text-white font-semibold">{hotel.rating}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-4">{hotel.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-400">
            <Users className="w-4 h-4" />
            <span className="text-sm">{hotel.rooms} rooms</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

HotelCard.propTypes = {
  hotel: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
    rooms: PropTypes.number.isRequired
  }).isRequired
};

export default HotelCard;
