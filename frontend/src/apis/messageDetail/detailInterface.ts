// text
export interface likeRequest {
  isLike: boolean;
  postId: number;
  userId: number;
}
export interface reportRequest {
  content: string;
  postId: number;
  type: number;
  userId: number;
}

export interface statusRequest {
  postId: number;
  status: number;
}
export interface detailResponse {
  data: {
    postId: number;
    type: number;
    title: string;
    userId: number;
    emojiNo: number;
    content: string;
    likeCnt: number;
    isLike: boolean;
    date: string;
    dayType: number;
  };
  message: string;
}

export interface messageType {
  (type: string, postId: number): any;
}
export interface likeMessageType {
  (type: string, data: likeRequest): any;
}
export interface changeMessageStatusType {
  (type: string, data: statusRequest): any;
}
export interface reportMessageType {
  (type: string, data: reportRequest): any;
}
