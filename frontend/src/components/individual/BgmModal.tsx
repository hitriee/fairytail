// ** bgm 설정 모달
import {useRef, useEffect} from 'react';

import {useRecoilState} from 'recoil';
import {playingState} from '@/apis/recoil';

import '@individual/BgmModal.scss';
import Toggle from '@messageCreate/Toggle';
import {bgmArr} from '@bgms/index';
import BgmListItem from '@individual/BgmListItem';
import {ReactComponent as Cancel} from '@images/cancelFill.svg';

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

  const [isPlaying, setIsPlaying] = useRecoilState<boolean>(playingState);

  const handlePlay = () => setIsPlaying(prev => !prev);

  return (
    <>
      {open ? (
        <div
          className="bgm-background fadeIn"
          onClick={onCancel}
          ref={bgmModalRef}>
          <div
            className="container bgm-container"
            onClick={event => {
              event.stopPropagation();
            }}>
            <div className="bgm-header">
              <span onClick={handlePlay}>배경음악 재생</span>
              <Toggle label="" onClick={handlePlay} value={isPlaying} />
            </div>

            <div className="bgm-list">
              {bgmArr.map(({title}, index) => {
                return <BgmListItem title={title} index={index} key={index} />;
              })}
            </div>

            <Cancel fill="#bfbfbf" onClick={onCancel} className="help-cancel" />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default BgmModal;
