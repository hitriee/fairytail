import {API_AUTH, API_FILE} from '@apis/index';
import {checkType} from '@apis/index';

export const postText = async (type: number, data: object) => {
  const res = await API_AUTH.post(`/${checkType(type)}/message`, data);
  return res.data;
};

export const postFile = async (type: number, data: object) => {
  const res = await API_FILE.post(`/${checkType(type)}/message`, data);
  return res.data;
};
