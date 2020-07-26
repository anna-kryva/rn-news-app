import {ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from 'expo-constants';

const client = new ApolloClient({
  uri: Constants.manifest.extra.graphCMSUrl,
  // cache: new InMemoryCache({
  //   typePolicies: {
  //     Query: {
  //       fields: {
  //         article(_, {args, toReference}) {
  //           return toReference({
  //             __typename: 'Article',
  //             id: args?.id ?? null,
  //           });
  //         },
  //       },
  //     },
  //   },
  // }),
  cache: new InMemoryCache(),
});

export default client;
