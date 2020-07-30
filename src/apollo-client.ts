import {ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from 'expo-constants';
import R from 'ramda';
import {ArticleLikesQuery, ArticleLikesDocument} from './generated/graphql';
import {DEVICE_ID} from './constants';

const matchDeviceId = (like: ArticleLikesQuery['likes'][number]) => {
  return like.deviceId?.deviceId === DEVICE_ID;
};

const client = new ApolloClient({
  uri: Constants.manifest.extra.graphCMSUrl,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          article(_, {args, toReference}) {
            return toReference({
              __typename: 'Article',
              id: args?.where.id ?? null,
            });
          },
        },
      },
      Article: {
        fields: {
          isLiked: {
            read(_, {variables, cache}) {
              const articleLikesQueryResult = cache.readQuery<
                ArticleLikesQuery
              >({
                query: ArticleLikesDocument,
                variables: {articleId: variables?.articleId ?? null},
              });
              const searchResult = articleLikesQueryResult?.likes
                ? R.find(matchDeviceId)(articleLikesQueryResult.likes)
                : undefined;
              return searchResult ? true : false;
            },
          },
        },
      },
    },
  }),
});

export default client;
