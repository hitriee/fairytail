import {useRef, useState} from 'react';
import {ReactComponent as Play} from '@images/play.svg';
import {ReactComponent as Pause} from '@images/pause.svg';
import {returnTrue, returnFalse} from '@common/commonFunc';
import '@individual/SettingsModal.scss';

interface EachBgmProps {
  element: {title: string; bgm: string};
  index: number;
  newBgm: string;
  changeBgm: (index: number) => () => void;
}

function EachBgm({element, index, newBgm, changeBgm}: EachBgmProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {title, bgm} = element;
  const [onPlay, setOnPlay] = useState(false);
  const playBgm = () => {
    if (onPlay) {
      setOnPlay(returnFalse);
    } else {
      setOnPlay(returnTrue);
    }
  };

  return (
    <div
      key={title}
      className={title === newBgm ? 'bgm-item bgm-selected' : 'bgm-item'}
      onClick={changeBgm(index)}>
      <span className="bgm-modal-title">{title}</span>

      <audio ref={audioRef} src={bgm} />
      {onPlay ? (
        <Pause className="bgm-play" fill="black" onClick={playBgm} />
      ) : (
        <Play className="bgm-play" fill="black" onClick={playBgm} />
      )}
    </div>
  );
}

export default EachBgm;
