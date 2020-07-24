import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import Markdown from 'react-native-markdown-display';

import {Cover} from '../components/Cover';
import {TagsList} from '../components/TagsList';

import {useGetArticleByIdQuery} from '../generated/graphql';
import {LoadingSpinner} from '../components/LoadingSpinner';

import {ArticleScreenProps} from '../types';
import {useNavigation} from '@react-navigation/native';
import {ErrorComponent} from '../components/ErrorComponent';

const Container = styled.View`
  flex: 1;
`;

const CoverContent = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: white;
  padding: 5px;
  text-align: center;
`;

const MarkdownContainer = styled.View`
  padding: 10px;
`;

export const ArticleScreen: React.FC<ArticleScreenProps> = ({route}) => {
  const {setOptions} = useNavigation();
  const {id} = route.params;
  const {data, loading, error, refetch} = useGetArticleByIdQuery({
    variables: {id},
  });

  useEffect(() => {
    setOptions({headerTitle: data?.article?.title});
  }, [data?.article?.title, setOptions]);

  if (error) {
    return <ErrorComponent refetch={() => refetch()} />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{height: '100%'}}>
        <Cover image={data!.article!.cover}>
          <CoverContent>
            <Title>{data!.article!.title}</Title>
            <TagsList tags={data!.article!.tags} />
          </CoverContent>
        </Cover>

        <MarkdownContainer>
          <Markdown>{data!.article!.content}</Markdown>
        </MarkdownContainer>
      </ScrollView>
    </Container>
  );
};
