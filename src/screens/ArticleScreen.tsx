import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import Markdown from 'react-native-markdown-display';
import {useNavigation} from '@react-navigation/native';

import {useArticleQuery} from '../generated/graphql';
import {ArticleScreenProps} from '../types';

import {Cover} from '../components/Cover';
import {ErrorComponent} from '../components/ErrorComponent';
import {CoverContent} from '../components/CoverContent';
import {LoadingSpinner} from '../components/LoadingSpinner';

const Container = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  height: 100%;
`;

const MarkdownContainer = styled.View`
  padding: 10px;
`;

export const ArticleScreen: React.FC<ArticleScreenProps> = ({route}) => {
  const {setOptions} = useNavigation();
  const {id} = route.params;
  const {data, loading, error, refetch} = useArticleQuery({
    variables: {id},
  });

  useEffect(() => {
    setOptions({headerTitle: data?.article?.title});
  }, [data?.article?.title, setOptions]);

  if (error) {
    console.log(error);
    return <ErrorComponent refetch={() => refetch()} />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      {data ? (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Cover image={data!.article!.cover}>
            <CoverContent
              id={id}
              title={data!.article!.title}
              tags={data!.article!.tags}
              disabled={true}
              centered={true}
            />
          </Cover>

          <MarkdownContainer>
            <Markdown>{data!.article!.content}</Markdown>
          </MarkdownContainer>
        </ScrollView>
      ) : (
        <ErrorComponent refetch={() => refetch()} />
      )}
    </Container>
  );
};
