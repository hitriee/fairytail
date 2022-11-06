import './VR.scss';
import Iframe from 'react-iframe';
import {useNavigate} from 'react-router';
import {useEffect, useState} from 'react';
import Loading from '@/components/loading/Loading';

function VR() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [postId, setPostId] = useState(0);

  const receiveMsgFromChild = (ev: MessageEvent<any>) => {
    if (ev.data === 'denied') {
      navigate(-1);
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
      <Iframe
        className="vr-frame"
        url="../iframeVR/IframeVR.html"
        frameBorder={0}
        onLoad={() => setTimeout(() => setIsLoaded(true), 200)}
      />
    </div>
  );
}

export default VR;
