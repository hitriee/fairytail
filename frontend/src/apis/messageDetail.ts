import {API_AUTH} from '@apis/index';
import {checkType} from '@apis/index';

export const getMesssage = async (type: number, PARAMS: object) => {
  const res = await API_AUTH.get(`/${checkType(type)}`, {
    params: PARAMS,
  });
  return res.data;
};
