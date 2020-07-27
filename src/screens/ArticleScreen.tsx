import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {useNavigation} from '@react-navigation/native';

import {useArticleQuery, useArticleContentQuery} from '../generated/graphql';
import {ArticleScreenProps} from '../types';

import {Cover} from '../components/Cover';
import {ErrorComponent} from '../components/ErrorComponent';
import {CoverContent} from '../components/CoverContent';
import {LoadingSpinner} from '../components/LoadingSpinner';

export const ArticleScreen: React.FC<ArticleScreenProps> = ({route}) => {
  const {setOptions} = useNavigation();
  const {id} = route.params;
  const {
    data: cachedData,
    loading: cachedLoading,
    error: cachedError,
  } = useArticleQuery({variables: {id}});

  const {
    data: fetchedData,
    loading: fetchedLoading,
    error: fetchedError,
    refetch,
  } = useArticleContentQuery({
    variables: {id},
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    setOptions({headerTitle: cachedData?.article?.title});
  }, [cachedData?.article?.title, setOptions]);

  if (cachedError || fetchedError) {
    return <ErrorComponent refetch={() => refetch()} />;
  }

  if (cachedLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{flex: 1}}>
        <Cover image={cachedData!.article!.cover}>
          <CoverContent
            id={id}
            title={cachedData!.article!.title}
            tags={cachedData!.article!.tags}
            disabled={true}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          />
        </Cover>
        {fetchedLoading ? (
          <LoadingSpinner />
        ) : (
          <View style={{padding: 10}}>
            <Markdown>{fetchedData!.article!.content}</Markdown>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
