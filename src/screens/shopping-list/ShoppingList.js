import React from 'react';
import ShoppingListItem from './ShoppingListItem';

const ShoppingList = ({ data, isLoading }) => {
  return isLoading ? <p>Loading</p> : <ul>{data.map(ShoppingListItem)}</ul>;
};

ShoppingList.propTypes = {};

export default ShoppingList;
