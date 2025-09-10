import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import DayNames from './DayNames';
import CalendarDays from './CalendarDays';
import DateModal from './DateModal';

const Calendar = ({ year, month }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const holidays = [
    { day: 14, month: 1, name: "Valentine's Day" },
    { day: 19, month: 1, name: "Presidents' Day (US)" },
  ];

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const closeModal = () => {
    setSelectedDate(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-3xl w-full">
      <CalendarHeader year={year} month={month} />
      <DayNames />
      <CalendarDays 
        year={year} 
        month={month} 
        holidays={holidays} 
        onDateClick={handleDateClick} 
      />
      
      {selectedDate && (
        <DateModal 
          date={selectedDate} 
          onClose={closeModal} 
          holidays={holidays}
        />
      )}
    </div>
  );
};

export default Calendar;