import React from 'react';
import styled from 'styled-components/native';
import {Tag} from '../generated/graphql';

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
  tags: Tag[];
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
  color: '#fff';
  border-radius: 2;
  font-weight: bold;
  font-size: 20;
  padding: 5;
`;

export const TagsList: React.FC<Props> = (...tags) => {
  const tagList = tags.map((tag) => (
    <StyledTag name={tag.name}>{tag.name.toUpperCase()}</StyledTag>
  ));

  return <TagView>{tagList}</TagView>;
};
