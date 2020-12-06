import React from 'react';
import styled from 'styled-components';
import ShoppingListItem from './ShoppingListItem';

const List = styled.ul`
  width: 100%;
`;

const ShoppingList = ({ data, isLoading }) => {
  return isLoading ? <p>Loading</p> : <List>{data.map(ShoppingListItem)}</List>;
};

ShoppingList.propTypes = {};

export default ShoppingList;
