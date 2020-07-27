// TODO: I would suggest to add "postinstall" script to the package.json file and trigger "generate" there.
// In that case "generated" folder becomes available right after "yarn/npm install" command is executed.
import {ArticlesQuery} from './generated/graphql';
import {StackScreenProps} from '@react-navigation/stack';

// TODO: I would recommend to not use the "Card" word here because right hand side isn't connected with a card at all.
// I would rename this type to just ArticleType.
export type ArticleCardType = ArticlesQuery['articles'][number];

export type TagType = ArticleCardType['tags'][number];

// TODO: CoverImage → CoverType (or ArticleCoverType)
export type CoverImage = ArticleCardType['cover'];

type RootStackParamList = {
  Main: undefined;
  Article: {id: string};
};

// TODO: I guess it's better to place such types as ArticleScreenProps and MainScreenProps near the component they are used in.
// It makes sense to place types in a common place only if either it's not really obvious where to place it otherwise or they are needed in multiple places.
// RootStackParamList can be placed here probably, but with the "export" modifier.
export type ArticleScreenProps = StackScreenProps<
  RootStackParamList,
  'Article'
>;

export type MainScreenProps = StackScreenProps<RootStackParamList, 'Main'>;
