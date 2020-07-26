import React from 'react';

import {ArticleScreen} from './src/screens/ArticleScreen';
import {MainScreen} from './src/screens/MainScreen';
import {MainScreenHeader} from './src/components/MainScreenHeader';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import client from './apollo-client';
import {ApolloProvider} from '@apollo/client';

const Stack = createStackNavigator();

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
