import {ReactComponent as ArrowBack} from '@images/arrowBack.svg';
import {useNavigate, useLocation} from 'react-router';
import {ReactComponent as EllipsisVertical} from '@images/more_4.svg';
import {main, globe, vr, toMessageDetail} from '@apis/router';

import '@common/Common.scss';

interface props {
  showMenu?: () => void;
  detail?: any;
}

function NavBar({showMenu, detail}: props) {
  const navigate = useNavigate();
  const location = useLocation();
  // detail => vr
  // update => detail
  // map => globe
  // vr => map? main? (일단 main으로 설정)
  const path = location.pathname.split('/');
  const toBack = () => {
    if (path[1] === 'map') {
      navigate(globe());
    } else if (path[2] === 'detail') {
      navigate(-1);
    } else if (path[2] === 'update') {
      navigate(toMessageDetail(path[3]));
    } else {
      navigate(main());
    }
  };
  return (
    <>
      <div id="navBar">
        <ArrowBack onClick={toBack} color="white" className="icon-nav button" />
        {detail ? (
          <EllipsisVertical
            onClick={showMenu}
            color="white"
            className="icon-nav button"
          />
        ) : null}
      </div>
    </>
  );
}

export default NavBar;
