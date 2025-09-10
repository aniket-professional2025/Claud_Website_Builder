import React from 'react';

const DateModal = ({ date, onClose }) => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayOfWeek = dayNames[date.date.getDay()];
  const month = monthNames[date.date.getMonth()];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl" 
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-2">
          {month} {date.day}, 2001
        </h3>
        <p className="text-lg text-gray-600 mb-4">
          {dayOfWeek}
          {date.isWeekend && !date.isHoliday && " (Weekend)"}
          {date.isHoliday && ` - ${date.holidayName}`}
        </p>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateModal;