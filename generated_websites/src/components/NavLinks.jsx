import React, { useState } from 'react';

const NavLinks = () => {
  const [activeLink, setActiveLink] = useState('Home');
  
  const links = [
    { name: 'Home', path: '#' },
    { name: 'Education', path: '#' },
    { name: 'Teachers', path: '#' },
    { name: 'About us', path: '#' }
  ];
  
  const handleClick = (name) => {
    setActiveLink(name);
  };
  
  return (
    <div className="flex space-x-6">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.path}
          className={`nav-link font-medium ${activeLink === link.name ? 'active-nav-link' : ''}`}
          onClick={() => handleClick(link.name)}
        >
          {link.name}
        </a>
      ))}
    </div>
  );
};

export default NavLinks;