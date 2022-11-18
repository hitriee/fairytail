// ** 메시지 상세 페이지 본문
import '@messageDetail/Content.scss';
import Preview from '@messageCreate/Preview';

import {isText} from '@common/commonFunc';
import {dataType} from '@apis/messageDetail/detailInterface';
import {checkType} from '@apis/index';

interface ContentProps {
  status: number;
  data: dataType;
}

function Content({data, status}: ContentProps) {
  // 전달 받은 데이터
  const {title, type, url, content, date} = data;

  // 날짜 형식 변경
  const modifiedDate = date.split('T')[0];

  // 공개 여부
  const statusArr = ['공개', '비공개', '차단'];

  // type이 text라면 content, 아니라면 url을 반환
  const detailContent = () => {
    if (isText(checkType(type))) {
      return content;
    } else {
      return url ? `https://${data?.url}` : '';
    }
  };

  return (
    <article className="detail-container">
      <p className="detail-title">{title}</p>
      <div className="detail-content">
        <Preview
          type={type}
          fileURL={detailContent()}
          subtitle={content}
          isDetail={true}
        />
      </div>
      <div className="detail-bottom-container">
        <span className="detail-date">{modifiedDate}</span>
        <span className="detail-date">{statusArr[status]}</span>
      </div>
    </article>
  );
}

export default Content;
