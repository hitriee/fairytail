// ** 공통으로 사용할 함수

// ios 판별
export const iOS = () => {
  const ua = navigator.userAgent.toLowerCase();
  return (
    ua.includes('ios') ||
    ua.includes('iphone') ||
    ua.includes('ipad') ||
    ua.includes('like mac os x')
  );
};

// boolean 값 반환
export const returnTrue = () => true;
export const returnFalse = () => false;

// 모달에 필요한 유형
export interface popUp {
  title: string;
  message: string;
}

// 현재 사용자 id를 int로 변경 (없거나 유효하지 않은 형식이면 -1 반환)
export const currentUser = () => {
  const userId = localStorage.getItem('userId');
  if (userId && parseInt(userId)) {
    return parseInt(userId);
  } else {
    return -1;
  }
};

// 현재 메시지 id를 int로 변경 (없거나 유효하지 않은 형식이면 -1 반환)
export const intMessageId = (messageId: string | undefined) => {
  if (messageId && parseInt(messageId)) {
    return parseInt(messageId);
  } else {
    return -1;
  }
};

// type을 string으로 변환
export const convStringType = (type: string | undefined) => {
  if (type) {
    return type;
  } else {
    return '';
  }
};

// 현재 type이 text인지 판별
export const isText = (type: string | undefined) => {
  return type === 'text';
};
