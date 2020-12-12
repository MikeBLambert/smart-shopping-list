import React from 'react';
import styled from 'styled-components';

const StyledErrorMessage = styled.p`
  color: red;
`;

const ErrorMessage = ({ children }) => {
  return <StyledErrorMessage>{children}</StyledErrorMessage>;
};

export default ErrorMessage;
