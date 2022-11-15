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
  const [isOpened, setIsOpened] = useState(true);
  const closeHelp = () => setIsOpened(false);

  const location = useLocation();
  const pageName = location.pathname;
  const path = ['/main', '/vr', '/map'];

  useEffect(() => {
    // 현재 주소를 방문한 적이 있다면 안내문 off
    if (pageName in localStorage) {
      setIsOpened(false);
      // 방문한 적이 없다면 url 주소 localstorage에 저장
    } else if (path.includes(pageName)) {
      setTimeout(() => {
        localStorage.setItem(`${pageName}`, `${pageName}`);
      }, 100);
    }
  }, [pageName]);

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
