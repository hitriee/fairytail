import './VR.scss';
import Iframe from 'react-iframe';
import {useNavigate, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Loading from '@/components/loading/Loading';
import MoveToBack from '@/components/common/MoveToBack';
import {useRecoilState} from 'recoil';

import {getMessageVR} from '@/apis/vr';
import {LocationParams} from '@/apis';
import OptionBtn from '@/components/vr/OptionBtn';
import {loadingState} from '@apis/Recoil';
import InitMessage from '@/apis/notifications/foregroundMessaging';

import OpenHelp from '@common/OpenHelp';
import {toMessageDetail} from '@/apis/router';
// import {vrResponse} from '@/apis/messageCreate';

function VR() {
  // recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const navigate = useNavigate();

  // 정렬 옵션: false-최신순, true-좋아요순
  const [option, setOption] = useState(false);

  const [data, setData] = useState([]);
  const [isFinished, setIsFinished] = useState(-1);

  // 이전 페이지에서 받은 위치 정보를 location에 저장
  const state = useLocation().state;
  const position = state ? (state.position as LocationParams) : null;
  const [location, setLocation] = useState(position);

  // iframe 준비 확인
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 받은 위치 정보가 없을 경우, 현재 위치 받아오기
    if (location === null) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async pos => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        });
      } else {
        alert('브라우저에서 위치 정보를 얻을 수 없습니다.');
        navigate(-1);
      }
    } else {
      // 서버에서 데이터 받아오기
      const optionString = option ? 'like' : 'latest';

      for (let i = 0; i < 4; i++) {
        getMessageVR(i, optionString, location)
          .then(res => {
            setData(prev => prev.concat(res.data));
            setIsFinished(prev => prev + 1);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }, [isLoaded, option]);

  // 자식에 데이터 전달
  useEffect(() => {
    if (isFinished === 3 && data.length > 0) {
      console.log(option);
      const child = document.getElementsByTagName('iframe');
      child[0].contentWindow?.postMessage(data, '*');
      setIsFinished(-1);
    }
  }, [isFinished, data]);

  // 자식에게서 메세지 받을 경우 페이지 이동
  const [postId, setPostId] = useState(0);

  const receiveMsgFromChild = (ev: MessageEvent<any>) => {
    if (ev.data === 'denied') {
      navigate(-1);
    } else if (ev.data === 'create') {
      navigate('/message/create');
    } else if (typeof ev.data === 'number') {
      setPostId(ev.data);
      // console.log(ev.data);
      // navigate(toMessageDetail(ev.data));
    }
  };

  useEffect(() => {
    window.addEventListener('message', receiveMsgFromChild);
    return () => window.removeEventListener('message', receiveMsgFromChild);
  }, [postId]);

  return (
    <>
      <InitMessage />
      <div className="vr">
        {isLoaded ? null : <Loading />}

        <MoveToBack path="-1" />
        {data.length > 0 ? (
          <OptionBtn option={option} setOption={setOption} setData={setData} />
        ) : null}
        <OpenHelp imagesIndex={2} />

        <Iframe
          className="vr-frame"
          url="../iframeVR/IframeVR.html"
          frameBorder={0}
          onLoad={() =>
            setTimeout(() => {
              setIsLoaded(true);
              setIsLoading(true);
            }, 1000)
          }
        />
      </div>
    </>
  );
}

export default VR;
