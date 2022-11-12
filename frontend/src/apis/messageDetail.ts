import {API_AUTH} from '@apis/index';
import {checkType} from '@apis/index';

// const detailPath: messageType = (type, postId) =>
//   `/${checkType(type)}/message/detail/${postId}`;

// const likePath = (type: number) => `/${checkType(type)}/like`

export const getMesssage: messageType = async (type, postId) => {
  const res = await API_AUTH.get(
    `/${checkType(type)}/message/detail/${postId}`,
  );
  return res.data;
};

export const deleteMessage: messageType = async (type, postId) => {
  const res = await API_AUTH.delete(
    `/${checkType(type)}/message/detail/${postId}`,
  );
  return res.data;
};

export const likeMessage: likeMessageType = async (type, data) => {
  const res = await API_AUTH.post(`/${checkType(type)}/like`, data);
  return res.data;
};

export const changeMessageStatus: changeMessageStatusType = async (
  type,
  data,
) => {
  const res = await API_AUTH.post(`/${checkType(type)}/message/status`, data);
  return res.data;
};

export const reportMessage: reportMessageType = async (type, data) => {
  const res = await API_AUTH.post(`/${checkType(type)}/report`, data);
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
  status: boolean;
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
  (type: number, postId: string | undefined): any;
}
export interface likeMessageType {
  (type: number, data: likeRequest): any;
}
export interface changeMessageStatusType {
  (type: number, data: statusRequest): any;
}
export interface reportMessageType {
  (type: number, data: reportRequest): any;
}
