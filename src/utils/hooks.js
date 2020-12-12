import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from './constants';

export const useToken = () => {
  const token = localStorage.getItem('token');
  const history = useHistory();
  useEffect(() => {
    if (!token) {
      history.push('/');
      return;
    }
    if (history.location.pathname === '/') {
      history.push(PATHS.list);
    }
  }, [history, token]);
  return token;
};
