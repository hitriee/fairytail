import { useState } from "react";
import { useNavigate } from "react-router";
import arrow_back from "../../assets/icons/arrow_back.svg";
import more_vert from "../../assets/icons/more_vert.svg";
import MoreMenu from "./MoreMenu";
import "./Common.scss";

interface props {
  isMine: boolean;
}

function NavBar({ isMine }: props) {
  const navigate = useNavigate();
  const [more, setMore] = useState(false);
  const toBack = () => navigate(-1);
  const showMenu = () => setMore(true);
  const hiddenMenu = () => {
    if (more) {
      setMore(false);
    }
  };
  return (
    <>
      <div id="navBar" onClick={hiddenMenu}>
        <img src={arrow_back} alt="뒤로 가기" onClick={toBack} />
        <img src={more_vert} alt="더보기" onClick={showMenu} />
      </div>
      {more ? <MoreMenu isMine={isMine} /> : null}
    </>
  );
}

export default NavBar;
