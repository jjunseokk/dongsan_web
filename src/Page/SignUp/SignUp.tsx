import { useState } from "react";
import styled from "styled-components";
import BackHeader from "../../components/BackHeader";
import Input from "../../components/Input";
import { px2vw } from "../../Util/px2vw";
import SignButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { PopupContainer } from "../Login";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../Type";
import { showSignUp } from "../../Api/User";

const SignUpContainer = styled.div`
  .signUp-input {
    margin-top: ${px2vw(50)};
    padding: 0px ${px2vw(25)};
    > div {
      margin-top: ${px2vw(15)};
      &:first-of-type {
        margin-top: 0px;
      }
    }
    .caption-input {
      > p {
        font-size: 10px;
        font-weight: 500;
        margin-top: ${px2vw(5)};
      }
      .warning {
        color: #ff1919;
      }
      .guide {
        color: #427d4f;
      }
    }
  }
  .signUp-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: ${px2vw(30)};
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [pastor, setPastor] = useState<string>("");
  const [successSignUp, setSuccessSignUp] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");

  const signUpMutation = useMutation({
    mutationKey: ["signUp"],
    mutationFn: (data: signUp) => showSignUp(data),
    onSuccess: (res) => {
      if (res.status === 200) {
        setSuccessSignUp(true);
      }
    },
    onError: (err: any) => {
      setWarning(err.response.data.Error);
    },
  });

  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

  const canRegister =
    userId &&
    userName &&
    userPassword &&
    userPassword === checkPassword &&
    userPhone &&
    pastor === "임도한";

  const handleSingUp = () => {
    signUpMutation.mutate({
      userId,
      name: userName,
      password: userPassword,
      phoneNumber: userPhone,
      pastor: pastor,
    });
  };

  return (
    <SignUpContainer>
      <BackHeader title="회원가입" />
      <div className="signUp-input">
        <div className="caption-input">
          <Input
            title="아이디"
            placeholder="아이디를 입력해주세요."
            setValue={setUserId}
            value={userId}
          />
          {warning ? <p className="warning">{warning}</p> : null}
        </div>

        <Input
          title="이름"
          placeholder="홍길동"
          setValue={setUserName}
          value={userName}
        />
        <div className="caption-input">
          <Input
            title="비밀번호"
            placeholder="비밀번호"
            setValue={setUserPassword}
            value={userPassword}
            type="password"
          />
          {regex.test(userPassword) ? null : (
            <p className="warning">
              영문, 숫자, 특수문자 조합으로 8글자 이상 16자 이하로 입력하세요.
            </p>
          )}
        </div>
        <div className="caption-input">
          <Input
            title="비밀번호 확인"
            placeholder="비밀번호 확인"
            setValue={setCheckPassword}
            value={checkPassword}
            type="password"
          />
          {userPassword === checkPassword ? null : (
            <p className="warning">비밀번호가 일치하지 않습니다.</p>
          )}
        </div>

        <Input
          title="전화번호"
          placeholder="010-0000-0000"
          setValue={setUserPhone}
          value={userPhone}
          type="tel"
        />
        <div className="caption-input">
          <Input
            title="목사님 성함"
            placeholder="목사님 성함을 입력해주세요."
            setValue={setPastor}
            value={pastor}
          />
          <p className="guide">
            목사님 성함 입력은 “광주동산교회” 성도임을 확인하기 위해서 입니다.
          </p>
        </div>
      </div>
      <div className="signUp-btn">
        <SignButton
          context="회원가입 하기"
          color="#427D4F"
          borderColor="#427D4F"
          onClick={handleSingUp}
          disabled={!canRegister}
        />
        <SignButton
          context="불편사항 문의하기"
          color="#151515"
          borderColor="none"
          onClick={() => console.log("ss")}
        />
      </div>
      {successSignUp ? (
        <PopupContainer>
          <p>회원가입이 신청이 완료되었습니다.<br/> 가입승인 후 로그인이 가능합니다.</p>
          <SignButton
            context="확인"
            color="#427D4F"
            borderColor="#427D4F"
            onClick={() => navigate("/")}
          />
        </PopupContainer>
      ) : null}
    </SignUpContainer>
  );
};

export default SignUp;
