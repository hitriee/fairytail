import {useState, useRef, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router';
import {useRecoilState} from 'recoil';
import {loadingState} from '@apis/Recoil';
import {ReactComponent as EllipsisVertical} from '@images/ellipsisVertical.svg';
import MoreMenu from '@common/MoreMenu';
import Content from '@messageDetail/Content';
import Like from '@messageDetail/Like';
import MoveToBack from '@common/MoveToBack';
import {notFound} from '@apis/router';
import '@screens/MessageDetail.scss';
import InitMessage from '@/apis/notifications/foregroundMessaging';

function MessageDetail() {
  // recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);

  // 풍선 저장 관련
  const messageDetailRef = useRef(null!);

  // 전달 받은 messageId가 숫자가 아니라면 notfound로 이동
  const navigate = useNavigate();
  const params = useParams();
  const messageId = params.id;

  useEffect(() => {
    loader();
  }, []);

  const loader = async () => {
    if (!messageId || !parseInt(messageId)) {
      navigate(notFound());
    }
  };

  // 현재 사용자 정보
  const currentUserId = 1;

  // 서버 통신으로 게시글 정보 가져오기
  const data = {
    title: '여우비 가온해 안녕',
    content:
      '바나나 아련 노트북 포도 늘품 미리내 바나나 그루잠 감사합니다 노트북 바람꽃 아련 별하 소록소록 산들림 함초롱하다 아련 늘품 감또개 이플 컴퓨터 노트북 나래 산들림 도르레 가온해!',
    like_cnt: 121,
    is_like: true,
    date: new Date(),
    user_id: 0,
    type: 0,
    emoji_no: 15,
    status: 0,
    background: 1,
  };

  // 현재 사용자가 작성한 게시글인지 확인
  const isMine = currentUserId === data.user_id;

  // 메뉴 표시 여부
  const [more, setMore] = useState(false);

  const hiddenMenu = () => {
    if (more) setMore(false);
  };

  const showMenu = () => setMore(!more);

  // 날짜 형식에 맞춰 표시
  const modifiedDate = () => {
    let month: number | string = data.date.getMonth();
    if (month < 10) month = '0' + month;
    let day: number | string = data.date.getDate();
    if (day < 10) day = '0' + day;
    return `${data.date.getFullYear()}-${month}-${day}`;
  };

  return (
    <>
      <InitMessage />
      <div
        className={`screen background${data.background}`}
        ref={messageDetailRef}
        onClick={hiddenMenu}>
        <main id="container">
          <section data-html2canvas-ignore="true" className="ignore">
            <MoveToBack path="" />
            <div id="message-detail-nav-more" onClick={showMenu}>
              <EllipsisVertical width="32" height="32" fill="white" />
            </div>
            <MoreMenu
              open={more}
              isMine={isMine}
              detail={messageDetailRef}
              messageId={messageId}
              type={data.type}
              content={data.content}
              close={hiddenMenu}
              status={data.status}
            />
          </section>
          <section className="container">
            <Content
              title={data.title}
              content={data.content}
              type={data.type}
              date={modifiedDate()}
              status={data.status}
            />
            <Like
              count={data.like_cnt}
              like={data.is_like}
              isMine={isMine}
              emoji={data.emoji_no}
            />
          </section>
        </main>
      </div>
    </>
  );
}

export default MessageDetail;
