export const returnTrue = () => true;
export const returnFalse = () => false;
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
