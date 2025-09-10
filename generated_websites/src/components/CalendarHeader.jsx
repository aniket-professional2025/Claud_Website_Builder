import React from 'react';

const CalendarHeader = ({ year, month }) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="mb-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{monthNames[month]}</h2>
      <p className="text-xl md:text-2xl text-gray-600">{year}</p>
    </div>
  );
};

export default CalendarHeader;