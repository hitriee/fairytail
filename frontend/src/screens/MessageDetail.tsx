// ** 메시지 상세
import {useState, useRef, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router';
import styled, {keyframes} from 'styled-components';

import '@screens/MessageDetail.scss';
import Content from '@messageDetail/Content';
import Like from '@messageDetail/Like';
import MoreMenu from '@common/MoreMenu';
import MoveToBack from '@common/MoveToBack';
import '@screens/MessageDetail.scss';
import {intMessageId, convStringType} from '@/components/common/commonFunc';
import {currentUser} from '@common/commonFunc';
import {dataType} from '@apis/messageDetail/detailInterface';
import {ReactComponent as EllipsisVertical} from '@images/ellipsisVertical.svg';
import {notFound, intro} from '@apis/router';
import {getMesssage} from '@apis/messageDetail/detailFunc';

const dayTypeColors = [
  ['9794e9', '94bce9', 'eeaeca'],
  ['00bfff', '87cfeb', 'b5ffff'],
  ['44a0a2', '9ab96c', 'b9a16c'],
  ['b96cb6', 'b96c7a', 'a26e44'],
  ['02002b', '233c69', '001087'],
];

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
  const [data, setData] = useState<dataType>(null!);
  const getDetailMessage = () => {
    getMesssage(type, {postId: messageId, userId})
      .then((res: any) => {
        console.log(res);
        if (res.message === 'SUCCESS') {
          setData(() => res.data);
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
  const isMine = () => data?.userId === userId;

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
    if (!isMine() && data?.status) {
      navigate(notFound());
    }
  }, [data]);

  useEffect(() => {
    setNewStatus(() => data?.status);
  }, [data]);

  // useEffect(() => {

  //   if (isText(type)) {
  //     if (!isMine() && textData?.status) {
  //       navigate(notFound())
  //     } else {
  //       setTextData(() => textData)
  //     }
  //   } else {
  //     if (!isMine() && imgData?.status) {
  //       navigate(notFound())
  //     } else {
  //       setImgData(() => imgData)
  //     }
  //   }
  //   // if (!isMine() && (textData?.status || imgData?.status)) {
  //   //   navigate(notFound());
  //   // }
  //   // setData(() => data);
  //   // setNewStatus(data?.status);
  // }, [data]);

  // 메뉴 표시 여부
  const [more, setMore] = useState(false);

  const hiddenMenu = () => {
    if (more) setMore(false);
  };

  const showMenu = () => setMore(!more);

  // 공개 여부 변경 대비
  const [newStatus, setNewStatus] = useState(data?.status);
  // content에 들어갈 내용
  // const detailContent = () => {
  //   if (isText(type)) {
  //     return textData?.content;
  //   } else {
  //     return imgData?.url ? `https://${imgData?.url}` : '';
  //   }
  // };

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
                // content={data?.url || data?.content}
                close={hiddenMenu}
                data={data}
                // setData={setData}
                status={newStatus}
                setStatus={setNewStatus}
              />
            </section>
            <section className="container">
              <Content
                data={data}
                // title={textData?.title || imgData?.title || ''}
                // content={detailContent()}
                // type={data.type}
                // date={modifiedDate()}
                status={newStatus}
              />
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
    -30deg,
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
