import { useState } from "react";
import styled from "styled-components";
import { px2vw } from "../../Util/px2vw";
import BackHeader from "../../components/BackHeader";
import { useMutation } from "@tanstack/react-query";
import { showSecession } from "../../Api/Client";
import userProfileStore from "../../Store";

const WithdrawalContainer = styled.div`
  width: ${px2vw(430)};
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;
  .withdrawal-wrap {
    text-align: center;
    height: 94.5vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 6px; /* 스크롤바 너비 */
      display: none;
    }

    .emphasis {
      margin-top: ${px2vw(50)};
      font-size: 20px;
      font-weight: 700;
      color: #427d4f;
    }
    .content {
      margin-top: ${px2vw(15)};
      font-size: 15px;
      font-weight: 300;
      color: #151515;
    }
    .re-emphasis {
      color: #427d4f;
      font-size: 15px;
      font-weight: 300;
      margin-top: ${px2vw(10)};
    }
    .inquiries {
      width: ${px2vw(250)};
      height: ${px2vw(200)};
      border-radius: ${px2vw(10)};
      margin: 0 auto;
      background: #427d4f6c;
      padding: ${px2vw(30)};
      margin-top: ${px2vw(50)};

      > p {
        font-size: 14px;
        font-weight: 600;
        color: #151515;
        margin: ${px2vw(10)} 0;
      }
      > button {
        width: ${px2vw(100)};
        height: ${px2vw(30)};
        border-radius: ${px2vw(10)};
        border: none;
        background: #ffffff;
        margin-top: ${px2vw(20)};
        color: #151515;
        cursor: pointer;
      }
    }

    .withdrawal-bg {
      width: ${px2vw(300)};
      height: ${px2vw(300)};
      display: block;
      margin: 0 auto;
      margin-top: ${px2vw(10)};
    }

    .withdrawal {
      width: ${px2vw(430)};
      margin-top: ${px2vw(50)};
      .agree {
        width: 100%;
        height: ${px2vw(60)};
        background: #c8c8c8;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 15px;
        font-weight: 300;
        > input {
          width: ${px2vw(15)};
          height: ${px2vw(15)};
          accent-color: #427d4f;
        }
      }
      > button {
        width: 100%;
        height: ${px2vw(70)};
        text-align: center;
        border: none;
        color: #ffffff;
        background: #7a7a7a;
        font-size: 18px;
        font-weight: 700;
      }
      button.active {
        background: #427d4f;
      }
    }
  }
`;

const Withdrawal = () => {
  const [agree, setAgree] = useState<boolean>(false);
  const { profile } = userProfileStore();

  console.log(profile);

  const secessionMutation = useMutation({
    mutationKey: ["userSecession"],
    mutationFn: (userId: string) => showSecession(userId),
  });

  const handleSecession = () => {
    secessionMutation.mutate(profile?.userId);
  };
  return (
    <WithdrawalContainer>
      <BackHeader title="회원 탈퇴" />

      <div className="withdrawal-wrap">
        <p className="emphasis">탈퇴 전 꼭 확인해주세요.</p>
        <p className="content">
          탈퇴하기를 누르면 모든 개인정보가 즉시 삭제되며,
          <br /> 절대 복구할 수 없습니다.
        </p>

        <p className="re-emphasis">반드시 확인하시고 탈퇴 버튼을 눌러주세요.</p>

        <div className="inquiries">
          <p>다른 불편 사항이 있으신가요?</p>
          <p>불편사항이 있으시다면 적극적으로 개선하겠습니다.</p>
            <button
            onClick={() =>
              (window.location.href = "mailto:junsee0923@gmail.com?subject=불편 사항 접수&body=여기에 불편 사항을 작성해주세요.")
            }
            >
            불편 접수
            </button>
        </div>
        <img className="withdrawal-bg" src="/assets/tree.png" alt="" />
        <div className="withdrawal">
          <div onClick={() => setAgree(!agree)} className="agree">
            <p>모든 정보 삭제에 동의합니다.</p>
            <input
              type="checkbox"
              checked={agree || false}
              onChange={() => setAgree(!agree)}
            />
          </div>
          <button
            className={agree ? "active" : ""}
            disabled={agree ? false : true}
            onClick={handleSecession}
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </WithdrawalContainer>
  );
};

export default Withdrawal;
