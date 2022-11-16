export interface item {
  id?: string;
  userId: number;
  postId: number;
  title: string;
  emojiNo: number;
  type: number;
}

// 알림 받을 때 초기값
export const initialItem = {
  userId: 0,
  postId: 0,
  title: '',
  emojiNo: 0,
  type: 0,
};
