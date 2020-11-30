import React from 'react';
import firebase from './lib/firebase';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route } from 'react-router-dom';
import ShoppingList from './pages/ShoppingList';
import AddItem from './pages/AddItem';

function App() {
  return (
    <FirestoreProvider firebase={firebase}>
      <div className="App">
        <BrowserRouter>
          <Route path="/list" component={ShoppingList} />
          <Route path="/add" component={AddItem} />
          <Nav />
        </BrowserRouter>
      </div>
    </FirestoreProvider>
  );
}

export default App;
