// notification
import {
  initToken,
  requestPermission,
} from '@apis/notifications/getMessagingToken';

import {Suspense, useEffect, useState, useRef, lazy} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import '@/App.scss';

import Loading from '@components/loading/Loading';
// route
import Intro from '@screens/Intro';
import Main from '@screens/Main';
import Globe from '@screens/Globe';
import Map from '@screens/Map';
// lazy loading으로 대체
// import MessageList from '@screens/MessageList';
import MessageCreate from '@screens/MessageCreate';
import MessageDetail from '@screens/MessageDetail';
import VR from '@screens/VR';
import NotFound from '@screens/NotFound';
import Individual from '@screens/Individual';

//recoil
import {useRecoilState} from 'recoil';
// router
import {
  main,
  intro,
  globe,
  map,
  vr,
  messageList,
  messageCreate,
  messageDetail,
  nonexistent,
  settings,
  notifications,
} from '@apis/router';
import {bgmArr} from './assets/bgms';
import {bgmNoState, playingState} from './apis/Recoil';

function App() {
  initToken();

  // 배경음악
  const [isPlaying, setIsPlaying] = useRecoilState(playingState);
  const [bgmNo, setBgmNo] = useRecoilState(bgmNoState);

  const audioRef = useRef<HTMLAudioElement>(null!);

  useEffect(() => {
    audioRef.current.volume = 0.4;
  }, []);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      audioRef.current && audioRef.current.pause();
    }
  }, [isPlaying, bgmNo]);

  const MessageList = lazy(() => import('@screens/MessageList'));

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={intro()} element={<Intro />} />
            <Route path={main()} element={<Main />} />
            <Route path={globe()} element={<Globe />} />
            <Route path={map()} element={<Map />} />
            <Route path={vr()} element={<VR />} />
            <Route path={messageList()} element={<MessageList />} />
            <Route path={messageCreate()} element={<MessageCreate />} />
            <Route path={messageDetail()} element={<MessageDetail />} />
            <Route path={settings()} element={<Individual />} />
            <Route path={notifications()} element={<Individual />} />
            <Route path={nonexistent()} element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <audio muted={true} src={bgmArr[bgmNo].src} loop={true} ref={audioRef} />
    </>
  );
}
export default App;
