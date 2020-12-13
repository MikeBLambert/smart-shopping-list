import React, { Fragment } from 'react';
import NavPage from '../../components/NavPage';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import { useToken } from '../../utils/hooks';
import ShoppingList from './ShoppingList';

const ShoppingListScreen = () => {
  const token = useToken();
  if (!token) return <Fragment />;
  return (
    <NavPage>
      <h1>Smart Shopping List</h1>
      <FirestoreCollection
        path={token}
        render={(props) => <ShoppingList {...props} />}
      />
    </NavPage>
  );
};

ShoppingListScreen.propTypes = {};

export default withFirestore(ShoppingListScreen);
