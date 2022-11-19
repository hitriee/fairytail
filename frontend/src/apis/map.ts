import {API_AUTH, checkType} from '@apis/index';

interface getMessageMapParams {
  userId: number;
}

export const getMessageMap = async (
  type: number,
  params: getMessageMapParams,
) => {
  const res = await API_AUTH.get(`/${checkType(type)}/message/map`, {
    params: params,
  });
  return res.data;
};
