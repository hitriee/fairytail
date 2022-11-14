import {atom, RecoilRoot, useRecoilState} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

export const playingState = atom({
  key: 'playingState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const bgmNoState = atom({
  key: 'bgmNoState',
  default: 0,
});

export const likeModalState = atom({
  key: 'likeModalState',
  default: false,
});
