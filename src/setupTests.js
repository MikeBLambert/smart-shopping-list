import React from 'react';

jest.mock('react-firestore', () => ({
  ...jest.requireActual('react-firestore'),
  FirestoreCollection: ({ render }) => render({ data: [], isLoading: false }),
  withFirestore: (Component) => (props) => (
    <Component
      firestore={{ collection: () => ({ add: () => Promise.resolve() }) }}
      {...props}
    />
  ),
}));
