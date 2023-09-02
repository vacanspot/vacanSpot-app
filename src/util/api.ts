import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vacan-spot.loca.lt',
});

api.defaults.timeout = 1000 * 60 * 10;
api.defaults.timeoutErrorMessage = 'TIMEOUT_ERROR';

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default api;
