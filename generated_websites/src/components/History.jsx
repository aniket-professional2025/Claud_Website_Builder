import React from 'react'

const History = ({ history, onClearHistory }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl font-bold">Calculation History</h2>
          <button 
            onClick={onClearHistory} 
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-sm px-3 py-1 rounded-full transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 max-h-96">
        {history.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-2">No calculations yet</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {history.map((item, index) => (
              <li key={index} className="bg-gray-50 rounded-lg p-3 shadow-sm">
                <div className="text-gray-600">{item.calculation}</div>
                <div className="text-xl font-semibold text-gray-800">{item.result}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default History