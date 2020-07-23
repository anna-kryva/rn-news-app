import React from 'react';
import styled from 'styled-components/native';
import {FlatList, ListRenderItem} from 'react-native';

import {Article} from '../generated/graphql';
import {ArticleCard} from '../components/ArticleCard';

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

export const MainScreen: React.FC<Props> = () => {
  const renderItem: ListRenderItem<Article> = ({item}) => (
    <ArticleCard article={item} />
  );

  return (
    <Container>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};
