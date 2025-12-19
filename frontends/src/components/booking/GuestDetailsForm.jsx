import React from 'react';
import PropTypes from 'prop-types';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const GuestDetailsForm = ({ guestDetails, setGuestDetails, onBack, onContinue }) => {
  const handleContinue = () => {
    if (!guestDetails.fullName || !guestDetails.email || !guestDetails.phone ||
        !guestDetails.idNumber || !guestDetails.address || !guestDetails.city ||
        !guestDetails.state || !guestDetails.pincode) {
      alert('Please fill all required fields');
      return;
    }
    if (guestDetails.phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    if (guestDetails.pincode.length !== 6) {
      alert('Please enter a valid 6-digit pincode');
      return;
    }
    onContinue();
  };

  return (
    <motion.div
      key="details"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4 max-h-[600px] overflow-y-auto pr-2"
    >
      <div>
        <label className="block text-gray-300 mb-2 font-medium text-sm flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span>Full Name *</span>
        </label>
        <input
          type="text"
          value={guestDetails.fullName}
          onChange={(e) => setGuestDetails({ ...guestDetails, fullName: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          placeholder="As per ID proof"
          aria-required="true"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2 font-medium text-sm flex items-center space-x-2">
          <Mail className="w-4 h-4" />
          <span>Email *</span>
        </label>
        <input
          type="email"
          value={guestDetails.email}
          onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          placeholder="For booking confirmation"
          aria-required="true"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2 font-medium text-sm flex items-center space-x-2">
          <Phone className="w-4 h-4" />
          <span>Mobile Number *</span>
        </label>
        <input
          type="tel"
          value={guestDetails.phone}
          onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          placeholder="10-digit mobile number"
          aria-required="true"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-300 mb-2 font-medium text-sm">ID Proof *</label>
          <select
            value={guestDetails.idProofType}
            onChange={(e) => setGuestDetails({ ...guestDetails, idProofType: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            aria-required="true"
          >
            <option value="aadhaar">Aadhaar</option>
            <option value="pan">PAN Card</option>
            <option value="passport">Passport</option>
            <option value="driving">Driving License</option>
            <option value="voter">Voter ID</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300 mb-2 font-medium text-sm">ID Number *</label>
          <input
            type="text"
            value={guestDetails.idNumber}
            onChange={(e) => setGuestDetails({ ...guestDetails, idNumber: e.target.value.toUpperCase() })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="ID number"
            aria-required="true"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-300 mb-2 font-medium text-sm flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>Address *</span>
        </label>
        <textarea
          value={guestDetails.address}
          onChange={(e) => setGuestDetails({ ...guestDetails, address: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          placeholder="Flat/House No, Building, Street"
          rows="2"
          aria-required="true"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-300 mb-2 font-medium text-sm">City *</label>
          <input
            type="text"
            value={guestDetails.city}
            onChange={(e) => setGuestDetails({ ...guestDetails, city: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="City"
            aria-required="true"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2 font-medium text-sm">State *</label>
          <input
            type="text"
            value={guestDetails.state}
            onChange={(e) => setGuestDetails({ ...guestDetails, state: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="State"
            aria-required="true"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-300 mb-2 font-medium text-sm">Pincode *</label>
        <input
          type="text"
          value={guestDetails.pincode}
          onChange={(e) => setGuestDetails({ ...guestDetails, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          placeholder="6-digit pincode"
          aria-required="true"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2 font-medium text-sm">Special Requests (Optional)</label>
        <textarea
          value={guestDetails.specialRequests}
          onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          placeholder="e.g., Early check-in, high floor, extra pillows"
          rows="2"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2.5 rounded-lg font-semibold transition text-sm"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition text-sm"
        >
          Continue to Payment
        </button>
      </div>
    </motion.div>
  );
};

GuestDetailsForm.propTypes = {
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
  }).isRequired,
  setGuestDetails: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired
};

export default GuestDetailsForm;
