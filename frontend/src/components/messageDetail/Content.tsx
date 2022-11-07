import {Preview} from '@components/messageCreate/Message';
import '@messageDetail/Content.scss';
// import '@styles/_common.scss';
interface props {
  title: string;
  content: string;
  type: number;
  date: string;
}

function Content({title, content, type, date}: props) {
  const findClass = () => {
    if (type === 0) {
      return 'detail-card detail-card-text';
    } else if (type === 3) {
      return 'detail-card detail-card-audio';
    } else {
      return '';
    }
  };
  return (
    <article className="detail-container">
      <p className="center white detail-title">{title}</p>
      <div className={findClass()}>
        <div className="detail-content">
          <Preview type={type} fileURL={content} />
        </div>
      </div>
      <p className="detail-date white">{date}</p>
    </article>
  );
}

export default Content;
