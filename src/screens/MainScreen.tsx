import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {FlatList, ListRenderItem} from 'react-native';

import {useArticlesQuery} from '../generated/graphql';
import {ArticleCardType, MainScreenProps} from '../types';

import {ArticleCard} from '../components/ArticleCard';
import {LoadingSpinner} from '../components/LoadingSpinner';
import {EmptyList} from '../components/EmptyList';
import {ErrorComponent} from '../components/ErrorComponent';

const Container = styled.View`
  flex: 1;
`;

export const MainScreen: React.FC<MainScreenProps> = ({navigation}) => {
  const {loading, error, data, refetch} = useArticlesQuery({
    fetchPolicy: 'network-only',
  });

  const pressHandler = useCallback(
    (id: string): void => {
      navigation.navigate('Article', {id});
    },
    [navigation],
  );

  const renderItem = useCallback<ListRenderItem<ArticleCardType>>(
    ({item}) => <ArticleCard article={item} onPress={pressHandler} />,
    [pressHandler],
  );

  if (error) {
    return <ErrorComponent refetch={() => refetch()} />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      {data!.articles.length !== 0 ? (
        <FlatList
          data={data!.articles}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <EmptyList />
      )}
    </Container>
  );
};
