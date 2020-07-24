import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const NoResultsText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: gray;
  padding: 5px;
`;

const ImageContainer = styled.View`
  margin: 10px;
  width: 50%;
  aspect-ratio: 1;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

export const EmptyList: React.FC = () => {
  return (
    <Container>
      <NoResultsText>
        Our content manager is working on new articles. Stay in touch!
      </NoResultsText>
      <ImageContainer>
        <Image
          source={require('../assets/empty-list.png')}
          resizeMode="contain"
        />
      </ImageContainer>
    </Container>
  );
};
