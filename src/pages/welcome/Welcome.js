import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import getToken from '../../lib/tokens';
import { PATHS } from '../../utils/constants';

const Welcome = ({ history }) => {
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) history.push(PATHS.list);
  }, [history]);

  const handleClick = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    history.push(PATHS.list);
  };

  return (
    <Fragment>
      <h1>Welcome to your Shopping list!</h1>
      <button onClick={handleClick}>Create a new list</button>
    </Fragment>
  );
};

Welcome.propTypes = {};

export default withRouter(Welcome);
