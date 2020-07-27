import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  FlexAlignType,
  FlexStyle,
  TextStyle,
} from 'react-native';
import {TagsList} from './TagsList';
import {TagType} from '../types';

interface Props {
  id: string;
  title: string;
  tags: TagType[];
  onPress?: (id: string) => void;
  disabled?: boolean;
  style?: {
    alignItems: FlexAlignType;
    justifyContent: FlexStyle['justifyContent'];
    textAlign: TextStyle['textAlign'];
  };
}

export const CoverContent: React.FC<Props> = ({
  id,
  title,
  tags,
  onPress,
  disabled,
  style,
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 10,
        ...style,
      }}>
      <TouchableOpacity
        disabled={disabled ?? false}
        onPress={() => {
          onPress ? onPress(id) : undefined;
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
      </TouchableOpacity>
      <TagsList tags={tags} />
    </View>
  );
};
