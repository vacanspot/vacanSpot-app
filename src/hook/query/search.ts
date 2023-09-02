import api from '../../util/api';
import {useQuery} from 'react-query';

interface SearchParam {
  x: string;
  y: string;
}

export const useSearchAddress = (params: SearchParam) => {
  return useQuery(['SearchAddress', params.x, params.y], async () => {
    const response = await api.get<{address: string}>('/address', {
      params,
    });

    return response.data;
  });
};

export const useSearchImagesByAddress = (params: SearchParam) => {
  return useQuery(['SearchImagesByAddress', params.x, params.y], async () => {
    const response = await api.get<{images: string[]}>('/recommend/images', {
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
