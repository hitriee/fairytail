import Preview from '@messageCreate/Preview';
import '@messageDetail/Content.scss';

interface ContentProps {
  title: string;
  content: string;
  type: number;
  date: string;
  status: number;
}

const statusArr = ['공개', '비공개', '차단'];

function Content({title, content, type, date, status}: ContentProps) {
  return (
    <article className="detail-container">
      <p className="detail-title">{title}</p>
      <div className="detail-content">
        <Preview type={type} fileURL={content} />
      </div>
      <div className="detail-bottom-container">
        <span className="detail-date">{date}</span>
        <span className="detail-date">{statusArr[status]}</span>
      </div>
    </article>
  );
}

export default Content;
