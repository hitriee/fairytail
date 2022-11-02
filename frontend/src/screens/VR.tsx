import './VR.scss';
import Iframe from 'react-iframe';
import {useNavigate} from 'react-router';

function VR() {
  const navigate = useNavigate();

  function recieveMsgFromChild(ev: MessageEvent<any>) {
    if (ev.data === 'denied') {
      navigate(-1);
    } else if (typeof ev.data === 'object') {
      console.log('웹펙 오류');
    } else {
      navigate(`/message/detail/${ev.data}`);
    }
  }

  window.addEventListener('message', recieveMsgFromChild);

  return (
    <div className="vr">
      <Iframe
        className="vr-frame"
        url="../iframeVR/IframeVR.html"
        frameBorder={0}
      />
    </div>
  );
}

export default VR;
