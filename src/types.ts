import {ArticlesQuery} from './generated/graphql';

export type ArticleCardType = ArticlesQuery['articles'][number];

export type TagType = ArticleCardType['tags'][number];

export type CoverImage = ArticleCardType['cover'];
