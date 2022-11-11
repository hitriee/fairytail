import {API_AUTH, API_FILE, checkType} from '@apis/index';

export const getMesssageList = async (type: number, PARAMS: object) => {
  const res = await API_AUTH.get(`/${checkType(type)}`, {
    params: PARAMS,
  });
  return res.data;
};
