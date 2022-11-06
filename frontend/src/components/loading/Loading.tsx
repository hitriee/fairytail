import React from 'react';
import './Loading.scss';
import Iframe from 'react-iframe';
import loading from '../../assets/images/loading.png';
// import Background from 'public/background/Background.html'
// import '../../../public/background/Background.html'
function Loading() {
  return (
    <>
      <Iframe
        className="iframeLoading"
        url="../../background/Background.html"
        src="../../background/Background.html"
        frameBorder={0}
      />
      <div className="loading-background">
        <img className="loading-image" src={loading} alt="로딩 이미지" />
        <p className="loading-message">~이동 중~</p>
      </div>
    </>
  );
}

export default Loading;
