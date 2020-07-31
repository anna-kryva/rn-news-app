import {ArticlesQuery} from './generated/graphql';

export type ArticleType = ArticlesQuery['articles'][number];

export type TagType = ArticleType['tags'][number];

export type ArticleCoverType = ArticleType['cover'];

export type LikeType = ArticleType['likes'][number];

export type RootStackParamList = {
  Main: undefined;
  Article: {id: string};
};
