import styled from "styled-components";
import BottomMenu from "../../components/BottomMenu";
import BackHeader from "../../components/BackHeader";
import { px2vw } from "../../Util/px2vw";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMeditation } from "../../Api/Admin";
import { meditation } from "../../Type";

const MeditationContainer = styled.div`
  height: 100vh;
  position: relative;
  overflow: hidden;

  .meditation-wrap {
    overflow: scroll;
    height: 89%;
    &::-webkit-scrollbar {
      display: none;
    }
    .meditation-item {
      padding: ${px2vw(25)};
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ababab;
      > div {
        > p {
          font: 600 20px "Pretendard";
          &:last-of-type {
            font-size: 15px;
            color: #427d4f;
            margin-top: ${px2vw(5)};
          }
        }
      }
    }
  }
  @media screen and (max-width: 375px) {
    .meditation-wrap {
      height: 84%;
    }
  }
`;

const Meditation = () => {
  const navigate = useNavigate();

  // 묵상리스트 조회 ----- 무한 스크롤 구현해야함
  const { data: meditation } = useQuery({
    queryKey: ["meditation"],
    queryFn: () => getMeditation(1),
  });

  return (
    <MeditationContainer>
      <BackHeader backHandle={false} title="묵상" />
      <div className="meditation-wrap">
        {meditation?.data.meditationList.map((value: meditation) => {
          return (
            <div
              key={value.id}
              onClick={() => navigate(`/meditation/${value.id}`)}
              className="meditation-item"
            >
              <div>
                <p>{value.createDate}</p>
                <p>{value.word}</p>
              </div>
              <img src="/assets/right_arrow.png" alt="" />
            </div>
          );
        })}
      </div>
      <BottomMenu />
    </MeditationContainer>
  );
};

export default Meditation;
