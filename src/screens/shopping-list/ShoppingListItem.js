import React from 'react';
import { string } from 'prop-types';
import { withFirestore } from 'react-firestore';
import styled from 'styled-components';
import { useToken } from '../../utils/hooks';
import dayjs from 'dayjs';

const StyledContainer = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const StyledButton = styled.button``;

const ShoppingListItem = ({ firestore, itemName, id, lastPurchaseDate }) => {
  const token = useToken();
  const onCheckboxChange = ({ target: { checked } }) => {
    firestore
      .collection(token)
      .doc(id)
      .update({ lastPurchaseDate: checked ? Date.now() : null });
  };

  const hoursSincePurchase = dayjs(lastPurchaseDate).diff(dayjs(), 'hours');

  const isChecked = !lastPurchaseDate ? false : hoursSincePurchase < 24;

  return (
    <StyledContainer>
      <input
        type="checkbox"
        id="item"
        checked={isChecked}
        onChange={onCheckboxChange}
      />
      <label htmlFor="item">{itemName}</label>
      <StyledButton>details</StyledButton>
      <StyledButton>delete</StyledButton>
    </StyledContainer>
  );
};

ShoppingListItem.propTypes = {
  itemName: string,
};

export const ShoppingListItemUnwrapped = ShoppingListItem;

export default withFirestore(ShoppingListItem);
