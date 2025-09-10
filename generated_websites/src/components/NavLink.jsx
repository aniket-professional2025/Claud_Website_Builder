import React from 'react'

const NavLink = ({ href, children, color }) => {
  return (
    <a 
      href={href} 
      className={`nav-link block bg-gradient-to-r ${color} bg-clip-text hover:text-transparent`}
    >
      {children}
    </a>
  )
}

export default NavLink