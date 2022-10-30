import "./Content.scss";
interface props {
  title: string;
  content: string;
  type: number;
  date: string;
}

function Content({ title, content, type, date }: props) {
  const showContent = () => {
    let result;
    switch (type) {
      case 0:
        result = content;
        break;
      case 1:
        result = <img src={content} alt="이미지" className="" />;
        break;
      case 2:
        result = (
          <video controls autoPlay className="">
            <source src={content} type="video/mp4" />
          </video>
          // audio/mpeg
          // video/mp4
          // video/quicktime
          // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/codecs_parameter
        );
        break;
      default:
        result = (
          <video controls autoPlay className="">
            <source src="../../assets/bgms/slowmotion.mp3" type="audio/mpeg" />
          </video>
        );
    }
    return result;
  };
  return (
    <article className="aurora">
      <p className="center white">{title}</p>
      <div className="card">
        <div className="center content">{showContent()}</div>
      </div>
      <p className="center date white">{date}</p>
    </article>
  );
}

export default Content;
