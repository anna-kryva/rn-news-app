import React from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import Markdown from 'react-native-markdown-display';

import {Article} from '../generated/graphql';

import {Cover} from '../components/Cover';
import {TagsList} from '../components/TagsList';

const Container = styled.View`
  flex: 1;
`;

const CoverContent = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: white;
  padding: 5px;
  text-align: center;
`;

interface Props {
  article: Article;
}

export const ArticleScreen: React.FC<Props> = ({article}) => {
  return (
    <Container>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{height: '100%'}}>
        <Cover>
          <CoverContent>
            <Title>{article.title}</Title>
            <TagsList tags={article.tags} />
          </CoverContent>
        </Cover>

        <Markdown>{article.content}</Markdown>
      </ScrollView>
    </Container>
  );
};
