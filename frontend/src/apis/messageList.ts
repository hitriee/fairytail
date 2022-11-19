import {API_AUTH, checkType} from '@apis/index';

export const getMesssageList = async (type: number, userId: number) => {
  const res = await API_AUTH.get(
    `/${checkType(type)}/message/mylist/${userId}`,
  );
  return res.data;
};

export const messageUrl = (type: number, postId: number) => {
  return `/message/detail/${checkType(type)}/${postId}`;
};
