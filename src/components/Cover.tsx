import React, {ReactNode} from 'react';
import {View, Image} from 'react-native';
import styled from 'styled-components/native';
import {ImageShadow} from './ImageShadow';
import {CoverImage} from '../types';

// TODO: Should be replaced with just a <View style={StyleSheet.absoluteFill} />
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
// TODO: It'll work exactly the same, but it's more logical to wrap Image and ImageShadow with absoluteFills and let children be positioned in a regular way.
// TODO: It's a good idea to extract 16 / 9 and 10 (maybe 5 as well) as constants shared across all components.
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
