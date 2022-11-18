import {API_AUTH} from '@apis/index';

export const getIdentification = async () => {
  const res = await API_AUTH.get('/user/accesstoken');
  return res;
};
