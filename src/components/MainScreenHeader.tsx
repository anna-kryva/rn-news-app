import React from 'react';
import {View} from 'react-native';
import AppIcon from './icons/AppIcon';

const MainScreenHeader: React.FC = () => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <AppIcon />
    </View>
  );
};

export default MainScreenHeader;
