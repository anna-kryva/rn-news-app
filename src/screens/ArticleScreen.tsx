import React, {useEffect} from 'react';
import {Animated, View} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

import {useArticleQuery, useArticleContentQuery} from '../generated/graphql';
import {RootStackParamList} from '../types';

import {Cover} from '../components/Cover';
import {ErrorComponent} from '../components/ErrorComponent';
import {CoverContent} from '../components/CoverContent';
import {LoadingSpinner} from '../components/LoadingSpinner';

type ArticleScreenProps = StackScreenProps<RootStackParamList, 'Article'>;

export const ArticleScreen: React.FC<ArticleScreenProps> = ({route}) => {
  const {setOptions} = useNavigation();
  const {id} = route.params;
  const {
    data: cachedData,
    loading: cachedLoading,
    error: cachedError,
  } = useArticleQuery({variables: {id}, fetchPolicy: 'cache-only'});

  const {
    data: fetchedData,
    loading: fetchedLoading,
    error: fetchedError,
    refetch,
  } = useArticleContentQuery({
    variables: {id},
    fetchPolicy: 'cache-first',
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

  const scrollY = new Animated.Value(0);
  const headerTranslate = Animated.divide(scrollY, -2);

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transform: [{translateY: headerTranslate}],
        }}>
        <Cover image={cachedData!.article!.cover} rounded={false}>
          <CoverContent
            title={cachedData!.article!.title}
            tags={cachedData!.article!.tags}
            style={{
              view: {
                alignItems: 'center',
                justifyContent: 'center',
              },
              text: {textAlign: 'center'},
            }}
          />
        </Cover>
      </Animated.View>
      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}>
        <View style={{width: '100%', aspectRatio: 16 / 9}} />
        {fetchedLoading ? (
          <LoadingSpinner />
        ) : (
          <View style={{padding: 10, backgroundColor: 'white'}}>
            <Markdown>{fetchedData?.article?.content ?? ''}</Markdown>
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
};
