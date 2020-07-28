import React, {ReactNode} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import ImageShadow from './ImageShadow';
import {ArticleCoverType} from '../types';
import {
  ASPECT_RATIO,
  BORDER_RADIUS_BIG,
  BORDER_RADIUS_SMALL,
} from '../constants';

interface Props {
  image?: ArticleCoverType;
  children?: ReactNode;
  rounded: boolean;
}

export const Cover: React.FC<Props> = ({image, children, rounded}) => {
  return (
    <View
      style={{
        aspectRatio: ASPECT_RATIO,
        borderRadius: rounded ? BORDER_RADIUS_BIG : 0,
      }}>
      <Image
        style={{width: '100%', height: '100%'}}
        borderRadius={rounded ? BORDER_RADIUS_SMALL : 0}
        defaultSource={require('../assets/placeholder.jpg')}
        source={image ? {uri: image.url} : require('../assets/default.png')}
        resizeMode="cover"
      />
      <View style={StyleSheet.absoluteFill}>
        <ImageShadow rounded={rounded} />
      </View>
      <View style={StyleSheet.absoluteFill}>{children}</View>
    </View>
  );
};
