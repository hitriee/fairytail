import {useEffect, useRef, Suspense} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import '@/App.scss';
import Loading from '@components/loading/Loading';

// router
import {
  main,
  intro,
  process,
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
import Process from '@screens/Process';
import Main from '@screens/Main';

import {useRecoilState} from 'recoil';
import {bgmArr} from '@bgms/index';
import {bgmNoState, playingState} from '@apis/recoil';

function App() {
  // 배경음악
  const [isPlaying, setIsPlaying] = useRecoilState(playingState);
  const [bgmNo, setBgmNo] = useRecoilState(bgmNoState);

  const bgmNoJson = localStorage.getItem('bgmNo');

  if (bgmNoJson !== null) {
    const bgmNoLocal = JSON.parse(bgmNoJson);
    setBgmNo(bgmNoLocal);
  } else {
    localStorage.setItem('bgmNo', JSON.stringify(0));
  }

  const audioRef = useRef<HTMLAudioElement>(null!);

  useEffect(() => {
    audioRef.current.volume = 0.4;
  }, []);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play();
    } else {
      audioRef.current && audioRef.current.pause();
    }
  }, [isPlaying, bgmNo]);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading fillBackground={false} />}>
          <Routes>
            <Route path={intro()} element={<Intro />} />
            <Route path={process()} element={<Process />} />
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
        </Suspense>
      </BrowserRouter>
      <audio muted={true} src={bgmArr[bgmNo].src} loop={true} ref={audioRef} />
    </>
  );
}
export default App;
