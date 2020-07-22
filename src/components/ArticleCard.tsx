import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import {Article} from '../generated/graphql';

import {Cover} from './Cover';
import {TagsList} from './TagsList';

const Container = styled.View`
  width: 100%;
  border-radius: 5px;
  shadow-color: #000;
  shadow-offset: 5px 5px;
  shadow-opacity: 1;
  shadow-radius: 5px;
  elevation: 5;
  background-color: white;
`;

const CoverContent = styled.View`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: white;
  padding: 5px;
`;

const ShortContent = styled.Text`
  font-size: 14px;
  line-height: 24px;
  color: #808080;
  padding: 10px;
`;

interface Props {
  article: Article;
}

export const ArticleCard: React.FC<Props> = ({article}) => {
  return (
    <Container>
      <Cover>
        <CoverContent>
          <TouchableOpacity>
            <Title>{article.title}</Title>
          </TouchableOpacity>

          <TagsList tags={article.tags} />
        </CoverContent>
      </Cover>

      <ShortContent numberOfLines={3} ellipsizeMode="tail">
        {article.shortContent}
      </ShortContent>
    </Container>
  );
};
