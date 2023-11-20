import {LocationParam, getAddress} from '@/apis/address';
import instance from '@/apis/instance';
import {QUERY_KEY} from '@/constants/queryKey';
import {useMutation, useQuery} from 'react-query';

export const useSearchAddress = () => {
  return useMutation(async (params: {x: number | null; y: number}) => {
    const response = await instance.get<string>('/address', {
      params,
    });

    return response.data;
  });
};

export const useGetAddress = (state: LocationParam) => {
  return useQuery([QUERY_KEY.address, state], () => getAddress(state));
};

export const useSearchImagesByAddress = () => {
  return useMutation(async (params: {x: number | null; y: number}) => {
    const response = await instance.get<string[]>('/recommend/images', {
      params,
    });

    return response.data;
  });
};

export const useSearchImagesByKeyword = (params: {q: string}) => {
  return useQuery('SearchImagesByKeyword', async () => {
    const response = await instance.get<{images: string[]}>(
      '/recommend/images',
      {
        params,
      },
    );

    return response.data;
  });
};
