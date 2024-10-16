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

export interface updateApprove {
  id: number;
  approve: boolean;
}
