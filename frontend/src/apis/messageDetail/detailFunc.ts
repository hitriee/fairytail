import {API_AUTH} from '@apis/index';
import {
  messageType,
  messageImgType,
  likeMessageType,
  changeMessageStatusType,
  reportMessageType,
} from '@apis/messageDetail/detailInterface';

// text 정보 받아오기
export const getTextMesssage: messageType = async (type, postId) => {
  const res = await API_AUTH.get(`/${type}/message/detail/${postId}`);
  return res.data;
};

// 이미지 정보 받아오기
export const getImgMesssage: messageImgType = async (type, params) => {
  const res = await API_AUTH.get(`/${type}/message/detail`, {params});
  console.log(res.data);
  return res.data;
};

// 글 삭제
export const deleteMessage: messageType = async (type, postId) => {
  const res = await API_AUTH.delete(`/${type}/message/${postId}`);
  return res.data;
};

// 좋아요 여부 변경
// data 타입만 다름
export const likeMessage: likeMessageType = async (type, data) => {
  const res = await API_AUTH.post(`/${type}/like`, data);
  return res.data;
};

// 공개 여부 변경
// 이미지, 텍스트 같음
export const changeMessageStatus: changeMessageStatusType = async (
  type,
  data,
) => {
  const res = await API_AUTH.post(`/${type}/message/status`, data);
  return res.data;
};

// 신고
// 이미지, 텍스트 같음
export const reportMessage: reportMessageType = async (type, data) => {
  const res = await API_AUTH.post(`/${type}/report`, data);
  return res.data;
};
