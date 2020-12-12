import React, { Fragment, useState } from 'react';
import { shape, func } from 'prop-types';
import { withFirestore } from 'react-firestore';
import NavPage from '../../components/NavPage';
import { useToken } from '../../utils/hooks';
import ErrorMessage from '../../components/ErrorMessage';

const RADIOS = {
  Soon: 7,
  'Kind of Soon': 14,
  'Not Soon': 30,
};

const AddItemScreen = ({ firestore }) => {
  const token = useToken();

  const [itemName, setItemName] = useState('');
  const [error, setError] = useState('');
  const [daysToNextPurchase, setDaysToNextPurchase] = useState(RADIOS.Soon);

  const handleItemNameChange = ({ target: { value } }) => {
    setItemName(value);
  };
  const handleRadioChange = ({ target: { value } }) => {
    setDaysToNextPurchase(parseInt(value));
  };

  const convertToDocId = (docName = '') =>
    docName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docId = convertToDocId(itemName);
    const existingDoc = await firestore.collection(token).doc(docId).get();

    if (existingDoc.exists) {
      setError(`${itemName} already in shopping list.`);
    } else {
      setError('');
      firestore.collection(token).doc(docId).set({
        itemName,
        lastPurchaseDate: null,
        daysToNextPurchase,
      });
    }
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
        <button type="submit" disabled={!itemName}>
          Add Item
        </button>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </NavPage>
  );
};

AddItemScreen.propTypes = {
  firestore: shape({ collection: func }).isRequired,
};

export const AddItemScreenUnwrapped = AddItemScreen;

export default withFirestore(AddItemScreen);
