import "./Loading.scss";
import loading from "../../assets/images/loading.png";

function Loading() {
  return (
    <div className="loading-background">
      <img className="loading-image" src={loading} alt="로딩 이미지" />
      <p className="loading-message">~이동 중~</p>
    </div>
  );
}

export default Loading;
