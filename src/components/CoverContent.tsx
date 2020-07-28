import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {TagsList} from './TagsList';
import {TagType} from '../types';

interface Props {
  title: string;
  tags: TagType[];
  style?: StyleProp<ViewStyle>;
}

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: white;
  padding: 5px;
`;

export const CoverContent: React.FC<Props> = ({title, tags, style}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          padding: 10,
        },
        style,
      ]}>
      <Title style={style}>{title}</Title>
      <TagsList tags={tags} />
    </View>
  );
};
