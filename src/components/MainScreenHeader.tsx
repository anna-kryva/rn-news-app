import React from 'react';
import styled from 'styled-components/native';
import Logo from '../assets/logo-dark-icon.svg';

const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: white;
  border-bottom-width: 2px;
  border-bottom-color: gray;
`;

export const MainScreenHeader: React.FC = () => {
  return (
    <Container>
      <Logo height="100%" />
    </Container>
  );
};
