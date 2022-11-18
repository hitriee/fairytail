import {API_AUTH, checkType} from '@apis/index';

export const getMessageMap = async (type: number) => {
  const res = await API_AUTH.get(`/${checkType(type)}/message/map`, {});
  return res.data;
};
