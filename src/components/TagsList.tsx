import React from 'react';
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

interface Props {
  tags: TagType[];
}

interface StyledTag {
  name: string;
}

const TagView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledTag = styled.Text<StyledTag>`
  background-color: ${(props) => getColor(props.name)};
  color: #fff;
  border-radius: 2px;
  font-weight: bold;
  font-size: 12px;
  padding: 5px;
  margin: 5px;
`;

export const TagsList: React.FC<Props> = ({tags}) => {
  const tagList = tags.map((tag) => (
    <StyledTag key={tag.id} name={tag.name}>
      {tag.name.toUpperCase()}
    </StyledTag>
  ));

  return <TagView>{tagList}</TagView>;
};
