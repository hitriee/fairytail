import {API_TEST} from '@apis/index';

export const getIdentification = async () => {
  const res = await API_TEST.get('/user/accesstoken');
  return res;
};
