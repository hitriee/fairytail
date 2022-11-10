import {API_AUTH} from '@apis/index';
import {checkType} from '@apis/index';

export const getMessageMap = async (type: number, params: Location) => {
  const res = await API_AUTH.get(`/${checkType(type)}/message/map`, {
    params: params,
  });
  return res.data;
};
