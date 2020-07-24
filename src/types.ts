import {ArticlesQuery} from './generated/graphql';
import {StackScreenProps} from '@react-navigation/stack';

export type ArticleCardType = ArticlesQuery['articles'][number];

export type TagType = ArticleCardType['tags'][number];

export type CoverImage = ArticleCardType['cover'];

type RootStackParamList = {
  Main: undefined;
  Article: {id: string};
};

export type ArticleScreenProps = StackScreenProps<
  RootStackParamList,
  'Article'
>;

export type MainScreenProps = StackScreenProps<RootStackParamList, 'Main'>;
