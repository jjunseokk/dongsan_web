import AxiosInstance from "../../AxiosInstance";
import { login, signUp } from "../../Type";

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

export { showLogin, showSignUp, getProfile };
