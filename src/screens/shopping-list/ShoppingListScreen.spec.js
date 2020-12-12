import { cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { PATHS } from '../../utils/constants';
import { createIntegrationTestWrapper } from '../../utils/testUtils';
import ShoppingListScreen from './ShoppingListScreen';

describe('<ShoppingListScreen />', () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
  });
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });
  it('redirects to welcome page if there is no token stored in localStorage', () => {
    history.push(PATHS.list);
    createIntegrationTestWrapper(ShoppingListScreen, { history });
    expect(history.location.pathname).toEqual('/');
  });

  it('does not redirect to welcome page if there is a token stored in localStorage', () => {
    history.push(PATHS.list);
    localStorage.setItem('token', 'me is token');
    const { container } = createIntegrationTestWrapper(ShoppingListScreen, {
      history,
    });
    expect(history.location.pathname).toEqual(PATHS.list);
    expect(container).toMatchSnapshot();
  });
});
