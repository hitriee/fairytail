import {useNavigate} from 'react-router';
import {ReactComponent as ArrowBack} from '@images/arrow-back-outline.svg';
import {ReactComponent as EllipsisVertical} from '@images/more_4.svg';

import '@common/Common.scss';

interface props {
  showMenu?: () => void;
  detail?: any;
}

function NavBar({showMenu, detail}: props) {
  const navigate = useNavigate();
  const toBack = () => navigate(-1);
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
