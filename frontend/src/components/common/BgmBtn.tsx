import {useRecoilState, useRecoilValue} from 'recoil';

import {playingState, bgmNoState} from '@apis/recoil';

import {bgmArr} from '@bgms/index';

import '@common/Common.scss';
import {ReactComponent as Play} from '@images/play.svg';
import {ReactComponent as Pause} from '@images/pause.svg';

// main 우측 상단 재생 버튼
function BgmBtn() {
  // 배경음악 재생 여부
  const [isPlaying, setIsPlaying] = useRecoilState<boolean>(playingState);
  const bgmNo = useRecoilValue<number>(bgmNoState);

  return (
    <>
      <div
        id="bgm-btn"
        onClick={() => {
          setIsPlaying(prev => !prev);
          const isPlayingBGM = localStorage.getItem('isPlaying');
          if (isPlayingBGM === 'true') {
            localStorage.setItem('isPlaying', 'false');
          } else {
            localStorage.setItem('isPlaying', 'true');
          }
        }}>
        <div className="main-bgm-title white">{bgmArr[bgmNo].title}</div>
        {isPlaying ? (
          <Pause
            viewBox="0 0 24 24"
            width="40"
            height="40"
            fill="white"
            className="main-bgm-button"
          />
        ) : (
          <Play
            viewBox="0 0 24 24"
            width="40"
            height="40"
            fill="white"
            className="main-bgm-button"
          />
        )}
      </div>
    </>
  );
}

export default BgmBtn;
