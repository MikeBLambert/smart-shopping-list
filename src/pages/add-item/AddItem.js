import React, { useEffect } from 'react';
import { shape, func } from 'prop-types';
import NavPage from '../../components/NavPage';
import { withRouter } from 'react-router-dom';

const AddItem = ({ history }) => {
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) history.push('/');
  }, [history]);
  return (
    <NavPage>
      <h1>Add Items</h1>
    </NavPage>
  );
};

AddItem.propTypes = {
  history: shape({ push: func }).isRequired,
};

export default withRouter(AddItem);
