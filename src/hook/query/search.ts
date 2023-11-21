import {getAddress} from '@/apis/address';
import {getByKeyword, getByLocation} from '@/apis/images';
import {QUERY_KEY} from '@/constants/queryKey';
import {KeywordParam, LocationParam} from '@/model/RequestParams';
import {useQuery} from 'react-query';

export const useGetAddress = (state: LocationParam) => {
  return useQuery<string>(
    [QUERY_KEY.address, state],
    async () => await getAddress(state),
    {
      enabled: state.x !== '' && state.y !== '',
    },
  );
};

export const useGetImagesByAddress = (state: LocationParam) => {
  return useQuery<Array<string>>(
    [QUERY_KEY.byLocation, state],
    async () => await getByLocation(state),
    {
      enabled: state.x !== '' && state.y !== '',
    },
  );
};

export const useGetImagesByKeyword = (state: KeywordParam) => {
  return useQuery<Array<string>>(
    [QUERY_KEY.byKeyword, state.p],
    async () => await getByKeyword(state),
    {enabled: state.p !== ''},
  );
};
