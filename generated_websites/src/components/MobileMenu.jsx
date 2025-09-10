import React from 'react'

const MobileMenu = ({ isOpen, navLinks }) => {
  if (!isOpen) return null

  return (
    <div className="md:hidden">
      <div className="space-y-1 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 pb-3 pt-2 shadow-lg">
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={`block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gradient-to-r ${link.color} transition-colors duration-300`}
          >
            {link.text}
          </a>
        ))}
      </div>
    </div>
  )
}

export default MobileMenu