import React, {Suspense, lazy} from 'react';
import '@/apis/notifications/fcm';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import '@/App.scss';
import Loading from '../src/components/loading/Loading';
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

const MessageList = lazy(() => import('@screens/MessageList'));

function App() {
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
          </Routes>
        </Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
}
export default App;
