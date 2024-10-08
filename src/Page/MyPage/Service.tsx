import styled from "styled-components";
import BackHeader from "../../components/BackHeader";
import { px2vw } from "../../Util/px2vw";
import Input from "../../components/Input";
import { useState } from "react";
import Button from "../../components/Button";
import { PopupContainer } from "../Login";
import { useNavigate } from "react-router-dom";

const ServiceContainer = styled.div`
  .service-wrap {
    padding: 0px ${px2vw(25)};
    margin-top: ${px2vw(20)};
    .title {
      font: 700 20px "Pretendard";
    }
    .description {
      font: 500 13px/20px "Pretendard";
      color: #9c9c9c;
      margin-top: ${px2vw(10)};
    }
    .service-input {
      margin-top: ${px2vw(43)};
      > p {
        font: 600 15px "Pretendard";
        margin-top: ${px2vw(15)};
      }
      > textarea {
        width: 100%;
        height: ${px2vw(250)};
        resize: none;
        border: 1px solid #d9d9d9;
        padding: ${px2vw(11)} ${px2vw(12)};
        font: 600 15px "Pretendard";

        &::placeholder {
          color: #d9d9d9;
          font: 600 15px "Pretendard";
        }
        &:focus {
          outline: none;
        }
      }
    }
    .service-agree {
      margin-top: ${px2vw(10)};
      display: flex;
      align-items: center;
      gap: ${px2vw(5)};
      > input {
        width: ${px2vw(15)};
        height: ${px2vw(15)};
        border: none;
        accent-color: #427d4f;
      }
      > p {
        font: 500 15px "Pretendard";
        color: #949494;
      }
    }
    .service-submit-btn {
      margin-top: ${px2vw(28)};
    }
  }
`;

const Service = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [agree, setAgree] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const canRegister = email && context && agree;

  const handleSubmitAnswer = () => {
    setSuccess(true);
  };

  const handleCheckModal = () => {
    navigate("/myPage");
  };

  return (
    <ServiceContainer>
      {success ? (
        <PopupContainer>
          <p>문의가 완료되었습니다.</p>
          <Button
            color="#427d4f"
            borderColor="#427d4f"
            onClick={handleCheckModal}
            context="확인"
          />
        </PopupContainer>
      ) : null}
      <BackHeader title="불편사항을 물어보세요!" />
      <div className="service-wrap">
        <p className="title">불편을 드려 죄송합니다.</p>
        <p className="description">
          1~2일 내에 답변을 드리겠습니다.
          <br />
          혹시 시간이 지나도 답변이 오지 않았다면, 스팸 메일함을 확인해주세요.
          <br />
          보다 빠른 답변을 드리기 위해 노력하겠습니다.
        </p>
        <div className="service-input">
          <Input
            title="답변을 받으실 이메일"
            placeholder="example@naver.com"
            setValue={setEmail}
            value={email}
          />
          <p>문의사항</p>
          <textarea
            placeholder="문의사항을 입력해주세요."
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </div>
        <div className="service-agree">
          <input onChange={() => setAgree(!agree)} type="checkbox" />
          <p>(필수) 개인정보 수집 및 이용 동의</p>
        </div>
        <div className="service-submit-btn">
          <Button
            context="문의하기"
            color="#427d4f"
            borderColor="#427d4f"
            onClick={handleSubmitAnswer}
            disabled={canRegister ? false : true}
          />
        </div>
      </div>
    </ServiceContainer>
  );
};

export default Service;
