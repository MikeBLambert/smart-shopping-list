import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.nav`
  width: 100%;
  bottom: 0;
  position: fixed;
  height: 50px;
`;

const NavBarContents = styled.ul`
  display: grid;
  list-style-type: none;
  grid-template-columns: 50vw 50vw;
  margin: 0;
  padding: 0;
`;

const NavBarItem = styled.li`
  padding-top: 12px;
  height: 50px;
  border: 4px solid black;
  width: 100%;
  text-align: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Nav = () => {
  return (
    <NavBar>
      <NavBarContents>
        <NavBarItem>
          <NavLink to="/list">View</NavLink>
        </NavBarItem>
        <NavBarItem>
          <NavLink to="/add">Add</NavLink>
        </NavBarItem>
      </NavBarContents>
    </NavBar>
  );
};

Nav.propTypes = {};

export default Nav;
