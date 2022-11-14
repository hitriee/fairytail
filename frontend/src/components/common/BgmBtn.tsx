import {ReactComponent as Play} from '@images/play.svg';
import {ReactComponent as Pause} from '@images/pause.svg';
import {useRecoilState} from 'recoil';
import {playingState} from '@apis/Recoil';
import '@common/Common.scss';

function BgmBtn() {
  // 배경음악
  const [isPlaying, setIsPlaying] = useRecoilState<boolean>(playingState);

  return (
    <div
      id="bgm-btn"
      onClick={() => {
        setIsPlaying(prev => !prev);
      }}>
      {isPlaying ? (
        <Pause viewBox="0 0 24 24" width="40" height="40" fill="white" />
      ) : (
        <Play viewBox="0 0 24 24" width="40" height="40" fill="white" />
      )}
    </div>
  );
}

export default BgmBtn;
