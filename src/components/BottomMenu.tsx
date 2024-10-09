import styled from "styled-components";
import { px2vw } from "../Util/px2vw";
import { useLocation, useNavigate } from "react-router-dom";

const BottomMenuContainer = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: ${px2vw(50)};
  box-shadow: 0px -1px 5px 0px #00000040;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #ffffff;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    > p {
      font: 500 11px "Pretendard";
    }
  }
  > div.active {
    > p {
      color: #427d4f;
      font: 700 11px "Pretendard";
    }
  }
`;

const BottomMenu = () => {
  const navigate = useNavigate();
  const param = useLocation();
  const pathname = param.pathname;

  return (
    <BottomMenuContainer>
      <div
        className={pathname.includes("/main") ? "active" : ""}
        onClick={() => navigate("/main")}
      >
        <img
          src={
            pathname.includes("/main")
              ? "/assets/home_active.png"
              : "/assets/home.png"
          }
          alt="home"
        />
        <p>홈</p>
      </div>
      <div
        className={pathname.includes("/meditation") ? "active" : ""}
        onClick={() => navigate("/meditation")}
      >
        <img
          src={
            pathname.includes("/meditation")
              ? "/assets/meditation_active.png"
              : "/assets/meditation.png"
          }
          alt=""
        />
        <p>묵상</p>
      </div>
      <div
        className={pathname.includes("/story") ? "active" : ""}
        onClick={() => navigate("/story")}
      >
        <img
          src={
            pathname.includes("/story")
              ? "/assets/story_active.png"
              : "/assets/story.png"
          }
          alt="story"
        />
        <p>사연</p>
      </div>
      <div
        className={pathname.includes("/myPage") ? "active" : ""}
        onClick={() => navigate("/myPage")}
      >
        <img
          src={
            pathname.includes("myPage")
              ? "/assets/my_active.png"
              : "/assets/my.png"
          }
          alt=""
        />
        <p>마이</p>
      </div>
    </BottomMenuContainer>
  );
};

export default BottomMenu;
