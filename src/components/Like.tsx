import React, {useCallback} from 'react';
import R from 'ramda';

import {View, TouchableOpacity} from 'react-native';
import LikeFilledIcon from './icons/LikeFilledIcon';
import LikeOutlinedIcon from './icons/LikeOutlinedIcon';

import useToggleLike from '../hooks/useToggleLike';
import {LikeType} from '../types';

interface Props {
  articleId: string;
  likes: LikeType[];
}

const Like: React.FC<Props> = ({articleId, likes}) => {
  const [changeLikeStatus, {error}] = useToggleLike(articleId, likes);

  if (error) {
    console.log(error);
  }

  const pressHandler = useCallback(() => {
    changeLikeStatus();
  }, [changeLikeStatus]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 10,
      }}>
      <TouchableOpacity onPress={pressHandler}>
        {R.isEmpty(likes) ? <LikeOutlinedIcon /> : <LikeFilledIcon />}
      </TouchableOpacity>
    </View>
  );
};

export default Like;
