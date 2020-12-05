import { cleanup } from '@testing-library/react';
import Welcome from './Welcome';
import { createMemoryHistory } from 'history';
import { PATHS } from '../../utils/constants';
import { createIntegrationTestWrapper } from '../../utils/testUtils';

describe('<Welcome />', () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('clicking on "Create a new list" redirects to /list and sets token in localStorage', () => {
    const { getByText } = createIntegrationTestWrapper(Welcome, { history });
    getByText('Create a new list').click();
    expect(history.location.pathname).toEqual(PATHS.list);
    expect(localStorage.getItem('token').split(' ').length).toEqual(3);
  });

  it('redirects to /list if token is already set in localStorage', () => {
    localStorage.setItem('token', 'yellow apples cool');
    createIntegrationTestWrapper(Welcome, { history });
    expect(history.location.pathname).toEqual(PATHS.list);
  });
});
