import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const CustomDropdown = ({ options, value = null, onChange, placeholder = 'Select...' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const selectedOption = options.find(opt => opt.value === value);
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 flex items-center justify-between text-white hover:border-gray-600 transition"
      >
        <span className={selectedOption ? 'text-white' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left transition ${
                    value === option.value ? 'bg-blue-600/20 text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default CustomDropdown;
