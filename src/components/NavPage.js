import React from 'react';
import Nav from './Nav';

const NavPage = ({ children }) => {
  return (
    <div className="page">
      {children}
      <Nav />
    </div>
  );
};

export default NavPage;
