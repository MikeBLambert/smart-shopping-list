import React from 'react';
import styled from 'styled-components';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Page = ({ children }) => <StyledPage>{children}</StyledPage>;

export default Page;
