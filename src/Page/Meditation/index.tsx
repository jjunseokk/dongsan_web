import styled from "styled-components";
import BottomMenu from "../../components/BottomMenu";
import BackHeader from "../../components/BackHeader";
import { px2vw } from "../../Util/px2vw";
import { useNavigate } from "react-router-dom";

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
  return (
    <MeditationContainer>
      <BackHeader backHandle={false} title="묵상" />
      <div className="meditation-wrap">
        <div
          onClick={() => navigate("/meditation/1")}
          className="meditation-item"
        >
          <div>
            <p>2024.10.05</p>
            <p>잠언 1장 2절</p>
          </div>
          <img src="/assets/right_arrow.png" alt="" />
        </div>
        <div
          onClick={() => navigate("/meditation/1")}
          className="meditation-item"
        >
          <div>
            <p>2024.10.05</p>
            <p>잠언 1장 2절</p>
          </div>
          <img src="/assets/right_arrow.png" alt="" />
        </div>
        <div
          onClick={() => navigate("/meditation/1")}
          className="meditation-item"
        >
          <div>
            <p>2024.10.05</p>
            <p>잠언 1장 2절</p>
          </div>
          <img src="/assets/right_arrow.png" alt="" />
        </div>
        <div
          onClick={() => navigate("/meditation/1")}
          className="meditation-item"
        >
          <div>
            <p>2024.10.05</p>
            <p>잠언 1장 2절</p>
          </div>
          <img src="/assets/right_arrow.png" alt="" />
        </div>
        <div
          onClick={() => navigate("/meditation/1")}
          className="meditation-item"
        >
          <div>
            <p>2024.10.05</p>
            <p>잠언 1장 2절</p>
          </div>
          <img src="/assets/right_arrow.png" alt="" />
        </div>
        <div
          onClick={() => navigate("/meditation/1")}
          className="meditation-item"
        >
          <div>
            <p>2024.10.05</p>
            <p>잠언 1장 2절</p>
          </div>
          <img src="/assets/right_arrow.png" alt="" />
        </div>
        <div
          onClick={() => navigate("/meditation/1")}
          className="meditation-item"
        >
          <div>
            <p>2024.10.05</p>
            <p>잠언 1장 2절</p>
          </div>
          <img src="/assets/right_arrow.png" alt="" />
        </div>
        <div
          onClick={() => navigate("/meditation/1")}
          className="meditation-item"
        >
          <div>
            <p>2024.10.05</p>
            <p>잠언 1장 2절</p>
          </div>
          <img src="/assets/right_arrow.png" alt="" />
        </div>
        <div
          onClick={() => navigate("/meditation/1")}
          className="meditation-item"
        >
          <div>
            <p>2024.10.05</p>
            <p>잠언 1장 2절</p>
          </div>
          <img src="/assets/right_arrow.png" alt="" />
        </div>
      </div>
      <BottomMenu />
    </MeditationContainer>
  );
};

export default Meditation;
