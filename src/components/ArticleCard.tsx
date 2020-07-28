import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import {ArticleCardType} from '../types';

import {Cover} from './Cover';
import {CoverContent} from './CoverContent';
import {BORDER_RADIUS_SMALL} from '../constants';

const Container = styled.View`
  border-radius: ${BORDER_RADIUS_SMALL}px;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 1;
  shadow-radius: 5px;
  elevation: 5;
  background-color: white;
`;

const Title = styled.Text`
  font-size: 14px;
  line-height: 24px;
  color: #808080;
  padding: 10px;
`;

interface Props {
  article: ArticleCardType;
  onPress: (id: string) => void;
}

export const ArticleCard: React.FC<Props> = ({article, onPress}) => {
  const {cover, id, title, tags} = article;

  const pressHandler = useCallback(() => onPress(id), [id, onPress]);

  return (
    <Container style={{margin: 10}}>
      <TouchableOpacity onPress={pressHandler}>
        <Cover image={cover} rounded={true}>
          <CoverContent title={title} tags={tags} />
        </Cover>

        <Title numberOfLines={3} ellipsizeMode="tail">
          {article.shortContent}
        </Title>
      </TouchableOpacity>
    </Container>
  );
};
