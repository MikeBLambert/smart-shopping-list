import React from 'react';
import firebase from './lib/firebase';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingList from './pages/shopping-list/ShoppingList';
import AddItem from './pages/add-item/AddItem';
import Welcome from './pages/welcome/Welcome';
import { PATHS } from './utils/constants';

function App() {
  return (
    <FirestoreProvider firebase={firebase}>
      <div className="page">
        <BrowserRouter>
          <Switch>
            <Route path={PATHS.list} component={ShoppingList} />
            <Route path={PATHS.add} component={AddItem} />
            <Route path="/" component={Welcome} />
          </Switch>
        </BrowserRouter>
      </div>
    </FirestoreProvider>
  );
}

export default App;
