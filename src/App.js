import React from 'react';
import firebase from './lib/firebase';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingListScreen from './screens/shopping-list/ShoppingListScreen';
import AddItemScreen from './screens/add-item/AddItemScreen';
import WelcomeScreen from './screens/welcome/WelcomeScreen';
import { PATHS } from './utils/constants';

function App() {
  return (
    <FirestoreProvider firebase={firebase}>
      <BrowserRouter>
        <Switch>
          <Route path={PATHS.list} component={ShoppingListScreen} />
          <Route path={PATHS.add} component={AddItemScreen} />
          <Route path="/" component={WelcomeScreen} />
        </Switch>
      </BrowserRouter>
    </FirestoreProvider>
  );
}

export default App;
