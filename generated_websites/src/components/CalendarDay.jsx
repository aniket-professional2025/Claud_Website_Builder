import React from 'react';

const CalendarDay = ({ day, isWeekend, isHoliday, holidayName, onClick }) => {
  let className = "calendar-day";
  
  if (isHoliday) {
    className += " day-holiday";
  } else if (isWeekend) {
    className += " day-weekend";
  } else {
    className += " bg-white text-gray-800 hover:bg-blue-100";
  }
  
  return (
    <div className={className} onClick={onClick}>
      <div className="relative">
        <span>{day}</span>
        {isHoliday && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;