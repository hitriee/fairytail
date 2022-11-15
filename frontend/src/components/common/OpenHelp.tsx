import {useState} from 'react';

import '@common/Common.scss';
import {ReactComponent as Help} from '@images/help.svg';
import helpMap from '@images/helpMap.jpg';
import helpMain from '@images/helpMain.jpg';
import helpVR from '@images/helpVR.jpg';
import './OpenHelp.scss';

interface OpenHelpProps {
  imagesIndex: number;
  color?: string;
}

const helpImages = [helpMain, helpMap, helpVR];

// 좌측 하단 도움말
function OpenHelp({imagesIndex, color = 'white'}: OpenHelpProps) {
  const [isOpened, setIsOpened] = useState(false);

  const closeHelp = () => setIsOpened(false);

  return (
    <>
      <div
        id="open-help"
        onClick={() => {
          setIsOpened(true);
        }}>
        <Help viewBox="0 0 45 50" width="40" height="40" fill={color} />
      </div>
      {isOpened ? (
        <div className="help-background" onClick={closeHelp}>
          <div className="container help-container">
            <img
              className="help-img"
              src={helpImages[imagesIndex]}
              onClick={event => {
                event.stopPropagation();
              }}
            />
            <button className="btn" onClick={closeHelp}>
              닫기
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default OpenHelp;
