import AxiosInstance from "../../AxiosInstance";

// 유저 목록
const getUserList = () => {
  return AxiosInstance.get(`/users/getProfile`);
};

// 유저 상세 목록
const getUserDetail = (id: string | undefined) => {
  return AxiosInstance.get(`/users/getDetailProfile?id=${id}`);
};

export { getUserList, getUserDetail };
