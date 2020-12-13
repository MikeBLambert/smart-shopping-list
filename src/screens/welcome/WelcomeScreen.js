import { compose } from 'ramda';
import React, { useEffect, useState } from 'react';
import { withFirestore } from 'react-firestore';
import { withRouter } from 'react-router-dom';
import Page from '../../components/Page';
import getToken from '../../lib/tokens';
import { PATHS } from '../../utils/constants';
import { useToken } from '../../utils/hooks';

const WelcomeScreen = ({ firestore, history }) => {
  useToken();
  const [isError, setIsError] = useState(false);
  const [sharedToken, setSharedToken] = useState('');

  useEffect(() => {
    if (!sharedToken) return;
  }, [firestore, sharedToken]);

  const handleNewTokenClick = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    history.push(PATHS.list);
  };

  const handleSharedTokenClick = () => {
    const db = firestore.collection(sharedToken);
    db.get().then((value) => {
      if (!value.empty) {
        localStorage.setItem('token', sharedToken);
        history.push(PATHS.list);
      } else {
        setIsError(true);
      }
    });
  };

  return (
    <Page>
      <h1>Welcome to your Shopping list!</h1>
      <button onClick={handleNewTokenClick}>Create a new list</button>
      <div>
        <label htmlFor="shareToken">Share token</label>
        <input
          id="shareToken"
          value={sharedToken}
          onChange={({ target: { value } }) => setSharedToken(value)}
        />
        <button type="submit" onClick={handleSharedTokenClick}>
          Join an existing list
        </button>
        {isError && <h2>Invalid Token</h2>}
      </div>
    </Page>
  );
};

WelcomeScreen.propTypes = {};

export default compose(withRouter, withFirestore)(WelcomeScreen);
