import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

export const createIntegrationTestWrapper = (
  Component,
  { history = createMemoryHistory(), props } = {},
) => {
  return render(
    <Router history={history}>
      <Component {...props} />
    </Router>,
  );
};

const update = jest.fn();
const doc = jest.fn(() => ({ update }));
const collection = jest.fn(() => ({ doc }));
const firestore = { collection };

export const mockFirebase = { firestore, collection, doc, update };
