// text
export interface likeRequest {
  isLike: boolean;
  postId: number;
  userId: number;
}

export interface imgLikeRequest {
  writerId: number;
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

export interface textData {
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
  status: number;
}
export interface imgData {
  postId: number;
  type: number;
  title: string;
  url: string;
  userId: number;
  emojiNo: number;
  content: string;
  likeCnt: number;
  isLike: boolean;
  date: string;
  // dayType: number;
  status: number;
  lat: number;
  lng: number;
}
export interface textDetailResponse {
  data: textData;
  message: string;
}
export interface imgDetailResponse {
  data: imgData;
  message: string;
}

export interface messageType {
  (type: string, postId: number): any;
}
export interface messageImgType {
  (type: string, params: {postId: number; userId: number}): any;
}

export interface likeMessageType {
  (type: string, data: likeRequest | imgLikeRequest): any;
}
export interface changeMessageStatusType {
  (type: string, data: statusRequest): any;
}
export interface reportMessageType {
  (type: string, data: reportRequest): any;
}
