import api from '../../util/api';
import {useMutation, useQuery} from 'react-query';

interface SearchParam {
  x: string;
  y: string;
}

export const useSearchAddress = () => {
  return useMutation(async (params: {x: number | null; y: number}) => {
    const response = await api.get<string>('/address', {
      params,
    });

    return response.data;
  });
};

export const useSearchImagesByAddress = () => {
  return useMutation(async (params: {x: number | null; y: number}) => {
    const response = await api.get<string[]>('/recommend/images', {
      params,
    });

    return response.data;
  });
};

export const useSearchImagesByKeyword = (params: {q: string}) => {
  return useQuery('SearchImagesByKeyword', async () => {
    const response = await api.get<{images: string[]}>('/recommend/images', {
      params,
    });

    return response.data;
  });
};
