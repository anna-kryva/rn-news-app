import React from 'react';
import Constants from 'expo-constants';

import {ArticleScreen} from './src/screens/ArticleScreen';
import {MainScreen} from './src/screens/MainScreen';
import {MainScreenHeader} from './src/components/MainScreenHeader';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: Constants.manifest.extra.graphCMSUrl,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
            },
          }}>
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{headerTitle: (props) => <MainScreenHeader {...props} />}}
          />
          <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
