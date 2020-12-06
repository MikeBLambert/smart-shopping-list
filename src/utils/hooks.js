import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const useToken = () => {
  const token = localStorage.getItem('token');
  const history = useHistory();
  useEffect(() => {
    if (!token) history.push('/');
  }, [history, token]);
  return token;
};
