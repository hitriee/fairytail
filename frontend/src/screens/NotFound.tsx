import {useLocation, useNavigate} from 'react-router-dom';
import IntroLogo from '@images/introLogo.png';
import '@screens/NotFound.scss';
import {main, notFound} from '@/apis/router';
import {useEffect} from 'react';

function NotFound() {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const toMain = () => navigate(main());
  useEffect(() => {
    if (pathname !== '/404') {
      navigate(notFound());
    }
  }, []);
  return (
    <div className="notFound">
      <div className="white notFound-title">길을 잃었습니다</div>
      <img src={IntroLogo} />
      <button className="notFound-button" onClick={toMain}>
        내 방으로 돌아가기
      </button>
    </div>
  );
}

export default NotFound;
