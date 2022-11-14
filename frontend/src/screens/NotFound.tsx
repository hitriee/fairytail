import {Link, useNavigate} from 'react-router-dom';
import IntroLogo from '@images/introLogo.png';
import '@screens/NotFound.scss';
import {main} from '@/apis/router';

function NotFound() {
  const navigate = useNavigate();
  const toMain = () => navigate(main());
  return (
    <div className="notFound">
      <div className="white notFound-title notFound-content">
        길을 잃었습니다
      </div>
      <img src={IntroLogo} />
      {/* <Link to="/main"> */}
      <button className="notFound-content notFound-button" onClick={toMain}>
        내 방으로 돌아가기
      </button>
      {/* </Link> */}
    </div>
  );
}

export default NotFound;
