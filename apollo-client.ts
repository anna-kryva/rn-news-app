// TODO: I think it's logical to keep all source files under the /src folder (except App.tsx of course). Please move this one and declarations.d.ts to /src.
import {ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from 'expo-constants';

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
    },
  }),
});

export default client;
