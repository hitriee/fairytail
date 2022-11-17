// ** 메시지 상세
import {useState, useRef, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router';

import '@screens/MessageDetail.scss';
import Content from '@messageDetail/Content';
import Like from '@messageDetail/Like';
import MoreMenu from '@common/MoreMenu';
import MoveToBack from '@common/MoveToBack';
import {intMessageId, convStringType} from '@common/commonFunc';
import {currentUser} from '@common/commonFunc';
import {ReactComponent as EllipsisVertical} from '@images/ellipsisVertical.svg';
import {notFound, intro} from '@apis/router';
import {getMesssage} from '@apis/messageDetail/detailFunc';

function MessageDetail() {
  // 풍선 저장 관련
  const messageDetailRef = useRef(null!);

  // 전달 받은 messageId가 숫자가 아니라면 notfound로 이동
  const navigate = useNavigate();
  const params = useParams();
  const messageId = intMessageId(params.id);
  const type = convStringType(params.type);

  // 현재 사용자 정보
  const userId = currentUser();

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
    dayType: 4,
    status: 0,
    url: '',
    lat: 0,
    lng: 0,
  };
  const [data, setData] = useState(dataType);
  const getDetailMessage = () => {
    getMesssage(type, {postId: messageId, userId})
      .then((res: any) => {
        console.log(res);
        if (res.message === 'SUCCESS') {
          setData(prev => {
            return {...prev, ...res.data};
          });
        } else {
          // 실패했을 경우 404로 이동
          navigate(notFound());
        }
      })
      .catch((error: any) => navigate(notFound()));
  };
  // if (type === 'text') {
  //   getTextMesssage(type, messageId).then((res: textDetailResponse) => {
  //     if (res.message === 'SUCCESS') {
  //       setData(prev => {
  //         return {...prev, ...res.data};
  //       });
  //     } else {
  //       // 실패했을 경우 404로 이동
  //       navigate(notFound());
  //     }
  //   });
  // } else if (type === 'img') {
  //   getImgMesssage(type, {postId: messageId, userId}).then(
  //     (res: imgDetailResponse) => {
  //       if (res.message === 'SUCCESS') {
  //         setData(prev => {
  //           return {...prev, ...res.data};
  //         });
  //       } else {
  //         // 실패했을 경우 404로 이동
  //         navigate(notFound());
  //       }
  //     },
  //   );
  // } else {
  //   navigate(notFound());
  // }
  // };
  // 현재 사용자가 작성한 게시글인지 확인
  const isMine = () => userId === data.userId;

  useEffect(() => {
    if (messageId === -1) {
      navigate(notFound());
    } else if (userId === -1) {
      navigate(intro());
    } else if (type) {
      getDetailMessage();
    }
  }, []);

  // 비공개 글일 때 작성자가 자신이 아니면 404 페이지로 이동
  useEffect(() => {
    if (!isMine() && data.status) {
      navigate(notFound());
    }
    setNewStatus(data.status);
  }, [data]);

  // 메뉴 표시 여부
  const [more, setMore] = useState(false);

  const hiddenMenu = () => {
    if (more) setMore(false);
  };

  const showMenu = () => setMore(!more);

  // 날짜 형식에 맞춰 표시
  const modifiedDate = () => data.date.split('T')[0];

  // 공개 여부 변경 대비
  const [newStatus, setNewStatus] = useState(data.status);
  // content에 들어갈 내용
  const detailContent = () => {
    if (type === 'text') {
      return data.content;
    } else if (data.url) {
      return `https://${data.url}`;
    } else {
      return '';
    }
  };

  return (
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
          <MoreMenu
            open={more}
            isMine={isMine()}
            detail={messageDetailRef}
            messageId={messageId}
            type={type}
            content={data.url || data.content}
            close={hiddenMenu}
            status={newStatus}
            setStatus={setNewStatus}
          />
        </section>
        <section className="container">
          <Content
            title={data.title}
            content={detailContent()}
            type={data.type}
            date={modifiedDate()}
            status={newStatus}
          />
          <Like data={data} type={type} userId={userId} setData={setData} />
        </section>
      </main>
    </div>
  );
}

export default MessageDetail;
