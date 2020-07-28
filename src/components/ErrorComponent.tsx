import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import UpdateIcon from '../icons/UpdateIcon';

interface Props {
  refetch: () => void;
}

const Comment = styled.Text`
  font-size: 20px;
  color: gray;
  text-align: center;
  padding: 10px;
`;

export const ErrorComponent: React.FC<Props> = ({refetch}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}>
      <Comment>Oops, something went wrong... Please, try again</Comment>
      <TouchableOpacity style={{margin: 20}} onPress={refetch}>
        <UpdateIcon />
      </TouchableOpacity>
    </View>
  );
};
