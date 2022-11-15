import axios from 'axios';

export const BASE_URL = 'https://k7c209.p.ssafy.io';

export const API_AUTH = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.token}`,
  },
});

// 추후 BASE_URL로 변경 예정
export const API_USER = axios.create({
  baseURL: 'http://k7c209.p.ssafy.io:9096',
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
