import React, {ReactNode} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import ImageShadow from './ImageShadow';
import {ArticleCoverType, LikeType} from '../types';
import {
  ASPECT_RATIO,
  BORDER_RADIUS_BIG,
  BORDER_RADIUS_SMALL,
} from '../constants';
import Like from './Like';

interface Props {
  id: string;
  image?: ArticleCoverType;
  likes?: LikeType[];
  children?: ReactNode;
  rounded: boolean;
}

const Cover: React.FC<Props> = ({id, image, likes, children, rounded}) => {
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

      {likes ? (
        <View style={StyleSheet.absoluteFill}>
          <Like articleId={id} likes={likes} />
        </View>
      ) : null}

      <View style={StyleSheet.absoluteFill}>{children}</View>
    </View>
  );
};

export default Cover;
