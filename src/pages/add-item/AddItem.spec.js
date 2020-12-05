import { cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { PATHS } from '../../utils/constants';
import { createIntegrationTestWrapper } from '../../utils/testUtils';
import AddItem from './AddItem';

describe('<AddItem />', () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
  });
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });
  it('redirects to welcome page if there is no token stored in localStorage', () => {
    history.push(PATHS.add);
    createIntegrationTestWrapper(AddItem, { history });
    expect(history.location.pathname).toEqual('/');
  });

  it('does not redirect to welcome page if there is a token stored in localStorage', () => {
    history.push(PATHS.add);
    localStorage.setItem('token', 'me is token');
    createIntegrationTestWrapper(AddItem, { history });
    expect(history.location.pathname).toEqual(PATHS.add);
  });
});
