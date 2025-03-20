import AxiosInstance from "../../AxiosInstance";
import {
    addCommunityType,
    comments,
    deleteCommentsType,
    editCommentsType,
    secessionType,
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

// 회원탈퇴
const showSecession = (data: secessionType) => {
    return AxiosInstance.delete(`/client/secession`, { data });
};

// FAQ 조회
const getFaq = (page: number, type: string) => {
    return AxiosInstance.get(`/client/faq?page=${page}&type=${type}`);
};

// 커뮤티니 추가
const addCommunity = (data: addCommunityType, token: string) => {
    return AxiosInstance.post(`/client/community`, data, {
        headers: {
            Authorization: token,
        },
    });
};

// 커뮤티니 조회
const getCommunity = () => {
    return AxiosInstance.get(`/client/community`);
};

// 커뮤니티 상세 조회
const getCommunityDetail = (id: number) => {
    return AxiosInstance.get(`/client/community/detail?id=${id}`);
};

// 커뮤니티 삭제
const deleteCommunity = (id: number) => {
    return AxiosInstance.delete(`/client/community?id=${id}`);
};

// 커뮤니티 수정
const editCommunity = (content: string, id: number) => {
    return AxiosInstance.patch(`client/community?id=${id}`, { content });
};

// 커뮤니티 좋아요
const showCommunityHeart = (communityId: number, token: string) => {
    return AxiosInstance.post(
        `client/communityHeart`,
        { communityId },
        {
            headers: {
                Authorization: token,
            },
        }
    );
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
    getFaq,
    addCommunity,
    getCommunity,
    getCommunityDetail,
    deleteCommunity,
    editCommunity,
    showCommunityHeart,
};
