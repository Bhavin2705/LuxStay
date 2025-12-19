import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const CustomCalendar = ({ selectedDate = null, onDateSelect, minDate = new Date() }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const [direction, setDirection] = useState(0);
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };
  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  const handleNextMonth = () => {
    setDirection(1);
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  const handleDateClick = (day) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (selected >= minDate.setHours(0, 0, 0, 0)) {
      onDateSelect(selected);
    }
  };
  const isSelectedDate = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day &&
           selectedDate.getMonth() === currentMonth.getMonth() &&
           selectedDate.getFullYear() === currentMonth.getFullYear();
  };
  const isBeforeMinDate = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date < minDate.setHours(0, 0, 0, 0);
  };
  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 300 : -300, opacity: 0 })
  };
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-2xl border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-700 rounded-lg transition">
          <ChevronLeft className="w-5 h-5 text-gray-300" />
        </button>
        <h3 className="text-lg font-semibold text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-700 rounded-lg transition">
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentMonth.getMonth()}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="grid grid-cols-7 gap-2"
        >
          {[...Array(startingDayOfWeek)].map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const isSelected = isSelectedDate(day);
            const isDisabled = isBeforeMinDate(day);
            return (
              <motion.button
                key={day}
                whileHover={!isDisabled ? { scale: 1.1 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                onClick={() => !isDisabled && handleDateClick(day)}
                disabled={isDisabled}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition
                  ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : ''}
                  ${!isSelected && !isDisabled ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : ''}
                  ${isDisabled ? 'bg-gray-900 text-gray-600 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {day}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

CustomCalendar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onDateSelect: PropTypes.func.isRequired,
  minDate: PropTypes.instanceOf(Date)
};

export default CustomCalendar;
