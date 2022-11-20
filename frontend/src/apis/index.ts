import axios from 'axios';

export const BASE_URL = 'https://k7c209.p.ssafy.io';

export const API_AUTH = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.token}`,
  },
});

API_AUTH.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token && token.length > 0 && config.headers) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export const API_FILE = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.token}`,
    'Content-Type': 'multipart/form-data',
  },
});

API_FILE.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token && token.length > 0 && config.headers) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

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
