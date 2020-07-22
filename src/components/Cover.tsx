import React from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {ImageShadow} from './ImageShadow';

const getHeight = (padding: number): number => {
  const calculatedHeight =
    ((Dimensions.get('window').width - 2 * padding) * 9) / 16;
  return Math.floor(calculatedHeight);
};

const ImageContainer = styled.View`
  width: 100%;
  height: ${getHeight(10)}px;
  border-radius: 5px;
  shadow-color: #000;
  shadow-offset: 5px 5px;
  shadow-opacity: 1;
  shadow-radius: 5px;
  elevation: 5;
`;

const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

interface Props {
  imageURL?: string;
  children?: React.ReactChild;
}

export const Cover: React.FC<Props> = ({imageURL, children}) => {
  return (
    <ImageContainer>
      <ImageBackground
        defaultSource={require('../assets/placeholder.jpg')}
        source={imageURL ? {uri: imageURL} : require('../assets/default.png')}
        resizeMode="cover">
        <ImageShadow>{children}</ImageShadow>
      </ImageBackground>
    </ImageContainer>
  );
};
