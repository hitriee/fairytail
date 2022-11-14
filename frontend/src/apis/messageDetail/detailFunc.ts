//** back과 통신

// base url & headers
import {API_AUTH} from '@apis/index';
// interface
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
  switch (type) {
    case 'text':
      const textRes = await API_AUTH.post(`/${type}/like`, data);
      return textRes.data;
    case 'img':
      const imgRes = await API_AUTH.post(`/${type}/like`, null, {params: data});
      return imgRes.data;
  }
};

// 공개 여부 변경
// 이미지, 텍스트 데이터 다름
export const changeMessageStatus: changeMessageStatusType = async (
  type,
  data,
) => {
  switch (type) {
    case 'text':
      const textRes = await API_AUTH.post(`/${type}/message/status`, data);
      return textRes.data;
    case 'img':
      const imgRes = await API_AUTH.post(`/${type}/message/status`, null, {
        params: data,
      });
      return imgRes.data;
  }
};

// 신고
export const reportMessage: reportMessageType = async (type, data) => {
  switch (type) {
    case 'text':
      const textRes = await API_AUTH.post(`/${type}/report`, data);
      return textRes.data;
    case 'img':
      const imgRes = await API_AUTH.post(`/${type}/report`, null, {
        params: data,
      });
      return imgRes.data;
  }
};
