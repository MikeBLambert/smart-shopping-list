import React from 'react';
import { render } from '@testing-library/react';
import { ShoppingListItemUnwrapped } from './ShoppingListItem';
import {
  createIntegrationTestWrapper,
  mockFirebase,
} from '../../utils/testUtils';
import dayjs from 'dayjs';

describe('<ShoppingListItem />', () => {
  let props;
  let itemName;
  beforeEach(() => {
    jest.clearAllMocks();
    itemName = 'banana';
    props = {
      firestore: mockFirebase.firestore,
      lastPurchaseDate: null,
      itemName,
      id: itemName,
    };
  });
  describe('marking an item as purchased', () => {
    it('is unchecked when the lastPurchaseDate is over 24 hours ago', () => {
      const { getByLabelText } = createIntegrationTestWrapper(
        ShoppingListItemUnwrapped,
        {
          props: {
            ...props,
            lastPurchaseDate: dayjs().add(25, 'hours').valueOf(),
          },
        },
      );
      expect(getByLabelText(itemName).checked).toBe(false);
    });

    it('is checked when the lastPurchaseDate is less than 24 hours ago', () => {
      const { getByLabelText } = createIntegrationTestWrapper(
        ShoppingListItemUnwrapped,
        {
          props: {
            ...props,
            lastPurchaseDate: dayjs().add(23, 'hours').valueOf(),
          },
        },
      );
      expect(getByLabelText(itemName).checked).toBe(true);
    });

    it('when a user checks item that is not currently checked, the lastPurchase date is set to now', () => {
      const {
        getByLabelText,
      } = createIntegrationTestWrapper(ShoppingListItemUnwrapped, { props });
      getByLabelText(itemName).click();
      expect(mockFirebase.update).toHaveBeenCalledWith({
        lastPurchaseDate: Date.now(),
      });
    });

    it('when a user checks item that is currently checked, the lastPurchase date is set to null', () => {
      const { getByLabelText } = createIntegrationTestWrapper(
        ShoppingListItemUnwrapped,
        {
          props: {
            ...props,
            lastPurchaseDate: dayjs().add(23, 'hours').valueOf(),
          },
        },
      );
      getByLabelText(itemName).click();
      expect(mockFirebase.update).toHaveBeenCalledWith({
        lastPurchaseDate: null,
      });
    });
  });
});
