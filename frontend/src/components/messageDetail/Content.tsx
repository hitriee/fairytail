import {Preview} from '@components/messageCreate/Message';
import './Content.scss';
interface props {
  title: string;
  content: string;
  type: string;
  date: string;
}

function Content({title, content, type, date}: props) {
  // const showContent = () => {
  //   let result;
  //   switch (type) {
  //     case 0:
  //       result = content;
  //       break;
  //     case 1:
  //       result = <img src={content} alt="이미지" className="" />;
  //       break;
  //     default:
  //       // audio/mpeg
  //       // video/mp4
  //       // video/quicktime
  //       // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/codecs_parameter
  //       result = <Player fileURL="../../assets/bgms/slowmotion.mp3" />;
  //   }
  //   return result;
  // };
  // console.log(content);
  return (
    <article className="aurora">
      <p className="center white">{title}</p>
      <div className="card-detail">
        <div className="center content">
          <Preview type={type} fileURL={content} />
        </div>
      </div>
      <p className="center date white">{date}</p>
    </article>
  );
}

export default Content;
