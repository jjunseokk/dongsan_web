import { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input";
import BackHeader from "../../components/BackHeader";
import { px2vw } from "../../Util/px2vw";
import SignButton from "../../components/Button";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  > .login-wrap {
    padding: 0px ${px2vw(25)};
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
  const [userName, setUserName] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);

  const handleLogin = () => {
    setShowSuccessPopup(true);
  };
  return (
    <LoginContainer>
      <BackHeader title="로그인" />
      <div className="login-wrap">
        <Input
          title="이름"
          placeholder="홍길동"
          setValue={setUserName}
          value={userName}
        />
        <Input
          title="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요."
          setValue={setUserPw}
          value={userPw}
        />
        <div className="login-btn-area">
          <SignButton
            context="로그인하기"
            disabled={userName && userPw ? false : true}
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
