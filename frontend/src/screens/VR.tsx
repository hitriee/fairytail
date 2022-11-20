import Iframe from 'react-iframe';
import {useNavigate, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';

import '@screens/VR.scss';
import Loading from '@loading/Loading';
import MoveToBack from '@common/MoveToBack';
import OpenHelp from '@common/OpenHelp';
import OptionBtn from '@components/vr/OptionBtn';

import {getMessageVR} from '@apis/vr';
import {LocationParams} from '@apis/index';
import {toMessageDetail} from '@apis/router';
import {currentUser} from '@common/commonFunc';

function VR() {
  // detail 페이지로 이동하기 위한 navigate
  const navigate = useNavigate();

  // 정렬 옵션: false-최신순, true-좋아요순
  const [option, setOption] = useState(false);

  // 데이터 및 데이터 받아오기가 끝났는지 확인하기 위한 state
  const [data, setData] = useState([]);
  const [isFinished, setIsFinished] = useState(-1);

  // 이전 페이지에서 받은 위치 정보를 location에 저장(VR에서 넘어온 경우)
  const state = useLocation().state;
  const position = state ? (state.position as LocationParams) : null;
  const [location, setLocation] = useState(position);

  // iframe 준비됐는지 확인
  const [isLoaded, setIsLoaded] = useState(false);

  // iframe 준비 끝나고 받은 위치 정보가 없을 경우(Main에서 넘어온 경우), 현재 위치 받아오기
  useEffect(() => {
    if (isLoaded && location === null) {
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
    }
  }, [isLoaded]);

  // iframe 준비 끝나고 위치가 준비된 경우, 서버에서 데이터 받아오기
  useEffect(() => {
    if (isLoaded && location !== null) {
      const optionString = option ? 'like' : 'latest';

      const userId = currentUser();

      const params = {
        ...location,
        userId: userId,
      };

      for (let i = 0; i < 4; i++) {
        getMessageVR(i, optionString, params)
          .then(res => {
            setData(prev => prev.concat(res.data));
            setIsFinished(prev => prev + 1);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }, [isLoaded, location, option]);

  // 데이터 다 받았다면 자식에 데이터 전달
  useEffect(() => {
    if (isFinished === 3) {
      const child = document.getElementsByTagName('iframe');
      child[0].contentWindow?.postMessage(data, '*');
      setIsFinished(-1);
    }
  }, [isFinished]);

  // 자식에게서 메세지 받을 경우 deatil 페이지로 이동
  const [postId, setPostId] = useState(0);

  const receiveMsgFromChild = (ev: MessageEvent<any>) => {
    if (ev.data === 'denied') {
      navigate(-1);
    } else if (ev.data.postId !== undefined && ev.data.postId !== null) {
      setPostId(ev.data.postId);
      navigate(toMessageDetail(ev.data.postId, ev.data.type));
    }
  };

  useEffect(() => {
    window.addEventListener('message', receiveMsgFromChild);
    return () => window.removeEventListener('message', receiveMsgFromChild);
  }, [postId]);

  return (
    <div className="vr">
      {isLoaded ? null : <Loading fillBackground={true} />}

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
          }, 500)
        }
      />
    </div>
  );
}

export default VR;
