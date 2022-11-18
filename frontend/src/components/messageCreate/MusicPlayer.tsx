import React, {useState, useRef} from 'react';
import styled from 'styled-components';

import '@messageCreate/MusicPlayer.scss';
import subtitleImg from '@images/speechToText.svg';
import {ReactComponent as Play} from '@images/play.svg';
import {ReactComponent as Pause} from '@images/pause.svg';

import {useRecoilState} from 'recoil';
import {playingState} from '@apis/recoil';

type MusicPlayerProps = {
  fileURL: string;
  subtitle: string;
  isDetail: boolean;
};

type AudioInfo = {
  currentTime: number;
  duration: number;
};

// audio 재생기
function MusicPlayer({fileURL, subtitle, isDetail}: MusicPlayerProps) {
  // 자막 표시 여부
  const [isShowingSubtitle, setIsShowingSubtitle] = useState(false);

  // 배경음악
  const [isPlayingBGM, setIsPlayingBGM] = useRecoilState(playingState);
  const currentPlayingBGM = localStorage.getItem('isPlaying');

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInfo, setAudioInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const handleUpdateTime = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>,
  ) => {
    const target = e.target as HTMLAudioElement;

    if (target.localName === 'audio') {
      const currentTime = target.currentTime;
      const duration = target.duration;
      setAudioInfo({...audioInfo, currentTime, duration});
    }
  };

  const handleChangeFile = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>,
  ) => {
    handleUpdateTime(e);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current && audioRef.current.pause();
      if (currentPlayingBGM === 'true') {
        setIsPlayingBGM(true);
      }
    } else {
      audioRef.current && audioRef.current.play();
      setIsPlayingBGM(false);
    }
    setIsPlaying(prev => !prev);
  };

  const handleDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
    setAudioInfo({...audioInfo, currentTime: Number(e.target.value)});
  };

  const getTime = (time: number) => {
    const minute = Math.floor(time / 60);
    const second = ('0' + Math.floor(time % 60)).slice(-2);
    return `${minute}:${second}`;
  };

  return (
    <div className="music-player-container">
      {isDetail ? (
        <img
          src={subtitleImg}
          alt="자막 표시"
          className="music-player-subtitle-btn"
          onClick={() => setIsShowingSubtitle(prev => !prev)}
        />
      ) : null}

      {isShowingSubtitle ? (
        <div className="message-create-content-text message-create-content-text-preview">
          {subtitle}
        </div>
      ) : (
        <>
          {isPlaying ? (
            <Pause
              width="70%"
              height="70%"
              fill="#b49aff"
              onClick={handlePlay}
              className="play-btn"
            />
          ) : (
            <Play
              width="70%"
              height="70%"
              fill="#b49aff"
              onClick={handlePlay}
              className="play-btn"
            />
          )}

          <div className="track-container">
            <div className="track">
              <input
                className="track-input"
                onChange={handleDrag}
                min={0}
                max={audioInfo.duration || 0}
                value={audioInfo.currentTime}
                type="range"
              />
              <AnimateTrack audioInfo={audioInfo} />
            </div>

            <div className="time-container">
              <span>{getTime(audioInfo.currentTime || 0)}</span>
              <span>{getTime(audioInfo.duration || 0)}</span>
            </div>
          </div>
        </>
      )}

      <audio
        onLoadedMetadata={handleChangeFile}
        onTimeUpdate={handleUpdateTime}
        onEnded={handlePlay}
        ref={audioRef}
        src={fileURL}
      />
    </div>
  );
}

const AnimateTrack = styled.div`
  background: rgb(204, 204, 204);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(
    ${({audioInfo}: {audioInfo: AudioInfo}) =>
      Math.round((audioInfo.currentTime * 100) / audioInfo.duration) + '%'}
  );
  pointer-events: none;
`;

export default MusicPlayer;
