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

type UseCreateLikeResult = [
  (options: CreateLikeOptions) => void,
  MutationResult<CreateLikeMutation & ConnectLikeMutation>,
];

const useCreateLike = (): UseCreateLikeResult => {
  const {
    data: device,
    loading: deviceLoading,
    error: deviceError,
  } = useDeviceQuery({
    variables: {
      deviceId: DEVICE_ID,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [createLikeMutation, createLikeData] = useCreateLikeMutation();
  const [connectLikeMutation, connectLikeData] = useConnectLikeMutation();

  const createLike = useCallback(
    (options: CreateLikeOptions) => {
      if (device?.device) {
        createLikeMutation(options);
      } else {
        connectLikeMutation(options);
      }
    },
    [connectLikeMutation, createLikeMutation, device?.device],
  );

  const mergeQueryResult = (k: string, l: any, r: any) => {
    switch (k as keyof MutationResult) {
      case 'loading':
        return deviceLoading || r || l;
      case 'error':
        return deviceError || r || l;
      default:
        return r || l;
    }
  };

  return [
    createLike,
    R.mergeWithKey(mergeQueryResult, createLikeData, connectLikeData),
  ];
};

export default useCreateLike;
