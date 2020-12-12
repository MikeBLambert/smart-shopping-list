import { cleanup, fireEvent, getByText, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { PATHS } from '../../utils/constants';
import { createIntegrationTestWrapper } from '../../utils/testUtils';
import { AddItemScreenUnwrapped } from './AddItemScreen';

describe('<AddItemScreen />', () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
  });
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    localStorage.clear();
  });
  describe('mounting and redirection', () => {
    it('redirects to welcome page if there is no token stored in localStorage', () => {
      history.push(PATHS.add);
      createIntegrationTestWrapper(AddItemScreenUnwrapped, {
        history,
        props: { firestore: {} },
      });
      expect(history.location.pathname).toEqual('/');
    });

    it('does not redirect to welcome page if there is a token stored in localStorage', () => {
      history.push(PATHS.add);
      localStorage.setItem('token', 'me is token');
      createIntegrationTestWrapper(AddItemScreenUnwrapped, {
        history,
        props: { firestore: {} },
      });
      expect(history.location.pathname).toEqual(PATHS.add);
    });

    it('does not redirect to welcome page if there is a token stored in localStorage', () => {
      history.push(PATHS.add);
      localStorage.setItem('token', 'me is token');
      createIntegrationTestWrapper(AddItemScreenUnwrapped, {
        history,
        props: { firestore: {} },
      });
      expect(history.location.pathname).toEqual(PATHS.add);
    });
  });

  describe('adding an item', () => {
    const mockToken = 'mock token';
    const set = jest.fn();
    const doc = jest.fn((docId) => ({
      get: jest.fn(() => ({ exists: docId === 'banana' })),
      set,
    }));

    let props;
    const collection = jest.fn(() => ({
      doc,
    }));

    beforeEach(() => {
      localStorage.setItem('token', mockToken);
      props = {
        firestore: {
          collection,
        },
      };
    });

    it('displays an error when trying to add an item that already exists', async () => {
      const {
        getByLabelText,
        getByText,
      } = createIntegrationTestWrapper(AddItemScreenUnwrapped, { props });
      fireEvent.change(getByLabelText('Item Name:'), {
        target: { value: 'Banana!' },
      });
      getByText('Add Item').click();

      await waitFor(() => {
        expect(getByText('Banana! already in shopping list.')).toBeTruthy();
      });
      expect(collection).toHaveBeenCalledTimes(1);
      expect(collection).toHaveBeenCalledWith(mockToken);
      expect(doc).toHaveBeenCalledWith('banana');
    });

    it('does not display an error when trying to add a new item and calls fireStore to add item', async () => {
      const {
        getByLabelText,
        getByText,
      } = createIntegrationTestWrapper(AddItemScreenUnwrapped, { props });
      fireEvent.change(getByLabelText('Item Name:'), {
        target: { value: 'apple' },
      });
      getByText('Add Item').click();

      await waitFor(() => {
        expect(collection).toHaveBeenCalledTimes(2);
        expect(collection).toHaveBeenCalledWith(mockToken);
        expect(doc).toHaveBeenCalledWith('apple');
        expect(set).toHaveBeenCalledWith({
          daysToNextPurchase: 7,
          itemName: 'apple',
          lastPurchaseDate: null,
        });
      });
    });
  });
});
