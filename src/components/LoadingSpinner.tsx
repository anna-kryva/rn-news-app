import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const LoadingSpinner: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <ActivityIndicator color="#0a88f2" size="large" />
    </View>
  );
};

export default LoadingSpinner;
