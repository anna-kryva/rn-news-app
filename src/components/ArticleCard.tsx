import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
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
      <TouchableOpacity onPress={() => onPress(id)}>
        <Cover image={cover} rounded={true}>
          <CoverContent title={title} tags={tags} />
        </Cover>

        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{fontSize: 14, lineHeight: 24, color: '#808080', padding: 10}}>
          {article.shortContent}
        </Text>
      </TouchableOpacity>
    </Container>
  );
};
