import styled from "styled-components";
import { px2vw } from "../Util/px2vw";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as HomeImg } from "../../public/assets/home.svg";
import { ReactComponent as MeditationImg } from "../../public/assets/meditation.svg";
import { ReactComponent as StroyImg } from "../../public/assets/story.svg";
import { ReactComponent as MyImg } from "../../public/assets/my.svg";

const BottomMenuContainer = styled.div`
  position: fixed;
  bottom: 0px;
  width: ${px2vw(430)};
  margin: 0 auto;
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
    width: ${px2vw(100)};
    svg {
      width: ${px2vw(20)};
      height: ${px2vw(20)};
      margin-bottom: ${px2vw(5)};
    }
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
        <HomeImg fill={pathname.includes("/main") ? "#427D4F" : "#000000"} />
        <p>홈</p>
      </div>
      <div
        className={pathname.includes("/meditation") ? "active" : ""}
        onClick={() => navigate("/meditation")}
      >
        <MeditationImg
          fill={pathname.includes("/meditation") ? "#427D4F" : "#000000"}
        />
        <p>묵상</p>
      </div>
      <div
        className={pathname.includes("/community") ? "active" : ""}
        onClick={() => navigate("/community")}
      >
        <StroyImg fill={pathname.includes("/community") ? "#427D4F" : "#000000"} />
        <p>커뮤니티</p>
      </div>
      <div
        className={pathname.includes("/myPage") ? "active" : ""}
        onClick={() => navigate("/myPage/notice")}
      >
        <MyImg fill={pathname.includes("/myPage") ? "#427D4F" : "#000000"} />
        <p>공지사항</p>
      </div>
    </BottomMenuContainer>
  );
};

export default BottomMenu;
