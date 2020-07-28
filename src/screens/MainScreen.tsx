import React, {useCallback} from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';

import {useArticlesQuery} from '../generated/graphql';
import {ArticleCardType, MainScreenProps} from '../types';

import {ArticleCard} from '../components/ArticleCard';
import {LoadingSpinner} from '../components/LoadingSpinner';
import {EmptyList} from '../components/EmptyList';
import {ErrorComponent} from '../components/ErrorComponent';

export const MainScreen: React.FC<MainScreenProps> = ({navigation}) => {
  const {loading, error, data, refetch} = useArticlesQuery({
// TODO: Maybe we can use 'cache-and-network' here? It should make UX better.
    fetchPolicy: 'network-only',
  });

// TODO: It's better to move arrow function types higher to useCallback<...>. The higher types are places, the better.
// Exactly as you did in renderItem below but this time the function type should be written manually.
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
// TODO: Pattern "(a, b, c) => f(a, b, c)"" can be simplified to just "f".
    return <ErrorComponent refetch={() => refetch()} />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={{flex: 1}}>
      {data!.articles.length !== 0 ? (
        <FlatList
          data={data!.articles}
          renderItem={renderItem}
// TODO: It isn't critical, but it would be better to move keyExtractor arrow function using useCallback hook.
          keyExtractor={(item) => item.id}
        />
      ) : (
// TODO: Use ListEmptyComponent instead https://reactnative.dev/docs/flatlist#listemptycomponent
        <EmptyList />
      )}
    </View>
  );
};
