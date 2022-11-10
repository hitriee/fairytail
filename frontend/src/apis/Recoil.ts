import {atom} from 'recoil';

export const loadingState = atom({
  key: 'loadingState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const playingState = atom({
  key: 'playingState',
  default: false,
});

export const likeModalState = atom({
  key: 'likeModalState',
  default: false,
});

// export const likeInfoState = atom({
//   key: 'likeInfoState',
//   default: {id: 0, title: '', emoji: 0},
// });
