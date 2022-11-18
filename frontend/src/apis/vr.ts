import {API_AUTH, checkType, LocationParams} from '@apis/index';

export const getMessageVR = async (
  type: number,
  option: string,
  params: LocationParams,
) => {
  const res = await API_AUTH.get(`/${checkType(type)}/message/vr/${option}`, {
    params: params,
  });
  return res.data;
};
