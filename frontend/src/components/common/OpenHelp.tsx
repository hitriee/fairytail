import {useEffect, useState} from 'react';

import '@common/Common.scss';
import {ReactComponent as Help} from '@images/help.svg';
import helpMap from '@images/helpMap.jpg';
import helpMain from '@images/helpMain.jpg';
import helpVR from '@images/helpVR.jpg';
import {useLocation} from 'react-router-dom';

interface OpenHelpProps {
  imagesIndex: number;
  color?: string;
}

const helpImages = [helpMain, helpMap, helpVR];

// 좌측 하단 도움말
function OpenHelp({imagesIndex, color = 'white'}: OpenHelpProps) {
  const [isOpened, setIsOpened] = useState(false);

  const closeHelp = () => setIsOpened(false);

  // 현재 경로 가져오기
  const pathname = useLocation().pathname;

  useEffect(() => {
    // 방문한 경로 목록 가져오기
    const visitedHelpJson = localStorage.getItem('visitedHelp');
    let visitedHelpArr = [];
    if (visitedHelpJson !== null) {
      visitedHelpArr = JSON.parse(visitedHelpJson);
    }

    // 현재 경로가 방문한 경로 목록에 없다면 추가, 도움말 표시
    if (!visitedHelpArr?.includes(pathname)) {
      visitedHelpArr?.push(pathname);
      localStorage.setItem('visitedHelp', JSON.stringify(visitedHelpArr));
      if (pathname === '/main') {
        setTimeout(() => {
          setIsOpened(true);
        }, 3200);
      } else {
        setIsOpened(true);
      }
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
