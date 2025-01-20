import AxiosInstance from "../../AxiosInstance";
import {
  comments,
  deleteCommentsType,
  editCommentsType,
  showHeartType,
} from "../../Type";

// 오늘의 묵상
const getTodayMeditation = (date: string) => {
  return AxiosInstance.get(`/client/todayMeditation?date=${date}`);
};

// 댓글 기능
const writeComment = (data: comments) => {
  return AxiosInstance.post(`/client/comments`, data, {
    headers: {
      Authorization: data.token,
    },
  });
};

// 댓글 조회
const getComments = (commentId: number) => {
  return AxiosInstance.get(`/client/comments?id=${commentId}`);
};

// 댓글 수정
const editComments = (data: editCommentsType) => {
  return AxiosInstance.patch(`/client/editComments`, data);
};

// 댓글 삭제
const deleteComments = (data: deleteCommentsType) => {
  return AxiosInstance.delete(`/client/deleteComment`, { data });
};

// 프로필 사진 변경
const changeProfile = (data: any, token: string) => {
  return AxiosInstance.patch(`/client/profileThumbnail`, data, {
    headers: {
      Authorization: token,
    },
  });
};

// 좋아요
const showHeart = (data: showHeartType) => {
  return AxiosInstance.post(
    `/client/heart`,
    { meditationId: data.meditationId },
    {
      headers: {
        Authorization: data.token,
      },
    }
  );
};

const showSecession = (userId: string) => {
  return AxiosInstance.delete(`client/secession`, { data: userId });
};

export {
  getTodayMeditation,
  writeComment,
  getComments,
  editComments,
  changeProfile,
  deleteComments,
  showHeart,
  showSecession,
};
