import {ReactComponent as Play} from '@images/play.svg';
import {ReactComponent as Pause} from '@images/pause.svg';
import '@individual/SettingsModal.scss';
import {useRecoilState} from 'recoil';
import {playingState, bgmNoState} from '@/apis/Recoil';
import {useEffect, useRef, useState} from 'react';
import {bgmArr} from '@bgms/index';

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
    } else if (!isPlaying) {
      return 'bgm-list-item-disabled';
    }
  };

  // 아이템 선택 -> 재생 중이라면 번호 바꾸고 재생 여부 뒤집기
  const changeBgm = (index: number) => {
    if (isPlaying) {
      setBgmNo(index);
    }
  };

  return (
    <div
      className={'bgm-list-item ' + checkSelected(index)}
      onClick={() => {
        if (isPlaying) {
          setBgmNo(index);
        }
      }}>
      <span className="bgm-list-item-title">{title}</span>

      {isPlaying && index === bgmNo ? (
        <Pause
          className="bgm-list-item-play"
          fill="black"
          onClick={event => {
            event.stopPropagation();
            changeBgm(index);
          }}
        />
      ) : (
        <Play
          className="bgm-list-item-play"
          fill="black"
          onClick={event => {
            event.stopPropagation();
            changeBgm(index);
          }}
        />
      )}
    </div>
  );
}

export default BgmListItem;
