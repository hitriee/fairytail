import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import '@common/Common.scss';
import {ReactComponent as Help} from '@images/help.svg';
import helpMap from '@images/helpMap.jpg';
import helpMain from '@images/helpMain.jpg';
import helpVR from '@images/helpVR.jpg';

interface OpenHelpProps {
  imagesIndex: number;
  color?: string;
}

const helpImages = [helpMain, helpMap, helpVR];

// 좌측 하단 도움말
function OpenHelp({imagesIndex, color = 'white'}: OpenHelpProps) {
  const [isOpened, setIsOpened] = useState(false);
  const closeHelp = () => setIsOpened(false);

  const location = useLocation();
  const pathname = location.pathname;
  const path = ['/main', '/map', '/vr'];

  // 최초 방문 시 도움말 자동으로 표시
  useEffect(() => {
    if (path.includes(pathname)) {
      const pathCntJson = localStorage.getItem('pathCnt');
      let pathCnt = [0, 0, 0];
      if (pathCntJson !== null) {
        pathCnt = JSON.parse(pathCntJson);
      }
      const idx = path.indexOf(pathname);

      pathCnt[idx] += 1;

      if (idx === 0 && pathCnt[idx] === 1) {
        setIsOpened(true);
      } else if (idx !== 0 && pathCnt[idx] === 2) {
        setIsOpened(true);
      }

      localStorage.setItem('pathCnt', JSON.stringify(pathCnt));
    }
  }, [pathname]);

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
        <div className="help-background fadeIn" onClick={closeHelp}>
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
