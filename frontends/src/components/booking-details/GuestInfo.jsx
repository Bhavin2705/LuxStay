import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { User, Mail, Phone, FileText, Home } from 'lucide-react';

const GuestInfo = ({ guestDetails }) => {
  if (!guestDetails) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <User className="w-5 h-5 text-orange-500" />
        <h2 className="text-xl font-bold text-white">Guest Information</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <p className="text-gray-400 text-sm mb-1">Full Name</p>
            <p className="text-white font-semibold">{guestDetails.fullName}</p>
          </div>
          <div>
            <div className="flex items-start space-x-2">
              <Mail className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-gray-400 text-sm mb-1">Email Address</p>
                <p className="text-white">{guestDetails.email}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start space-x-2">
              <Phone className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-gray-400 text-sm mb-1">Phone Number</p>
                <p className="text-white">+91 {guestDetails.phone}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start space-x-2">
              <FileText className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-gray-400 text-sm mb-1">ID Proof</p>
                <p className="text-white">
                  {guestDetails.idProofType}: {guestDetails.idNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex items-start space-x-2">
              <Home className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-gray-400 text-sm mb-1">Address</p>
                <p className="text-white">{guestDetails.address}</p>
                <p className="text-white">
                  {guestDetails.city}, {guestDetails.state}
                </p>
                <p className="text-white">PIN: {guestDetails.pincode}</p>
              </div>
            </div>
          </div>
          {guestDetails.specialRequests && (
            <div>
              <p className="text-gray-400 text-sm mb-1">Special Requests</p>
              <p className="text-white bg-gray-700 rounded-lg p-3 text-sm">
                {guestDetails.specialRequests}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

GuestInfo.propTypes = {
  guestDetails: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    idProofType: PropTypes.string.isRequired,
    idNumber: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    pincode: PropTypes.string.isRequired,
    specialRequests: PropTypes.string
  })
};

export default GuestInfo;
