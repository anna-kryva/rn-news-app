import React, {useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native';
import LikeFilledIcon from '../icons/LikeFilledIcon';
import LikeOutlinedIcon from '../icons/LikeOutlinedIcon';
import useLike from '../hooks/useLike';

interface Props {
  articleId: string;
  isLiked: boolean;
}

const Like: React.FC<Props> = ({articleId, isLiked}) => {
  const changeLikeStatus = useLike(articleId, isLiked);

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
        {isLiked ? <LikeFilledIcon /> : <LikeOutlinedIcon />}
      </TouchableOpacity>
    </View>
  );
};

export default Like;
