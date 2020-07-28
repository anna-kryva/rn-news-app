import React from 'react';
import {View, Text} from 'react-native';
import {TagType} from '../types';

const getColor = (name: string): string => {
  switch (name.toLowerCase()) {
    case 'tech':
      return 'gray';
    case 'product strategy':
      return '#bf62d1';
    case 'case study':
      return '#ff722e';
    default:
      return 'gray';
  }
};

interface Props {
  tags: TagType[];
}

// TODO: Extract Text styles using styled-components.
// By the way, you can still call getColor inside styled-components (https://styled-components.com/docs/basics#adapting-based-on-props)
export const TagsList: React.FC<Props> = ({tags}) => {
  const tagList = tags.map((tag) => (
    <Text
      key={tag.id}
      style={{
        backgroundColor: getColor(tag.name),
        color: '#fff',
        borderRadius: 2,
        fontWeight: 'bold',
        fontSize: 12,
        padding: 5,
        margin: 5,
      }}>
      {tag.name.toUpperCase()}
    </Text>
  ));

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>{tagList}</View>
  );
};
