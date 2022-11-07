import {useRef, useState} from 'react';
import {ReactComponent as Play} from '@images/play.svg';
import {ReactComponent as Pause} from '@images/pause.svg';
import {returnTrue, returnFalse} from '@common/commonFunc';

interface props {
  element: {title: string; bgm: string};
  index: number;
  newBgm: string;
  changeBgm: (index: number) => () => void;
}
function EachBgm({element, index, newBgm, changeBgm}: props) {
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
      className={title === newBgm ? 'bgm-each selectedBgm' : 'bgm-each'}>
      <span className="bgm-modal-title" onClick={changeBgm(index)}>
        {title}
      </span>

      <audio ref={audioRef} src={bgm} />
      {onPlay ? (
        <Pause className="play" fill="black" onClick={playBgm} />
      ) : (
        <Play className="play" fill="black" onClick={playBgm} />
      )}
    </div>
  );
}

export default EachBgm;
