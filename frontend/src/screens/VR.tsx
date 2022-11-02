import './VR.scss';
import Iframe from 'react-iframe';

function VR() {
  return (
    <div className="vr">
      <Iframe
        className="vr-frame"
        url="VR.html"
        src="VR.html"
        frameBorder={0}
      />
    </div>
  );
}

export default VR;
