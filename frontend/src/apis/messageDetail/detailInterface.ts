// ** 백과 통신할 때의 함수, 데이터 형식

// 텍스트 좋아요 요청 데이터 형식
// export interface likeRequest {
//   isLike: boolean;
//   postId: number;
//   userId: number;
// }

// 이미지 좋아요 요청 데이터 형식
export interface likeRequest {
  writerId: number;
  postId: number;
  userId: number;
}
// 신고 요청 데이터 형식
export interface reportRequest {
  content: string;
  postId: number;
  type: number;
  userId: number;
}

// 공개 여부 변경 데이터 형식
export interface statusRequest {
  postId: number;
  status: number;
}

// text 데이터의 data 응답 형식
// export interface textData {
//   postId: number;
//   type: number;
//   title: string;
//   userId: number;
//   emojiNo: number;
//   content: string;
//   likeCnt: number;
//   isLike: boolean;
//   date: string;
//   dayType: number;
//   status: number;
// }

// img 데이터의 data 응답 형식
export interface dataType {
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
  dayType: number;
  status: number;
  lat: number;
  lng: number;
}

// text 조회 시 응답 형식
// export interface textDetailResponse {
//   data: textData;
//   message: string;
// }

// img 조회 시 응답 형식
export interface detailResponse {
  data: dataType;
  message: string;
}

// text 조회 함수 유형
export interface messageType {
  (type: string, postId: number): any;
}

// img 조회 함수 유형
export interface messageImgType {
  (type: string, params: {postId: number; userId: number}): any;
}

// 좋아요 변경 함수 유형
export interface likeMessageType {
  (type: string, data: likeRequest): any;
}

// 공개 여부 변경 함수 유형
export interface changeMessageStatusType {
  (type: string, data: statusRequest): any;
}

// 신고 함수 유형
export interface reportMessageType {
  (type: string, data: reportRequest): any;
}
