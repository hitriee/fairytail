import {useState} from 'react';
import {useNavigate} from 'react-router';
import {IoArrowBack, IoEllipsisVertical} from 'react-icons/io5';
import './Common.scss';

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
        <IoArrowBack
          onClick={toBack}
          color="white"
          className="icon-medium button"
        />
        {detail ? (
          <IoEllipsisVertical
            onClick={showMenu}
            color="white"
            className="icon-medium button"
          />
        ) : null}
      </div>
    </>
  );
}

export default NavBar;
