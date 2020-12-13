import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import ShoppingListItem from './ShoppingListItem';

const ShoppingList = ({ data, history, isLoading }) => {
  const [filterText, setFilterText] = useState('');
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
    <Fragment>
      <label htmlFor="filterItems">Filter Items</label>
      <div>
        <input
          value={filterText}
          placeholder="Start typing here..."
          id="filterItems"
          onChange={({ target: { value } }) => setFilterText(value)}
        />
        <button onClick={() => setFilterText('')} aria-label="clear">
          X
        </button>
      </div>
      <ul>
        {data
          .filter(({ itemName }) => itemName.includes(filterText))
          .map(({ id, ...rest }) => (
            <ShoppingListItem key={id} {...rest} />
          ))}
      </ul>
    </Fragment>
  );
};

ShoppingList.propTypes = {};

export default withRouter(ShoppingList);
