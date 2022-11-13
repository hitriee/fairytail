import {checkType} from '.';

export const BASE_URL = () => 'https://k7c209.p.ssafy.io';
export const main = () => '/main';
export const intro = () => '/';
export const globe = () => '/globe';
export const map = () => '/map';
export const vr = () => '/vr';
export const messageList = () => '/message/list';
export const messageCreate = () => '/message/create';
export const messageDetail = () => `/message/detail/:type/:id`;
export const nonexistent = () => '/*';
export const settings = () => '/settings';
export const notifications = () => '/notifications';

export const notFound = () => '/404';
export const toMessageDetail = (messageId: string | number, type: number) => {
  if (typeof messageId === 'number' || parseInt(messageId)) {
    const stringType = checkType(type);
    if (stringType) {
      return `/message/detail/${stringType}/${messageId}`;
    }
  }
  return notFound();
};
