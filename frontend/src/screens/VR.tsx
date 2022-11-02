import './VR.scss';
import Iframe from 'react-iframe';

function VR() {
  return (
    <div className="vr">
      <Iframe className="vr-frame" url="vr.html" src="vr.html" />
    </div>
  );
}

export default VR;
