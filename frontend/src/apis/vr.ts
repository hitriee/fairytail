import {API_AUTH, checkType} from '@apis/index';

interface getMessageVRParams {
  lat: number;
  lng: number;
  userId: number;
}

export const getMessageVR = async (
  type: number,
  option: string,
  params: getMessageVRParams,
) => {
  const res = await API_AUTH.get(`/${checkType(type)}/message/vr/${option}`, {
    params: params,
  });
  return res.data;
};
