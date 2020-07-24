import React from 'react';
import styled from 'styled-components/native';
import {ImageShadow} from './ImageShadow';
import {CoverImage} from '../types';

const ImageContainer = styled.View`
  width: 100%;
  aspect-ratio: ${16 / 9};
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
  border-radius: 5px;
`;

interface Props {
  image?: CoverImage;
  children?: React.ReactChild;
}

export const Cover: React.FC<Props> = ({image, children}) => {
  return (
    <ImageContainer>
      <ImageBackground
        borderRadius={5}
        defaultSource={require('../assets/placeholder.jpg')}
        source={image ? {uri: image.url} : require('../assets/default.png')}
        resizeMode="cover">
        <ImageShadow>{children}</ImageShadow>
      </ImageBackground>
    </ImageContainer>
  );
};
