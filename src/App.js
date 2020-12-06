import React from 'react';
import firebase from './lib/firebase';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingListPage from './pages/shopping-list/ShoppingListPage';
import AddItemPage from './pages/add-item/AddItemPage';
import Welcome from './pages/welcome/Welcome';
import { PATHS } from './utils/constants';
import Page from './components/Page';

function App() {
  return (
    <FirestoreProvider firebase={firebase}>
      <Page>
        <BrowserRouter>
          <Switch>
            <Route path={PATHS.list} component={ShoppingListPage} />
            <Route path={PATHS.add} component={AddItemPage} />
            <Route path="/" component={Welcome} />
          </Switch>
        </BrowserRouter>
      </Page>
    </FirestoreProvider>
  );
}

export default App;
