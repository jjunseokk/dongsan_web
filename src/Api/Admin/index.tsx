import AxiosInstance from "../../AxiosInstance";
import { postMeditation, updateApprove } from "../../Type";

// 묵상리스트 조회
const getMeditation = () => {
  return AxiosInstance.get(`/admin/meditation`);
};

// 묵상상세조회
const getMeditationDetail = (id: number) => {
  return AxiosInstance.get(`admin/MeditationDetail?id=${id}`);
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
const deleteMeditation = (ids: number[]) => {
  return AxiosInstance.delete(`/admin/meditation`, { data: ids });
};

// 가입 승인
const showApprove = (data: updateApprove) => {
  return AxiosInstance.patch(`/admin/approve`, data);
};
export {
  getMeditation,
  createMeditation,
  deleteMeditation,
  getMeditationDetail,
  editMeditation,
  showApprove,
};
