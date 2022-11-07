import React, {Suspense} from 'react';
import '@/apis/notifications/fcm';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import '@/App.scss';
import Loading from '../src/components/loading/Loading';
// route
import Intro from '@screens/Intro';
import Main from '@screens/Main';
import Globe from '@screens/Globe';
import Map from '@screens/Map';
import MessageList from '@screens/MessageList';
import MessageCreate from '@screens/MessageCreate';
import MessageDetail from '@screens/MessageDetail';
import VR from '@screens/VR';
import NotFound from '@screens/NotFound';
import Individual from '@/screens/Individual';

import {
  main,
  intro,
  globe,
  map,
  vr,
  messageList,
  messageCreate,
  messageUpdate,
  messageDetail,
  notFound,
  settings,
  notifications,
} from '@apis/router';

//recoil
import {RecoilRoot} from 'recoil';

function App() {
  // function useWindowSize() {
  //   const [windowSize, setWindowSize] = useState({
  //     width: 0,
  //     height: 0,
  //   });
  //   useEffect(() => {
  //     function handleResize() {
  //       setWindowSize({
  //         width: window.innerWidth,
  //         height: window.innerHeight,
  //       });
  //       if (window.innerWidth / window.innerHeight < 9 / 16) {
  //         window.innerWidth = (window.innerHeight * 9) / 16;
  //         setWindowSize({
  //           width: window.innerWidth,
  //           height: window.innerHeight,
  //         });
  //       }
  //     }
  //     window.addEventListener('resize', handleResize);
  //     handleResize();
  //     return () => window.removeEventListener('resize', handleResize);
  //   }, []);
  //   return windowSize;
  // }
  // console.log(useWindowSize());
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={intro()} element={<Intro />} />
            <Route path={main()} element={<Main />} />
            <Route path={globe()} element={<Globe />} />
            <Route path={map()} element={<Map />} />
            <Route path={vr()} element={<VR />} />
            <Route path={messageList()} element={<MessageList />} />
            <Route path={messageCreate()} element={<MessageCreate />} />
            <Route path={messageUpdate()} element={<MessageCreate />} />
            <Route path={messageDetail()} element={<MessageDetail />} />
            <Route path={notFound()} element={<NotFound />} />
            <Route path={settings()} element={<Individual />} />
            <Route path={notifications()} element={<Individual />} />
            {/* <Route path="/loading" element={<Loading />} /> */}
          </Routes>
        </Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
}
export default App;
