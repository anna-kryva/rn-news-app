import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
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

type StyledTag = {
  name: string;
};

const StyledTag = styled.Text<StyledTag>`
  background-color: ${(props) => getColor(props.name)};
  color: #fff;
  border-radius: 2px;
  font-weight: bold;
  font-size: 12px;
  padding: 5px;
`;

interface Props {
  tags: TagType[];
}

const TagsList: React.FC<Props> = ({tags}) => {
  const tagList = tags.map((tag) => (
    <StyledTag key={tag.id} name={tag.name} style={{margin: 5}}>
      {tag.name.toUpperCase()}
    </StyledTag>
  ));

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>{tagList}</View>
  );
};

export default TagsList;
