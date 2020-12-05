import React, { useEffect } from 'react';
import { shape, func } from 'prop-types';
import NavPage from '../../components/NavPage';
import { withRouter } from 'react-router-dom';

const ShoppingList = ({ history }) => {
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) history.push('/');
  }, [history]);
  return (
    <NavPage>
      <h1>I am a shopping list</h1>
    </NavPage>
  );
};

ShoppingList.propTypes = {
  history: shape({ push: func }).isRequired,
};

export default withRouter(ShoppingList);
