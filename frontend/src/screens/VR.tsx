import React from 'react';
import './VR.scss';

function VR() {
  return (
    <div className="vr">
      <iframe className="vr-frame" src="test.html" />
    </div>
  );
}

export default VR;
