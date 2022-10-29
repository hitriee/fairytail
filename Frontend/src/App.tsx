import React from 'react';
import './App.css';

// Screens
import Main from './screens/Main';
import MessageCreate from './screens/MessageCreate';
import MessageDetail from './screens/MessageDetail';
import MessageList from './screens/MessageList';
import MessageVR from './screens/MessageVR';
import Globe from './screens/Globe';
import Map from './screens/Map';
import Settings from './screens/Settings';

function App() {
  return (
    <>
      {/* <Main />
      <MessageCreate />
      <MessageDetail />
      <MessageList />
      <MessageVR /> */}
      <Globe />
      {/* <Map />
      <Settings /> */}
    </>
  );
}

export default App;
