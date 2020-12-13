import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const StyledButton = styled.button``;

const ShoppingListItem = ({ itemName }, index) => {
  return (
    <StyledContainer key={`${itemName}_${index}`}>
      <input type="checkbox" id="item" />
      <label htmlFor="item">{itemName}</label>
      <StyledButton>details</StyledButton>
      <StyledButton>delete</StyledButton>
    </StyledContainer>
  );
};

ShoppingListItem.propTypes = {};

export default ShoppingListItem;
