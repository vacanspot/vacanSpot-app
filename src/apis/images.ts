import instance from '@/apis/instance';
import {LocationParam} from '@/model/RequestParams';

export const getByLocation = async (params: LocationParam) => {
  const response = await instance.get('/api/recommend/images', {
    params,
  });

  return response.data;
};
