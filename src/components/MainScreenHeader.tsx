import React from 'react';
import styled from 'styled-components/native';
import {SvgIcon} from './SvgIcon';

const Container = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
`;

export const MainScreenHeader: React.FC = () => {
  return (
    <Container>
      <SvgIcon />
    </Container>
  );
};
