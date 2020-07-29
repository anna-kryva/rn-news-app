import React from 'react';
import {View, StyleProp, ViewStyle, TextStyle} from 'react-native';
import styled from 'styled-components/native';
import TagsList from './TagsList';
import {TagType} from '../types';

interface Props {
  title: string;
  tags: TagType[];
  style?: {
    view: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
  };
}

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: white;
  padding: 5px;
`;

const CoverContent: React.FC<Props> = ({title, tags, style}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          padding: 10,
        },
        style?.view,
      ]}>
      <Title style={style?.text}>{title}</Title>
      <TagsList tags={tags} />
    </View>
  );
};

export default CoverContent;
