import React, {useCallback} from 'react';
import {
  FlatList,
  ListRenderItem,
  View,
  FlatListProps,
  RefreshControl,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {useArticlesQuery} from '../generated/graphql';
import {ArticleType, RootStackParamList} from '../types';

import ArticleCard from '../components/ArticleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyList from '../components/EmptyList';
import ErrorComponent from '../components/ErrorComponent';

type MainScreenProps = StackScreenProps<RootStackParamList, 'Main'>;

const MainScreen: React.FC<MainScreenProps> = ({navigation}) => {
  const {loading, error, data, refetch} = useArticlesQuery({
    fetchPolicy: 'cache-and-network',
  });

  const pressHandler = useCallback<(id: string) => void>(
    (id) => {
      navigation.navigate('Article', {id});
    },
    [navigation],
  );

  const renderItem = useCallback<ListRenderItem<ArticleType>>(
    ({item}) => <ArticleCard article={item} onPress={pressHandler} />,
    [pressHandler],
  );

  const keyExtractorHandler = useCallback<
    NonNullable<FlatListProps<ArticleType>['keyExtractor']>
  >((item) => item.id, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [refetch]);

  if (error) {
    return <ErrorComponent refetch={refetch} />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data!.articles}
        renderItem={renderItem}
        keyExtractor={keyExtractorHandler}
        ListEmptyComponent={<EmptyList />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default MainScreen;
