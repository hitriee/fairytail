import {API_AUTH} from '@apis/index';

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
export interface likeRequest {
  isLike: boolean;
  postId: number;
  userId: number;
}
export interface reportRequest {
  content: string;
  postId: number;
  type: number;
  userId: number;
}

export interface statusRequest {
  postId: number;
  status: number;
}
export interface detailResponse {
  data: {
    postId: number;
    type: number;
    title: string;
    userId: number;
    emojiNo: number;
    content: string;
    likeCnt: number;
    isLike: boolean;
    date: string;
    dayType: number;
  };
  message: string;
}

export interface messageType {
  (type: string, postId: number): any;
}
export interface likeMessageType {
  (type: string, data: likeRequest): any;
}
export interface changeMessageStatusType {
  (type: string, data: statusRequest): any;
}
export interface reportMessageType {
  (type: string, data: reportRequest): any;
}
