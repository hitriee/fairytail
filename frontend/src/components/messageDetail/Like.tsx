import { useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import skull from "../../assets/images/skull.png";
import "./Like.scss";

interface props {
  count: number;
  like: boolean;
  isMine: boolean;
}
function Like({ count, like, isMine }: props) {
  const [myLike, setLike] = useState(like);
  const changeLike = () => {
    if (!isMine) {
      setLike(!myLike);
      console.log("백에 like 변경 요청?");
    }
  };
  return (
    <article className="etc">
      <p className="white count">{count}</p>
      {/* <img src={heart} alt="like" /> */}
      {myLike ? (
        <IoHeartOutline className="white icon-medium" onClick={changeLike} />
      ) : (
        <IoHeartSharp className="red icon-medium" onClick={changeLike} />
      )}
      <img src={skull} alt="skull" className="ballon" />
    </article>
  );
}

export default Like;
