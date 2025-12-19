import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle } from 'lucide-react';

const BookingProgress = ({ currentStep }) => {
  const steps = [
    { key: 'dates', label: 'Dates', number: 1 },
    { key: 'details', label: 'Details', number: 2 },
    { key: 'payment', label: 'Payment', number: 3 }
  ];

  const getStepClass = (step) => {
    if (currentStep === step.key) {
      return 'bg-blue-600 text-white';
    }
    const stepIndex = steps.findIndex(s => s.key === step.key);
    const currentIndex = steps.findIndex(s => s.key === currentStep);
    if (currentIndex > stepIndex) {
      return 'bg-green-600 text-white';
    }
    return 'bg-gray-700 text-gray-400';
  };

  const isCompleted = (step) => {
    const stepIndex = steps.findIndex(s => s.key === step.key);
    const currentIndex = steps.findIndex(s => s.key === currentStep);
    return currentIndex > stepIndex;
  };

  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, index) => (
        <React.Fragment key={step.key}>
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getStepClass(step)}`}>
              {isCompleted(step) ? <CheckCircle className="w-4 h-4" /> : step.number}
            </div>
            <span className={`text-xs ${currentStep === step.key ? 'text-white' : 'text-gray-400'}`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-1 bg-gray-700 mx-1"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

BookingProgress.propTypes = {
  currentStep: PropTypes.oneOf(['dates', 'details', 'payment']).isRequired
};

export default BookingProgress;
