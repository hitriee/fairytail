import axios from 'axios';

export const BASE_URL = 'https://k7c209.p.ssafy.io';

export const API_TEST = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.token}`,
  },
});

API_TEST.interceptors.request.use(
  config => {
    console.dir(config);
    const token = localStorage.getItem('token');
    console.log('1번', token);
    console.dir(config.headers);

    if (token && token.length > 0 && config.headers) {
      console.log('2번', token);
      config.headers.Authorization = token;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export const API_AUTH = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.token}`,
  },
});

export const API_FILE = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.token}`,
    'Content-Type': 'multipart/form-data',
  },
});

export const checkType = (type: number) => {
  switch (type) {
    case 0:
      return 'text';

    case 1:
      return 'img';

    case 2:
      return 'video';

    case 3:
      return 'audio';

    default:
      return '';
  }
};

export interface LocationParams {
  lat: number;
  lng: number;
}
