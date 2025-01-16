import AxiosInstance from "../../AxiosInstance";
import {
  createNoticeType,
  editNoticeType,
  postMeditation,
  updateApprove,
} from "../../Type";

// 묵상리스트 조회
const getMeditation = (page: number) => {
  return AxiosInstance.get(`/admin/meditation?page=${page}`);
};

// 묵상상세조회
const getMeditationDetail = (meditationId: undefined | number) => {
  return AxiosInstance.get(`admin/MeditationDetail?id=${meditationId}`);
};

// 묵상리스트 추가
const createMeditation = (data: postMeditation) => {
  return AxiosInstance.post(`/admin/meditation`, data);
};

// 묵상리스트 수정
const editMeditation = (data: postMeditation, id: number) => {
  return AxiosInstance.patch(`/admin/editMeditation?id=${id}`, data);
};

// 묵상리스트 삭제
const deleteMeditation = (meditationIds: number[]) => {
  return AxiosInstance.delete(`/admin/meditation`, { data: meditationIds });
};

// 가입 승인
const showApprove = (data: updateApprove) => {
  return AxiosInstance.patch(`/admin/approve`, data);
};

// 유저 목록
const getUserList = (page: number) => {
  return AxiosInstance.get(`/admin/getProfile?page=${page}`);
};

// 유저 상세 목록
const getUserDetail = (userId: string | undefined) => {
  return AxiosInstance.get(`/admin/getDetailProfile?id=${userId}`);
};

// 공지사항 조회
const getNotice = (page: number) => {
  return AxiosInstance.get(`/admin/notice?page=${page}`);
};

// 공지사항 상세 조회
const getDetailNotice = (noticeId: number) => {
  return AxiosInstance.get(`/admin/noticeDetail?id=${noticeId}`);
};

// 공지사항 작성
const createNotice = (data: createNoticeType) => {
  return AxiosInstance.post(`/admin/notice`, data);
};

// 공지사항 삭제
const deleteNotice = (noticeId: number) => {
  return AxiosInstance.delete(`/admin/notice?id=${noticeId}`);
};

// 공지사항 수정
const editNotice = (data: editNoticeType) => {
  return AxiosInstance.patch(`/admin/notice?`, data);
};

// FAQ 조회
const getFaq = (page: number) => {
  return AxiosInstance.get(`/admin/faq?page=${page}`);
};

// FAQ 상세 조회
const getDetailFaq = (noticeId: number) => {
  return AxiosInstance.get(`/admin/faqDetail?id=${noticeId}`);
};

// FAQ 작성
const createFaq = (data: createNoticeType) => {
  return AxiosInstance.post(`/admin/faq`, data);
};

// FAQ 삭제
const deleteFaq = (faqId: number) => {
  return AxiosInstance.delete(`/admin/faq?id=${faqId}`);
};

// FAQ 수정
const editFaq = (data: editNoticeType) => {
  return AxiosInstance.patch(`/admin/faq?`, data);
};

// FAQ 타입
const getFaqType = () => {
  return AxiosInstance.get(`/admin/fagType`);
};

export {
  getMeditation,
  createMeditation,
  deleteMeditation,
  getMeditationDetail,
  editMeditation,
  showApprove,
  getUserList,
  getUserDetail,
  getNotice,
  getDetailNotice,
  createNotice,
  deleteNotice,
  editNotice,
  createFaq,
  getFaq,
  deleteFaq,
  editFaq,
  getDetailFaq,
  getFaqType,
};
