import AxiosInstance from "../../AxiosInstance";
import { comments, editCommentsType } from "../../Type";

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
const getComments = (id: number) => {
  return AxiosInstance.get(`/client/comments?id=${id}`);
};

// 댓글 수정
const editComments = (data: editCommentsType) => {
  return AxiosInstance.patch(`/client/editComments`, data);
};

export { getTodayMeditation, writeComment, getComments, editComments };
