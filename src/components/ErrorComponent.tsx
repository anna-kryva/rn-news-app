import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

interface Props {
  refetch: () => void;
}

export const ErrorComponent: React.FC<Props> = ({refetch}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}>
      <Text
        style={{fontSize: 20, color: 'gray', textAlign: 'center', padding: 10}}>
        Oops, something went wrong... Please, try again
      </Text>
      <TouchableOpacity
        style={{width: '50%', aspectRatio: 1, margin: 20}}
        onPress={refetch}>
        <Image
          style={{flex: 1}}
          source={require('../assets/refresh.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};
