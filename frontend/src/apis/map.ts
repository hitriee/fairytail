import {API_AUTH, checkType} from '@apis/index';
import axios from 'axios';

export const getMessageMap = async (type: number) => {
  const res = await API_AUTH.get(`/${checkType(type)}/message/map`, {});
  return res.data;
};

export const getRandomLandKR = async () => {
  const res = await axios.get(
    'https://api.3geonames.org/?randomland=KR&json=1',
    {
      withCredentials: true,
    },
  );
  return res;
};
