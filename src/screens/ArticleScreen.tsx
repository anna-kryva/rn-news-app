import React, {useEffect, useCallback, useRef, useMemo} from 'react';
import {Animated, View, RefreshControl, StyleSheet} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

import {ASPECT_RATIO} from '../constants';
import {RootStackParamList} from '../types';
import useArticle from '../hooks/useArticle';

import Cover from '../components/Cover';
import ErrorComponent from '../components/ErrorComponent';
import CoverContent from '../components/CoverContent';
import LoadingSpinner from '../components/LoadingSpinner';
import Like from '../components/Like';

type ArticleScreenProps = StackScreenProps<RootStackParamList, 'Article'>;

const ArticleScreen: React.FC<ArticleScreenProps> = ({route}) => {
  const {setOptions} = useNavigation();
  const {id} = route.params;
  const {data, error, loading, refetch} = useArticle(id);

  useEffect(() => {
    setOptions({headerTitle: data?.article?.title});
  }, [data?.article?.title, setOptions]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [refetch]);

  if (error || data === undefined) {
    return <ErrorComponent refetch={refetch} />;
  }

  const {cover, title, tags, content, likes} = data!.article!;

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslate = useMemo(() => Animated.divide(scrollY, -2), [
    scrollY,
  ]);

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
        <Cover image={cover} rounded={false} id={id}>
          <CoverContent
            title={title}
            tags={tags}
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
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{aspectRatio: ASPECT_RATIO}}>
          <View style={StyleSheet.absoluteFill}>
            <Like articleId={id} likes={likes} />
          </View>
        </View>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <View style={{padding: 10, backgroundColor: 'white'}}>
            <Markdown>{content ?? ''}</Markdown>
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default ArticleScreen;
