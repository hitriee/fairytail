import {API_AUTH} from '@apis/index';
import {
  messageType,
  likeMessageType,
  changeMessageStatusType,
  reportMessageType,
} from '@apis/messageDetail/detailInterface';

export const getMesssage: messageType = async (type, postId) => {
  const res = await API_AUTH.get(`/${type}/message/detail/${postId}`);
  console.log(res);
  return res.data;
};

export const deleteMessage: messageType = async (type, postId) => {
  const res = await API_AUTH.delete(`/${type}/message/detail/${postId}`);
  return res.data;
};

export const likeMessage: likeMessageType = async (type, data) => {
  const res = await API_AUTH.post(`/${type}/like`, data);
  return res.data;
};

export const changeMessageStatus: changeMessageStatusType = async (
  type,
  data,
) => {
  const res = await API_AUTH.post(`/${type}/message/status`, data);
  return res.data;
};

export const reportMessage: reportMessageType = async (type, data) => {
  const res = await API_AUTH.post(`/${type}/report`, data);
  return res.data;
};
