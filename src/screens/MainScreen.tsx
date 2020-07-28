import React, {useCallback} from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {useArticlesQuery} from '../generated/graphql';
import {ArticleType, RootStackParamList} from '../types';

import {ArticleCard} from '../components/ArticleCard';
import {LoadingSpinner} from '../components/LoadingSpinner';
import {EmptyList} from '../components/EmptyList';
import {ErrorComponent} from '../components/ErrorComponent';

type MainScreenProps = StackScreenProps<RootStackParamList, 'Main'>;

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

  const renderItem = useCallback<ListRenderItem<ArticleType>>(
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
    <View style={{flex: 1}}>
      {data!.articles.length !== 0 ? (
        <FlatList
          data={data!.articles}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <EmptyList />
      )}
    </View>
  );
};
