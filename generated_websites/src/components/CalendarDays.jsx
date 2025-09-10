import React from 'react';

const CalendarDays = ({ year, month, holidays, onDateClick }) => {
  // Get the first day of the month
  const firstDayOfMonth = new Date(year, month, 1);
  
  // Get the number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Get the day of the week the month starts on (0-6, where 0 is Sunday)
  const startingDayOfWeek = firstDayOfMonth.getDay();
  
  // Create an array to represent the calendar grid
  const calendarDays = [];
  
  // Fill in the empty days from the previous month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Fill in the days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  
  // Check if a date is a holiday
  const isHoliday = (day) => {
    return holidays.some(holiday => holiday.day === day && holiday.month === month);
  };
  
  // Get holiday name if applicable
  const getHolidayName = (day) => {
    const holiday = holidays.find(h => h.day === day && h.month === month);
    return holiday ? holiday.name : null;
  };
  
  // Check if a date is a weekend
  const isWeekend = (index, day) => {
    if (day === null) return false;
    const dayOfWeek = (startingDayOfWeek + index) % 7;
    return dayOfWeek === 0 || dayOfWeek === 6;
  };
  
  return (
    <div className="grid grid-cols-7 gap-1">
      {calendarDays.map((day, index) => {
        if (day === null) {
          return (
            <div key={`empty-${index}`} className="calendar-day calendar-day-empty"></div>
          );
        }
        
        const date = new Date(year, month, day);
        const isWeekendDay = isWeekend(index, day);
        const isHolidayDay = isHoliday(day);
        const holidayName = getHolidayName(day);
        
        let dayClasses = "calendar-day calendar-day-active";
        
        if (isHolidayDay) {
          dayClasses = "calendar-day calendar-day-holiday";
        } else if (isWeekendDay) {
          dayClasses = "calendar-day calendar-day-weekend";
        }
        
        return (
          <div 
            key={`day-${day}`} 
            onClick={() => onDateClick({ day, date, isWeekend: isWeekendDay, isHoliday: isHolidayDay, holidayName })}
            className={dayClasses}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarDays;