import styled from "styled-components";
import BottomMenu from "../../components/BottomMenu";
import BackHeader from "../../components/BackHeader";
import { px2vw } from "../../Util/px2vw";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const MyPageContainer = styled.div`
  .myPage-wrap {
    padding: 0px ${px2vw(25)};
    margin-top: ${px2vw(30)};
    .myPage-profile {
      display: flex;
      align-items: center;
      gap: ${px2vw(10)};
      .profile-img {
        width: ${px2vw(70)};
        height: ${px2vw(70)};
        border-radius: 50%;
        position: relative;
        background-color: #d9d9d9;
        > img {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
      .profile-info {
        > p {
          font: 600 20px "Pretendard";
          &:last-of-type {
            font: 400 14px "Pretendard";
            margin-top: ${px2vw(5)};
          }
        }
      }
    }
    .profile-info-edit {
      margin-top: ${px2vw(30)};
    }
    .myPage-menu {
      margin-top: ${px2vw(40)};
      .myPage-menu-item {
        padding: ${px2vw(13)} 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > p {
          font: 400 16px "Pretendard";
        }
        > img {
          width: ${px2vw(5)};
        }
      }
    }
  }
`;

const MyPage = () => {
  const navigate = useNavigate();
  return (
    <MyPageContainer>
      <BackHeader backHandle={false} title="마이페이지" />
      <div className="myPage-wrap">
        <div className="myPage-profile">
          <div className="profile-img">
          </div>
          <div className="profile-info">
            <p>박준석</p>
            <p>청년</p>
          </div>
        </div>
        <div className="profile-info-edit">
          <Button
            context="내 정보 수정"
            color="#427D4F"
            borderColor="#427D4F"
            onClick={() => navigate("/myPage/edit-password")}
          />
        </div>

        <div className="myPage-menu">
          <div
            onClick={() => navigate("/myPage/service")}
            className="myPage-menu-item"
          >
            <p>고객센터</p>
            <img src="/assets/right_arrow.png" alt="" />
          </div>
          <div
            onClick={() => navigate("/myPage/notice")}
            className="myPage-menu-item"
          >
            <p>공지사항</p>
            <img src="/assets/right_arrow.png" alt="" />
          </div>
        </div>
      </div>
      <BottomMenu />
    </MyPageContainer>
  );
};

export default MyPage;
