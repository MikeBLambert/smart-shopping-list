import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import ShoppingListItem from './ShoppingListItem';

const ShoppingList = ({ data, history, isLoading }) => {
  if (isLoading) return <p>Loading</p>;

  if (!data.length) {
    return (
      <Fragment>
        <p>Your shopping list is currently empty.</p>
        <button onClick={() => history.push(PATHS.add)}>Add Item</button>
      </Fragment>
    );
  }
  return (
    <ul>
      {data.map(({ id, ...rest }) => (
        <ShoppingListItem key={id} {...rest} />
      ))}
    </ul>
  );
};

ShoppingList.propTypes = {};

export default withRouter(ShoppingList);
