import React from 'react';
import MockDate from 'mockdate';
import '@testing-library/jest-dom';

MockDate.set('12/08/1983');

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
