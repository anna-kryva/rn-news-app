import React from 'react';
import {Text, View, FlexAlignType, FlexStyle, TextStyle} from 'react-native';
import {TagsList} from './TagsList';
import {TagType} from '../types';

interface Props {
  title: string;
  tags: TagType[];
  style?: {
    alignItems: FlexAlignType;
    justifyContent: FlexStyle['justifyContent'];
    textAlign: TextStyle['textAlign'];
  };
}

export const CoverContent: React.FC<Props> = ({title, tags, style}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 10,
        ...style,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          color: 'white',
          padding: 5,
          ...style,
        }}>
        {title}
      </Text>
      <TagsList tags={tags} />
    </View>
  );
};
