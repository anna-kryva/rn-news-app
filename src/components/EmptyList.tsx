import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import EmptyListIcon from '../icons/EmptyListIcon';

const Comment = styled.Text`
  font-size: 20px;
  text-align: center;
  color: gray;
  padding: 5px;
`;

const EmptyList: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}>
      <Comment>
        Our content manager is working on new articles. Stay in touch!
      </Comment>
      <View style={{margin: 10, alignItems: 'center'}}>
        <EmptyListIcon />
      </View>
    </View>
  );
};

export default EmptyList;
