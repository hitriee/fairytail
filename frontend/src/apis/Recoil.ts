import {atom} from 'recoil';

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});

export const playingState = atom({
  key: 'playingState',
  default: false,
});

export const likeModalState = atom({
  key: 'likeModalState',
  default: false,
});
