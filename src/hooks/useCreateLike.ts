import {useCallback} from 'react';
import R from 'ramda';
import {
  useDeviceQuery,
  useCreateLikeMutation,
  useConnectLikeMutation,
  CreateLikeMutation,
  ConnectLikeMutation,
  Exact,
} from '../generated/graphql';
import {DEVICE_ID} from '../constants';
import {MutationResult, MutationFunctionOptions} from '@apollo/client';

type CreateLikeOptions =
  | MutationFunctionOptions<
      CreateLikeMutation & ConnectLikeMutation,
      Exact<{
        articleId: string;
        deviceId: string;
      }>
    >
  | undefined;

export type UseCreateLikeResult = [
  (options: CreateLikeOptions) => void,
  MutationResult<CreateLikeMutation & ConnectLikeMutation>,
];

const useCreateLike = (): UseCreateLikeResult => {
  const {data, loading, error} = useDeviceQuery({
    variables: {
      deviceId: DEVICE_ID,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [createLikeMutation, createLikeResult] = useCreateLikeMutation();
  const [connectLikeMutation, connectLikeResult] = useConnectLikeMutation();

  const createLike = useCallback(
    (options: CreateLikeOptions) => {
      if (!loading) {
        if (data?.device) {
          connectLikeMutation(options);
        } else {
          createLikeMutation(options);
        }
      }
    },
    [connectLikeMutation, createLikeMutation, data?.device, loading],
  );

  const mergeMutationResult = (k: string, l: any, r: any) => {
    switch (k as keyof MutationResult) {
      case 'loading':
        return loading || r || l;
      case 'error':
        return error || r || l;
      default:
        return r || l;
    }
  };

  return [
    createLike,
    R.mergeWithKey(mergeMutationResult, createLikeResult, connectLikeResult),
  ];
};

export default useCreateLike;
