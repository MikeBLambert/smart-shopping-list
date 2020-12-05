import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

export const createIntegrationTestWrapper = (
  Component,
  { history = createMemoryHistory(), props } = {},
) =>
  render(
    <Router history={history}>
      <Component {...props} />
    </Router>,
  );
