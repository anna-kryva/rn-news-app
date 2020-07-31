import {useCallback} from 'react';
import R from 'ramda';
import {MutationResult} from '@apollo/client';
import {
  useDeleteLikeMutation,
  ArticlesDocument,
  DeleteLikeMutation,
} from '../generated/graphql';
import useCreateLike, {UseCreateLikeResult} from './useCreateLike';
import {LikeType} from '../types';
import {DEVICE_ID} from '../constants';

type UseToggleLikeResult = [
  () => void,
  UseCreateLikeResult[1] & MutationResult<DeleteLikeMutation>,
];

const useToggleLike = (
  articleId: string,
  likes: LikeType[],
): UseToggleLikeResult => {
  const [createLike, createLikeResult] = useCreateLike();
  const [deleteLike, deleteLikeResult] = useDeleteLikeMutation();

  const changeLikeStatus = useCallback(() => {
    if (likes[0]) {
      deleteLike({
        variables: {id: likes[0].id},
        refetchQueries: [
          {query: ArticlesDocument, variables: {deviceId: DEVICE_ID}},
          'devices',
        ],
      });
    } else {
      createLike({
        variables: {articleId, deviceId: DEVICE_ID},
        refetchQueries: [
          {query: ArticlesDocument, variables: {deviceId: DEVICE_ID}},
          'devices',
        ],
      });
    }
  }, [likes, deleteLike, createLike, articleId]);

  const mergeMutationResult = (k: string, l: any, r: any) => {
    switch (k as keyof MutationResult) {
      default:
        return r || l;
    }
  };

  return [
    changeLikeStatus,
    R.mergeWithKey(mergeMutationResult, createLikeResult, deleteLikeResult),
  ];
};

export default useToggleLike;
