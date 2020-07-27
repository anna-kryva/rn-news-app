import React, {ReactNode} from 'react';
import {View, Image} from 'react-native';
import styled from 'styled-components/native';
import {ImageShadow} from './ImageShadow';
import {CoverImage} from '../types';

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
  rounded: boolean;
}

export const Cover: React.FC<Props> = ({image, children, rounded}) => {
  return (
    <View style={{aspectRatio: 16 / 9, borderRadius: rounded ? 10 : 0}}>
      <Image
        style={{flex: 1}}
        borderRadius={rounded ? 5 : 0}
        defaultSource={require('../assets/placeholder.jpg')}
        source={image ? {uri: image.url} : require('../assets/default.png')}
        resizeMode="cover"
      />
      <Wrapper>
        <ImageShadow rounded={rounded} />
      </Wrapper>
      <Wrapper>{children}</Wrapper>
    </View>
  );
};
