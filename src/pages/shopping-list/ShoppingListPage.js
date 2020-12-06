import React from 'react';
import NavPage from '../../components/NavPage';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import { useToken } from '../../utils/hooks';
import ShoppingList from './ShoppingList';

const ShoppingListPage = () => {
  const token = useToken();
  return (
    <NavPage>
      <h1>Smart Shopping List</h1>
      <FirestoreCollection path={token} render={ShoppingList} />
    </NavPage>
  );
};

ShoppingListPage.propTypes = {};

export default withFirestore(ShoppingListPage);
