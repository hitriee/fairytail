import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.scss';

// route
import Intro from './screens/Intro';
import Main from './screens/Main';
import Globe from './screens/Globe';
import Map from './screens/Map';
import MessageList from './screens/MessageList';
import MessageCreate from './screens/MessageCreate';
import MessageDetail from './screens/MessageDetail';
import VR from './screens/VR';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/main" element={<Main />} />
        <Route path="/globe" element={<Globe />} />
        <Route path="/map" element={<Map />} />
        <Route path="/vr" element={<VR />} />
        <Route path="/message/list" element={<MessageList />} />
        <Route path="/message/create" element={<MessageCreate />} />
        <Route path="/message/detail" element={<MessageDetail />} />
        <Route path="/message/detail" element={<MessageDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
