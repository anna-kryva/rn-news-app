import React, {useEffect} from 'react';
import {Animated, View, ScrollView} from 'react-native';
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
// TODO: Idea: extract the caching logic below (useArticleQuery & useArticleContentQuery) into a separate hook.
// useArticle(id: string): QueryResult<ArticleQuery | ArticleContentQuery> { ... }
// All fields should be merged manually. R.mergeWithKey can be a good option.
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

// TODO: To prevent Animated.Value from recreating each time it's better to wrap it with useRef(...).current
  const scrollY = new Animated.Value(0);
// TODO: To be fantastically performant you can wrap this guy with useMemo(() => ..., [scrollY]) as well.
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
// TODO: It's better to make explicit unwrap only once (right after you checked that both error and loading are falsy values).
            title={cachedData!.article!.title}
            tags={cachedData!.article!.tags}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          />
        </Cover>
      </Animated.View>
      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
// TODO: Is it possible to get rid of width: '100%' property here?
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
