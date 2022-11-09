import {atom, selector} from 'recoil';

export const playingState = atom({
  key: 'playingState',
  default: true,
});

// export const changeOnPlay = selector({
//   key: 'playingChangeState',
//   get: ({get}) => {
//     const onPlay = get(playingState);
//     return onPlay;
//   },
//   set: ({set}, newValue) => {
//     set(playingState, newValue);
//   },
// });
