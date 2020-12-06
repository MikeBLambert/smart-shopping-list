import React, { Fragment, useState } from 'react';
import { shape, func } from 'prop-types';
import { withFirestore } from 'react-firestore';
import NavPage from '../../components/NavPage';
import { useToken } from '../../utils/hooks';

const RADIOS = {
  Soon: 7,
  'Kind of Soon': 14,
  'Not Soon': 30,
};

const AddItemPage = ({ firestore }) => {
  const token = useToken();

  const [itemName, setItemName] = useState('');
  const [daysToNextPurchase, setDaysToNextPurchase] = useState(RADIOS.Soon);

  const handleItemNameChange = ({ target: { value } }) => {
    setItemName(value);
  };
  const handleRadioChange = ({ target: { value } }) => {
    setDaysToNextPurchase(parseInt(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) return;
    firestore
      .collection(token)
      .add({
        userToken: token,
        lastPurchaseDate: null,
        itemName,
        daysToNextPurchase,
      })
      .then((response) => console.log({ response }))
      .catch((error) => console.log({ error }));
  };
  return (
    <NavPage>
      <h1>Smart Shopping List</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Item Name:</label>
        <input
          id="name"
          name="name"
          value={itemName}
          onChange={handleItemNameChange}
        />
        <fieldset>
          <legend>How soon will you buy this again?</legend>
          {Object.entries(RADIOS).map(([key, value]) => (
            <Fragment key={key}>
              <label htmlFor={key}>{key}</label>
              <input
                checked={daysToNextPurchase === value}
                onChange={handleRadioChange}
                type="radio"
                name="daysToNextPurchase"
                value={value}
                id={key}
              />
            </Fragment>
          ))}
        </fieldset>
        <button type="submit">Add Item</button>
      </form>
    </NavPage>
  );
};

AddItemPage.propTypes = {
  firestore: shape({ collection: func }).isRequired,
};

export default withFirestore(AddItemPage);
