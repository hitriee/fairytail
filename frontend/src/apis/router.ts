export const BASE_URL = () => 'https://k7c209.p.ssafy.io';
export const main = () => '/main';
export const intro = () => '/';
export const globe = () => '/globe';
export const map = () => '/map';
export const vr = () => '/vr';
export const messageList = () => '/message/list';
export const messageCreate = () => '/message/create';
export const messageDetail = () => `/message/detail/:type/:id`;
export const notFound = () => '/*';
export const settings = () => '/settings';
export const notifications = () => '/notifications';

export const toMessageDetail = (messageId: string | number) => {
  if (typeof messageId === 'number' || parseInt(messageId)) {
    return `/message/detail/${messageId}`;
  } else {
    return notFound();
  }
};
