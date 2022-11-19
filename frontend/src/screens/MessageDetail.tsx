// ** 메시지 상세
import {useState, useRef, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router';
import styled, {keyframes} from 'styled-components';

import '@screens/MessageDetail.scss';
import Content from '@messageDetail/Content';
import Like from '@messageDetail/Like';
import MoreMenu from '@common/MoreMenu';
import MoveToBack from '@common/MoveToBack';
import {ReactComponent as EllipsisVertical} from '@images/ellipsisVertical.svg';

import {notFound} from '@apis/router';
import {getMesssage} from '@apis/messageDetail/detailFunc';
import {dataType} from '@apis/messageDetail/detailInterface';
import {intMessageId, convStringType, currentUser} from '@common/commonFunc';

// dayType에 따른 다른 배경색 조합
const dayTypeColors = [
  ['f4b0ce', '5281b5', '08053b'], // 1 ~ 5시
  ['e9fcfb', '8fdcfa', '0fc3ff'], // 6 ~ 10시
  ['f7a937', 'b4d583', '32c9f7'], // 11 ~ 16시
  ['851975', 'dd4e67', 'ff7100'], // 17 ~ 20시
  ['010519', '1b396e', '03012e'], // 21 ~ 24시
];

function MessageDetail() {
  // 풍선 저장 관련
  const messageDetailRef = useRef(null!);

  // 전달 받은 messageId, type을 올바른 자료형으로 변환해서 변수에 저장
  const navigate = useNavigate();
  const params = useParams();
  const messageId = intMessageId(params.id);
  const type = convStringType(params.type);

  // 현재 사용자 정보
  const userId = currentUser();

  // 서버 통신으로 게시글 정보 가져오기
  const [data, setData] = useState<dataType>(null!);
  const getDetailMessage = () => {
    getMesssage(type, {postId: messageId, userId})
      .then((res: any) => {
        if (res.message === 'SUCCESS') {
          setData(() => res.data);
        } else {
          // 실패했을 경우 404로 이동
          navigate(notFound());
        }
      })
      .catch((error: any) => navigate(notFound()));
  };

  // 현재 사용자가 작성한 게시글인지 확인
  const isMine = () => data?.userId === userId;

  // 전달 받은 messageId가 숫자가 아니라면 notfound로 이동
  useEffect(() => {
    if (messageId === -1) {
      navigate(notFound());
    } else if (type) {
      getDetailMessage();
    }
  }, []);

  // 비공개 글일 때 작성자가 자신이 아니면 404 페이지로 이동
  useEffect(() => {
    if (!isMine() && data?.status) {
      navigate(notFound());
    }
  }, [data]);

  // 메뉴 표시 여부
  const [more, setMore] = useState(false);

  const hiddenMenu = () => {
    if (more) setMore(false);
  };

  const showMenu = () => setMore(!more);

  // 공개 여부 변경
  const [newStatus, setNewStatus] = useState(data?.status);
  useEffect(() => {
    setNewStatus(() => data?.status);
  }, [data]);

  const dayType = data?.dayType;

  return (
    <>
      {data ? (
        <MessageDetailScreen
          first={dayTypeColors[dayType][0]}
          second={dayTypeColors[dayType][1]}
          third={dayTypeColors[dayType][2]}
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
                close={hiddenMenu}
                data={data}
                status={newStatus}
                setStatus={setNewStatus}
              />
            </section>
            <section className="container">
              <Content data={data} status={newStatus} />
              <Like data={data} type={type} userId={userId} />
            </section>
          </main>
        </MessageDetailScreen>
      ) : null}
    </>
  );
}

interface BackgroundColorProps {
  first: string;
  second: string;
  third: string;
}

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const MessageDetailScreen = styled.div`
  background: linear-gradient(
    -45deg,
    ${(props: BackgroundColorProps) =>
      ` #${props.first}, #${props.second}, #${props.third}`}
  );
  background-size: 400% 400%;
  animation: ${gradient} 7s ease infinite;

  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export default MessageDetail;
