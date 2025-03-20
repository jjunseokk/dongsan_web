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
    phoneNumber?: string;
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

// 댓글 삭제 타입
export interface deleteCommentsType {
    id: number;
    meditationId: number;
}

// 댓글 삭제 state 타입
export type DeletePopupState = {
    id: number | null;
    isOpen: boolean;
};

// 공지사항 타입
export interface noticeType {
    context: string;
    createDate: string;
    id: number;
    title: string;
}

// 공지사항 작성 타입
export interface createNoticeType {
    title: string;
    context: string;
}

// 공지사항 수정 타입
export interface editNoticeType {
    id: number;
    title: string;
    context: string;
}

// 좋아요 타입
export interface showHeartType {
    meditationId: number;
    token: string;
}

// FAQ 타입
export interface faqOptionType {
    id: number;
    value: string;
    name: string;
}

// FAQ 작성 타입
export interface createFaqType {
    title: string;
    context: string;
    type: string;
}

// FAQ 수정 타입
export interface editFaqType {
    id: number;
    title: string;
    context: string;
    type: string;
}

// FAQ 타입
export interface faqType {
    context: string;
    createDate: string;
    id: number;
    title: string;
    type: string;
}

// 유저 회원 탈퇴 아이디
export interface secessionType {
    userId: string;
}

// 어드민 로그인 타입
export interface adminLoginType {
    userId: string;
    password: string;
}

// 커뮤니티 추가 타입
export interface addCommunityType {
    title: string;
    content: string;
    anonymity: boolean;
}

export interface communityHeartType {
    heartId: number;
    heart: number;
    userId: string;
    communityId: number;
}

// 커뮤니티 조회
export interface getCommunityType {
    id: number;
    title: string;
    content: string;
    writer: string;
    createDate: string;
    anonymity: boolean | number;
    nickname: string | null;
    communityHeart: communityHeartType;
}
