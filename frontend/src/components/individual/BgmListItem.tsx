// ** 각 bgm별 설정
import {useRecoilState} from 'recoil';
import {playingState, bgmNoState} from '@apis/recoil';

import '@individual/BgmModal.scss';
import {ReactComponent as Play} from '@images/play.svg';
import {ReactComponent as Pause} from '@images/pause.svg';

interface BgmListItemProps {
  title: string;
  index: number;
}

function BgmListItem({title, index}: BgmListItemProps) {
  const [isPlaying, setIsPlaying] = useRecoilState(playingState);
  const [bgmNo, setBgmNo] = useRecoilState(bgmNoState);

  const checkSelected = (index: number) => {
    if (isPlaying && index === bgmNo) {
      return 'bgm-list-item-selected';
    }
  };

  // 아이템 선택 -> 번호 바꾸고 재생
  const changeBgm = (index: number) => {
    setBgmNo(index);
    localStorage.setItem('bgmNo', JSON.stringify(index));
  };

  const handlePlayBgm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    localStorage.setItem('isPlaying', 'true');
    changeBgm(index);
  };

  const handlePauseBgm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false);
    localStorage.setItem('isPlaying', 'false');
    changeBgm(index);
  };

  return (
    <div
      className={'bgm-list-item ' + checkSelected(index)}
      onClick={() => {
        setIsPlaying(true);
        localStorage.setItem('isPlaying', 'true');
        changeBgm(index);
      }}>
      <span className="bgm-list-item-title">{title}</span>

      {isPlaying && index === bgmNo ? (
        <Pause
          className="bgm-list-item-play"
          fill="black"
          onClick={handlePauseBgm}
        />
      ) : (
        <Play
          className="bgm-list-item-play"
          fill="black"
          onClick={handlePlayBgm}
        />
      )}
    </div>
  );
}

export default BgmListItem;
