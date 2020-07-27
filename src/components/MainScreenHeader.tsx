import React from 'react';
import {View} from 'react-native';
import {SvgIcon} from './SvgIcon';

export const MainScreenHeader: React.FC = () => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <SvgIcon />
    </View>
  );
};
