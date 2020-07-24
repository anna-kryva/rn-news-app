import React from 'react';
import styled from 'styled-components/native';

const Spinner = styled.ActivityIndicator`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LoadingSpinner: React.FC = () => {
  return <Spinner color="#0a88f2" size="large" />;
};
