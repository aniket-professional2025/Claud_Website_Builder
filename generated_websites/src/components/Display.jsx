import React from 'react'

const Display = ({ input, result, pendingOperator }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-right">
      {pendingOperator && (
        <div className="text-white text-lg opacity-70 h-6">
          {result !== null ? `${result} ${pendingOperator}` : `${input} ${pendingOperator}`}
        </div>
      )}
      <div className="text-white text-4xl font-bold truncate">{input}</div>
    </div>
  )
}

export default Display