import axios from 'axios';

export const BASE_URL = 'https://k7c209.p.ssafy.io';

const getToken = () => {
  return `Bearer ${localStorage.token}`;
};

export const API_TEST = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: getToken(),
  },
});

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
