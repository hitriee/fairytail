// ** 메시지 상세 페이지 본문

import Preview from '@messageCreate/Preview';
import {dataType} from '@apis/messageDetail/detailInterface';
import '@messageDetail/Content.scss';
import {isText} from '@common/commonFunc';
import {checkType} from '@/apis';
// import {useHistory} from 'react-router-dom';
import {useEffect} from 'react';

interface ContentProps {
  // title: string;
  // content: string;
  // type: number;
  // date: string;
  status: number;
  data: dataType;
}

function Content({data, status}: ContentProps) {
  // console.log(useHistory());
  const {title, type, url, content, date} = data;
  const modifiedDate = date.split('T')[0];
  const statusArr = ['공개', '비공개', '차단'];
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
        <Preview type={type} fileURL={detailContent()} />
      </div>
      <div className="detail-bottom-container">
        <span className="detail-date">{modifiedDate}</span>
        <span className="detail-date">{statusArr[status]}</span>
      </div>
    </article>
  );
}

export default Content;
