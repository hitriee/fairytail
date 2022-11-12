import {useState, useRef, useEffect} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router';
import {useRecoilState} from 'recoil';
import {loadingState} from '@apis/Recoil';
import {ReactComponent as EllipsisVertical} from '@images/ellipsisVertical.svg';
import MoreMenu from '@common/MoreMenu';
import Content from '@messageDetail/Content';
import Like from '@messageDetail/Like';
import MoveToBack from '@common/MoveToBack';
import {notFound, intro} from '@apis/router';
import '@screens/MessageDetail.scss';
import InitMessage from '@/apis/notifications/foregroundMessaging';
import {getMesssage, detailResponse} from '@/apis/messageDetail';
import {isNumberType} from '@/components/common/commonFunc';

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
  let intMessageId = 0;

  useEffect(() => {
    if (!messageId || !parseInt(messageId)) {
      navigate(notFound());
    } else {
      intMessageId = parseInt(messageId);
    }
  }, []);

  // 현재 사용자 정보
  const userId = localStorage.getItem('id');
  let intUserId = 0;
  useEffect(() => {
    if (!userId || !parseInt(userId)) {
      // navigate(intro());
    } else {
      intUserId = parseInt(userId);
    }
  }, []);

  // 서버 통신으로 게시글 정보 가져오기
  const dataType = {
    postId: 0,
    type: 0,
    title: '',
    userId: 0,
    emojiNo: 0,
    content: '',
    likeCnt: 0,
    isLike: false,
    date: '',
    dayType: 10,
  };

  const [data, setData] = useState(dataType);

  // 다른 페이지에서 넘어온 정보 (type)
  const [type, setType] = useState<number | undefined>(useLocation().state);

  useEffect(() => {
    if (type === undefined) {
      // type 알려달라고 백에 요청
    }
    getMesssage(0, messageId).then((res: detailResponse) => {
      if (res.message === 'SUCCESS') {
        setData(() => res.data);
      } else {
        // 실패했을 경우 404로 이동
        navigate(notFound());
      }
    });
  }, []);

  // 오류 처리

  // 현재 사용자가 작성한 게시글인지 확인
  const isMine = () => userId === String(data.userId);

  // 메뉴 표시 여부
  const [more, setMore] = useState(false);

  const hiddenMenu = () => {
    if (more) setMore(false);
  };

  const showMenu = () => setMore(!more);

  // 날짜 형식에 맞춰 표시
  const modifiedDate = () => data.date.split('T')[0];

  return (
    <>
      <InitMessage />
      <div
        className={`screen background${data.dayType}`}
        ref={messageDetailRef}
        onClick={hiddenMenu}>
        <main id="container">
          <section data-html2canvas-ignore="true" className="ignore">
            <MoveToBack path="" />
            <div id="message-detail-nav-more" onClick={showMenu}>
              <EllipsisVertical width="32" height="32" fill="white" />
            </div>
            {/* <MoreMenu
              open={more}
              isMine={isMine()}
              detail={messageDetailRef}
              messageId={messageId}
              type={data.type}
              content={data.content}
              close={hiddenMenu}
              status={data.status}
            /> */}
          </section>
          <section className="container">
            {/* <Content
              title={data.title}
              content={data.content}
              type={data.type}
              date={modifiedDate()}
              status={data.status}
            /> */}
            <Like
              count={data.likeCnt}
              like={data.isLike}
              isMine={isMine()}
              emoji={data.emojiNo}
              type={data.type}
              likeInfo={{
                postId: data.postId,
                userId: userId ? parseInt(userId) : 0,
              }}
            />
          </section>
        </main>
      </div>
    </>
  );
}

export default MessageDetail;
