import React from 'react';

const CalendarModal = ({ date, month, year, holidayName, onClose }) => {
  const dateObj = new Date(year, 1, date); // February is 1
  const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {dayOfWeek}, {month} {date}, {year}
          </h3>
          {holidayName && (
            <p className="text-green-600 font-semibold mt-2">{holidayName}</p>
          )}
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            {holidayName 
              ? `This is a holiday: ${holidayName}` 
              : "This is a regular day in February 2001."}
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">February 2001 Facts:</h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>George W. Bush was the President of the United States</li>
              <li>Popular songs included "It Wasn't Me" by Shaggy and "Ms. Jackson" by OutKast</li>
              <li>The average price of gas was approximately $1.46 per gallon</li>
            </ul>
          </div>
        </div>
        
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

export default CalendarModal;