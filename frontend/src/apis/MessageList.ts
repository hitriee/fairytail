import {API_AUTH, API_FILE, checkType} from '@apis/index';

export const getMesssageList = async (type: number, userId: number) => {
  const res = await API_AUTH.get(
    `/${checkType(type)}/message/mylist/${userId}`,
  );
  return res.data;
};
