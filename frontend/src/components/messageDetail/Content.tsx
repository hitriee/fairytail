import {Preview} from '@components/messageCreate/Message';
import '@messageDetail/Content.scss';
import '@styles/_common.scss';
interface props {
  title: string;
  content: string;
  type: string;
  date: string;
}

function Content({title, content, type, date}: props) {
  return (
    <article className="aurora">
      <p className="center white">{title}</p>
      <div className="card-detail card-detail-text">
        <div className="center content">
          <Preview type={type} fileURL={content} />
        </div>
      </div>
      <p className="center date white">{date}</p>
    </article>
  );
}

export default Content;
