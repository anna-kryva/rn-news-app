import React from 'react';
import {View, Text, Image} from 'react-native';

// TODO: Extract Text styles using styled-components
// TODO: Try to replace empty-list.png with a vector equivalent (https://material.io/resources/icons/)
export const EmptyList: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}>
      <Text
        style={{fontSize: 20, textAlign: 'center', color: 'gray', padding: 5}}>
        Our content manager is working on new articles. Stay in touch!
      </Text>
      <View style={{margin: 10, width: '50%', aspectRatio: 1}}>
        <Image
          style={{flex: 1}}
          source={require('../assets/empty-list.png')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
