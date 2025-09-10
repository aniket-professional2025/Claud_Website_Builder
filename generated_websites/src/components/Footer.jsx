import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-12 text-center text-gray-500 text-sm">
      <p>© {new Date().getFullYear()} Modern Colorful Calculator</p>
      <p className="mt-1">Built with React and Tailwind CSS</p>
    </footer>
  )
}

export default Footer