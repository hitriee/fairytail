import {useEffect, useRef} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import '@/App.scss';

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
import Intro from '@screens/Intro';
import Main from '@screens/Main';

// notification
import {initToken} from '@apis/notifications/getMessagingToken';

import {useRecoilState} from 'recoil';
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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={intro()} element={<Intro />} />
          <Route path={main()} element={<Main />} />
          <Route path={globe()} element={<Main />} />
          <Route path={map()} element={<Main />} />
          <Route path={vr()} element={<Main />} />
          <Route path={messageList()} element={<Main />} />
          <Route path={messageCreate()} element={<Main />} />
          <Route path={messageDetail()} element={<Main />} />
          <Route path={settings()} element={<Main />} />
          <Route path={notifications()} element={<Main />} />
          <Route path={nonexistent()} element={<Main />} />
        </Routes>
      </BrowserRouter>
      <audio muted={true} src={bgmArr[bgmNo].src} loop={true} ref={audioRef} />
    </>
  );
}
export default App;
