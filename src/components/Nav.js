import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav-bar">
      <ul className="nav-bar__contents">
        <Link to="/list">
          <li className="nav-bar__item">View</li>
        </Link>
        <Link to="/add">
          <li className="nav-bar__item">Add</li>
        </Link>
      </ul>
    </nav>
  );
};

Nav.propTypes = {};

export default Nav;
