import instance from '@/apis/instance';
import {LocationParam} from '@/model/RequestParams';

export const getAddress = async (params: LocationParam) => {
  const response = await instance.get('/api/address', {
    params,
  });

  return response.data;
};