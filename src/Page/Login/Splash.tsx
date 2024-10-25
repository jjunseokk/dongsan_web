import styled from "styled-components";
import { px2vw } from "../../Util/px2vw";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const SplashContainer = styled.div`
  text-align: center;
  position: relative;
  height: 100vh;
  overflow: hidden;

  > .login-logo {
    width: ${px2vw(323)};
    margin-top: ${px2vw(171)};
  }
  > .login-slogan {
    color: #979797;
    font: 400 20px "Pretendard";
    margin-top: ${px2vw(90)};
  }
  .login-btn-area {
    margin-top: ${px2vw(251)};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    > button {
      width: ${px2vw(323)};
      height: ${px2vw(50)};
      border: 1px solid #427d4f;
      font: 600 20px "Pretendard";
      color: #427d4f;
      background: #ffffffc9;
      cursor: pointer;
      &:last-of-type {
        margin-top: ${px2vw(10)};
      }
    }
  }
  .login-bg {
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: -1;
  }

  @media screen and (min-width: 430px) {
    width: 430px;
  }

  @media screen and (max-width: 375px) {
    > .login-logo {
      margin-top: ${px2vw(120)};
    }
  }
`;

const Splash = () => {
  const navigate = useNavigate();
  // 쿠키에 저장되어있는 token값 가져오기
  const [cookie] = useCookies(["login"]);

  // token이 존재한다면 자동로그인
  useEffect(() => {
    if (cookie.login) {
      navigate("/main");
    }
  }, []);

  return (
    <SplashContainer>
      <img className="login-logo" src="/assets/login-logo.png" alt="" />
      <p className="login-slogan">
        하나님의 나라를 이루는 교회
        <br />
        하나님의 뜻에 순종하는 성도
      </p>
      <div className="login-btn-area">
        <button onClick={() => navigate("/login")}>로그인</button>
        <button onClick={() => navigate("/signUp")}>회원가입</button>
      </div>
      <img className="login-bg" src="/assets/login-bg.png" alt="" />
    </SplashContainer>
  );
};

export default Splash;
