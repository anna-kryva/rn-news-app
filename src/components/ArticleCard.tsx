import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

import {ArticleCardType} from '../types';

import {Cover} from './Cover';
import {CoverContent} from './CoverContent';

const Container = styled.View`
  border-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 1;
  shadow-radius: 5px;
  elevation: 5;
  background-color: white;
  margin: 10px;
`;

interface Props {
  article: ArticleCardType;
  onPress: (id: string) => void;
}

export const ArticleCard: React.FC<Props> = ({article, onPress}) => {
  const {cover, id, title, tags} = article;

  return (
    <Container>
      <Cover image={cover}>
        <CoverContent id={id} title={title} tags={tags} onPress={onPress} />
      </Cover>

      <Text
        numberOfLines={3}
        ellipsizeMode="tail"
        style={{fontSize: 14, lineHeight: 24, color: '#808080', padding: 10}}>
        {article.shortContent}
      </Text>
    </Container>
  );
};
