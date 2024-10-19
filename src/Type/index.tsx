// 메디테이션 불러올 떄 타입
export interface meditation {
  id: number;
  title: string;
  word: string;
  thumbnail: string;
  music: string;
  createDate: string;
}

// 메디테이션 post 타입
export interface postMeditation {
  title: string;
  word: string;
  thumbnail: any;
  music: any;
}

// 메디테이션 삭제
export interface deleteMeditation {
  id: number[];
}

// 유저리스트 타입
export interface getUser {
  id: number;
  userId: string;
  name: string;
  password: string;
  phoneNumber: string;
  userApprove: boolean;
  createDate: string;
  thumbnail: null | string;
}

// 가입 승인 타입
export interface updateApprove {
  id: number;
  approve: boolean;
}

// 로그인 타입
export interface login {
  userId: string;
  password: string;
}

// 회원가입 타입
export interface signUp {
  userId: string;
  name: string;
  password: string;
  phoneNumber: string;
  pastor: string;
}

// 댓글 쓰기 타입
export interface comments {
  context: string;
  meditationId: number;
  token: string;
}

// 댓글 조회 타입
export interface getCommentsType {
  id: number;
  writer: string;
  context: string;
  meditationId: number;
  createDate: string;
  commentId: number;
  userId: string;
}

// 댓글 수정 타입
export interface editCommentsType {
  id: number;
  context: string;
  meditationId: number;
}

// 공지사항 타입
export interface noticeType {
  context: string;
  createDate: string;
  id: number;
  title: string;
}


