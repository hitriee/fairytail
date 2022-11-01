import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import '@/App.scss';

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
import Settings from '@settings/Settings';
import Notification from '@settings/Notification';

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

function App() {
  return (
    <BrowserRouter>
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
        <Route path={settings()} element={<Settings />} />
        <Route path={notifications()} element={<Notification />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
