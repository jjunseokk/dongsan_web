import { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input";
import BackHeader from "../../components/BackHeader";
import { px2vw } from "../../Util/px2vw";
import SignButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { showLogin } from "../../Api/User";
import { login } from "../../Type";
import { useCookies } from "react-cookie";

const LoginContainer = styled.div`
  > .login-wrap {
    padding: 0px ${px2vw(25)};
    .login-warning {
      color: #ff1919;
      margin-top: ${px2vw(5)};
      font: 400 12px "Prentendard";
    }
    > div {
      &:nth-of-type(1) {
        margin-top: ${px2vw(30)};
      }
      &:nth-of-type(2) {
        margin-top: ${px2vw(15)};
      }
    }
    .login-btn-area {
      margin-top: ${px2vw(30)};
    }
  }
`;

export const PopupContainer = styled.div`
  width: ${px2vw(351)};
  /* height: ${px2vw(179)}; */
  padding: ${px2vw(20)} ${px2vw(21)};
  border: none;
  box-shadow: 1px 1px 2px 1px #00000040;
  background: #ffffff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10;
  > p {
    font-size: 20;
    font-weight: 600;
  }
  > button {
    width: ${px2vw(309)};
    margin-top: ${px2vw(30)};
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUseId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [cookies, setCookie] = useCookies(["login"]);

  const canRegister = userId && userPw;

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: login) => showLogin(data),
    onSuccess: (res) => {
      if (res.status === 200) {
        setShowSuccessPopup(true);
        setCookie("login", res.data.token);
      }
    },
    onError: (err: any) => {
      setWarning(err.response.data.Error);
    },
  });

  const handleLogin = () => {
    loginMutation.mutate({
      userId,
      password: userPw, // login 타입에 맞춰 필드 이름 조정
    });
  };
  return (
    <LoginContainer>
      <BackHeader title="로그인" />
      <div className="login-wrap">
        <Input
          title="아이디"
          placeholder="아이디를 입력해주세요."
          setValue={setUseId}
          value={userId}
        />
        <Input
          title="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요."
          setValue={setUserPw}
          value={userPw}
        />
        <p className="login-warning">{warning}</p>
        <div className="login-btn-area">
          <SignButton
            context="로그인하기"
            disabled={!canRegister}
            color="#427D4F"
            onClick={handleLogin}
            borderColor="#427D4F"
          />
          <SignButton
            context="회원가입"
            color="#151515"
            onClick={() => navigate("/signUp")}
            borderColor="none"
          />
        </div>
      </div>
      {showSuccessPopup ? (
        <PopupContainer>
          <p>주님의 이름으로 축복합니다.</p>
          <SignButton
            context="확인"
            color="#427D4F"
            onClick={() => navigate("/main")}
            borderColor="#427D4F"
          />
        </PopupContainer>
      ) : null}
    </LoginContainer>
  );
};

export default Login;
