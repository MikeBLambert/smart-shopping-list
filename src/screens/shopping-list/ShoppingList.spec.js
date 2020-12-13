import { fireEvent, waitFor } from '@testing-library/react';
import { createIntegrationTestWrapper } from '../../utils/testUtils';
import ShoppingList from './ShoppingList';

describe('<ShoppingList />', () => {
  let props;
  beforeEach(() => {
    props = {
      history: {
        push: jest.fn(),
      },
      isLoading: false,
      data: [
        { itemName: 'apple', id: 'apple' },
        { itemName: 'banana', id: 'banana' },
      ],
    };
  });
  describe('filtering', () => {
    it('filters out only items that include the text in the filter text', async () => {
      const { getByLabelText, queryByText } = createIntegrationTestWrapper(
        ShoppingList,
        {
          props,
        },
      );
      fireEvent.change(getByLabelText('Filter Items'), {
        target: { value: 'pp' },
      });
      expect(queryByText('apple')).toBeInTheDocument();
      expect(queryByText('banana')).toBeFalsy();
    });
  });
});
