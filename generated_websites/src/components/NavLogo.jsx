import React from 'react';

const NavLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center shadow-md">
        <span className="text-white text-xl font-bold">E</span>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text">EduPortal</span>
    </div>
  );
};

export default NavLogo;