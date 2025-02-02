import AxiosInstance from "../../AxiosInstance";
import { adminLoginType, login, signUp } from "../../Type";

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

// 프로필 조회
const getProfile = (token: string) => {
  return AxiosInstance.get(`/users/getProfile`, {
    headers: {
      Authorization: token,
    },
  });
};

// 비밀번호 수정
const editPassword = (data: any) => {
  return AxiosInstance.post(`/users/editPassword`, { data });
};

// 어드민 로그인
const showAdminLogin = (data: adminLoginType) => {
  return AxiosInstance.post(`/users/adminLogin`, data);
};

export { showLogin,showAdminLogin, showSignUp, getProfile, editPassword };
