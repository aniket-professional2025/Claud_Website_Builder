import React from 'react'

const Header = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        Colorful Calculator
      </h1>
      <p className="mt-2 text-gray-600 max-w-xl mx-auto">
        A modern, colorful calculator with all basic operations and calculation history
      </p>
    </header>
  )
}

export default Header