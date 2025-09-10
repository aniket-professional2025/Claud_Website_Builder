import React from 'react';

const DayNames = () => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 gap-1 mb-2">
      {dayNames.map((day, index) => (
        <div 
          key={index} 
          className={`text-center font-medium text-sm py-2 
            ${index === 0 || index === 6 ? 'text-red-600' : 'text-gray-600'}`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default DayNames;