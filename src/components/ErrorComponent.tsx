import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ErrorText = styled.Text`
  font-size: 20px;
  color: gray;
  text-align: center;
  padding: 10px;
`;

const RefreshButton = styled.TouchableOpacity`
  width: 50%;
  aspect-ratio: 1;
  margin: 20px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

interface Props {
  refetch: () => void;
}

export const ErrorComponent: React.FC<Props> = ({refetch}) => {
  return (
    <Container>
      <ErrorText>Oops, something went wrong... Please, try again</ErrorText>
      <RefreshButton onPress={refetch}>
        <Image source={require('../assets/refresh.png')} resizeMode="contain" />
      </RefreshButton>
    </Container>
  );
};
