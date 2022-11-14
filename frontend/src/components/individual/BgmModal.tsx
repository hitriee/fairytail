import {useRecoilState} from 'recoil';
import {playingState, bgmNoState} from '@/apis/Recoil';
import '@individual/BgmModal.scss';
import Toggle from '@messageCreate/Toggle';
import {bgmArr} from '@bgms/index';
import BgmListItem from '@individual/BgmListItem';
import {useRef, useEffect} from 'react';

interface BgmModalProps {
  open: boolean;
  onCancel(): void;
}

function BgmModal({open, onCancel}: BgmModalProps) {
  const bgmModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('mousedown', ({target}) => {
      if (
        bgmModalRef.current &&
        !bgmModalRef.current.contains(target as Node)
      ) {
        onCancel();
      }
    });
  });

  const [isPlaying, setIsPlaying] = useRecoilState(playingState);
  const [bgmNo, setBgmNo] = useRecoilState(bgmNoState);

  const handlePlay = () => setIsPlaying(prev => !prev);

  return (
    <>
      {open ? (
        <div className="bgm-background" onClick={onCancel} ref={bgmModalRef}>
          <div
            className="container bgm-container"
            onClick={event => {
              event.stopPropagation();
            }}>
            <div className="bgm-header">
              <span onClick={handlePlay}>배경음악 재생</span>
              <Toggle label="" onClick={handlePlay} value={isPlaying} />
            </div>

            <div
              className="bgm-list"
              style={{overflow: isPlaying ? 'auto' : 'hidden'}}>
              {bgmArr.map(({title}, index) => {
                return <BgmListItem title={title} index={index} key={index} />;
              })}
            </div>

            <button className="btn" onClick={onCancel}>
              닫기
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default BgmModal;
