import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hotel, MapPin, ArrowLeft } from 'lucide-react';

const HotelSection = ({ hotel }) => {
  const hotelId = hotel._id || hotel.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Hotel className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-bold text-white">Hotel Information</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full md:w-48 h-48 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">{hotel.name}</h3>
          <div className="flex items-start space-x-2 text-gray-300 mb-2">
            <MapPin className="w-4 h-4 mt-1 text-gray-400 flex-shrink-0" />
            <span>{hotel.location}</span>
          </div>
          <p className="text-gray-400 text-sm">{hotel.description}</p>
          <div className="mt-4">
            <Link
              to={hotelId ? `/hotel/${hotelId}` : '#'}
              className="text-blue-400 hover:text-blue-300 text-sm font-semibold inline-flex items-center space-x-1"
            >
              <span>View Hotel Details</span>
              <ArrowLeft className="w-4 h-4 transform rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

HotelSection.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};

export default HotelSection;
