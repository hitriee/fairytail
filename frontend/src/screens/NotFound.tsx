import {Link} from 'react-router-dom';
import IntroLogo from '@images/introLogo.png';
import '@screens/NotFound.scss';

function NotFound() {
  return (
    <div className="notFound">
      <div className="white"> 404 Not Found</div>
      <img src={IntroLogo} />
      <div className="white">페이지를 찾을 수 없습니다</div>
      <Link to="/main">
        <button>go Main</button>
      </Link>
    </div>
  );
}

export default NotFound;
