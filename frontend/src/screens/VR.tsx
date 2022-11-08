import './VR.scss';
import Iframe from 'react-iframe';
import {useNavigate, useLocation} from 'react-router';
import {useEffect, useState} from 'react';
import Loading from '@/components/loading/Loading';
import MoveToBack from '@/components/common/MoveToBack';
import {useRecoilState} from 'recoil';
import {loadingState} from '../apis/Recoil';

type RouteState = {
  state: {
    position: {
      lat: number;
      lng: number;
    };
  };
};

function VR() {
  // recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);
  // 받은 위치 정보로 서버에 데이터 요청
  const {state} = useLocation() as RouteState;

  let location = {};

  // 받은 위치 정보가 없을 경우, 현재 위치 탐색
  if (state === null) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
      });
    }
  } else {
    location = state.position;
  }

  // 자식에 데이터 전달
  useEffect(() => {
    const child = document.getElementsByTagName('iframe');
    child[0].contentWindow?.postMessage(location, '*');
  });

  // 자식에게서 메세지 받을 경우 페이지 이동
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [postId, setPostId] = useState(0);

  const receiveMsgFromChild = (ev: MessageEvent<any>) => {
    if (ev.data === 'denied') {
      navigate(-1);
    } else if (ev.data === 'create') {
      navigate('/message/create');
    } else if (typeof ev.data === 'number') {
      setPostId(ev.data);
      navigate(`/message/detail/${postId}`);
    }
  };

  useEffect(() => {
    window.addEventListener('message', receiveMsgFromChild);
    return () => window.removeEventListener('message', receiveMsgFromChild);
  }, [postId]);

  return (
    <div className="vr">
      {isLoaded ? null : <Loading />}

      <MoveToBack path="-1" />

      <Iframe
        className="vr-frame"
        url="../iframeVR/IframeVR.html"
        frameBorder={0}
        onLoad={() => setTimeout(() => setIsLoaded(true), 1500)}
      />
    </div>
  );
}

export default VR;