import React from 'react';
import Nav from './Nav';
import Page from './Page';

const NavPage = ({ children }) => {
  return (
    <Page>
      {children}
      <Nav />
    </Page>
  );
};

export default NavPage;
