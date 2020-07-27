import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {TagsList} from './TagsList';
import {TagType} from '../types';

interface Props {
  id: string;
  title: string;
  tags: TagType[];
  onPress?: (id: string) => void;
  disabled?: boolean;
  centered?: boolean;
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: white;
  padding: 5px;
  text-align: left;
`;

export const CoverContent: React.FC<Props> = ({
  id,
  title,
  tags,
  onPress,
  disabled,
  centered,
}) => {
  return (
    <Container style={centered ? styles.container : null}>
      <TouchableOpacity
        disabled={disabled ?? false}
        onPress={() => {
          onPress ? onPress(id) : undefined;
        }}>
        <Title style={centered ? styles.title : null}>{title}</Title>
      </TouchableOpacity>
      <TagsList tags={tags} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
});
