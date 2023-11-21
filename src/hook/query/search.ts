import {getAddress} from '@/apis/address';
import {getByLocation} from '@/apis/images';
import instance from '@/apis/instance';
import {QUERY_KEY} from '@/constants/queryKey';
import {LocationParam} from '@/model/RequestParams';
import {useQuery} from 'react-query';

export const useGetAddress = (state: LocationParam) => {
  return useQuery<string>([QUERY_KEY.address, state], () => getAddress(state), {
    enabled: state.x !== '' && state.y !== '',
  });
};

export const useGetImagesByAddress = (state: LocationParam) => {
  return useQuery<Array<string>>(
    [QUERY_KEY.byLocation, state],
    () => getByLocation(state),
    {
      enabled: state.x !== '' && state.y !== '',
    },
  );
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
