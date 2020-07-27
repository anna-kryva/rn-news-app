import React, {ReactNode} from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import {ImageShadow} from './ImageShadow';
import {CoverImage} from '../types';

const ImageContainer = styled.View`
  width: 100%;
  aspect-ratio: ${16 / 9};
  border-radius: 10px;
  shadow-color: #000;
  shadow-offset: 5px 5px;
  shadow-opacity: 1;
  shadow-radius: 5px;
  elevation: 5;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

interface Props {
  image?: CoverImage;
  children?: ReactNode;
}

export const Cover: React.FC<Props> = ({image, children}) => {
  return (
    <ImageContainer>
      <Image
        style={{flex: 1}}
        borderRadius={5}
        defaultSource={require('../assets/placeholder.jpg')}
        source={image ? {uri: image.url} : require('../assets/default.png')}
        resizeMode="cover"
      />
      <Wrapper>
        <ImageShadow />
      </Wrapper>
      <Wrapper>{children}</Wrapper>
    </ImageContainer>
  );
};
