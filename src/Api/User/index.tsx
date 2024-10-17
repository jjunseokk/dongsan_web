import AxiosInstance from "../../AxiosInstance";
import { login, signUp } from "../../Type";

// 유저 목록
const getUserList = () => {
  return AxiosInstance.get(`/users/getProfile`);
};

// 유저 상세 목록
const getUserDetail = (id: string | undefined) => {
  return AxiosInstance.get(`/users/getDetailProfile?id=${id}`);
};

// 로그인
const showLogin = (data: login) => {
  return AxiosInstance.post(`/users/login`, data, {
    withCredentials: true,
  });
};

// 회원가입
const showSignUp = (data: signUp) => {
  return AxiosInstance.post(`/users/create`, data);
};

export { getUserList, getUserDetail, showLogin, showSignUp };
