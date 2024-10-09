import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import px2vwPc from "../../Util/px2vwPc";

const AdminContainer = styled.div`
  background: #f8f8f8;
  display: flex;
  gap: ${px2vwPc(20)};
  .admin-menu {
    width: ${px2vwPc(350)};
    height: 100vh;
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    > .admin-logo {
      height: ${px2vwPc(150)};
      border-bottom: 1px solid #707070;
      display: flex;
      justify-content: center;
      align-items: center;
      > img {
        width: 90%;
      }
    }
    .menu-unit {
      padding: ${px2vwPc(20)} ${px2vwPc(25)};
      margin-top: ${px2vwPc(50)};

      > p {
        font: 500 16px "Pretendard";
        color: #151515;
        margin: ${px2vwPc(13)} 0px;
        cursor: pointer;
      }
      .title {
        font: 400 14px "Pretendard";
        color: #707070;
        border-bottom: 1px solid #707070;
        margin-top: ${px2vwPc(60)};
        &:first-of-type {
          margin-top: 0px;
        }
      }
    }
  }
  .admin-body {
    width: ${px2vwPc(1500)};
    height: 98vh;
  }
`;

const Admin = () => {
  const navigate = useNavigate();
  return (
    <AdminContainer>
      <div className="admin-menu">
        <div className="admin-logo">
          <img src="/assets/login-logo.png" alt="" />
        </div>
        <div className="menu-unit">
          <p className="title">묵상 관리</p>
          <p onClick={() => navigate("/dongsan/admin/meditation")}>
            묵상 추가/수정/삭제
          </p>
          <p className="title">성도 관리</p>
          <p onClick={() => navigate("/dongsan/admin/userList/approve")}>
            가입 승인
          </p>
          <p onClick={() => navigate("/dongsan/admin/userList")}>성도</p>
          <p className="title">대시보드</p>
          <p>문의 내역</p>
          <p onClick={() => navigate("/dongsan/admin/notice")}>공지사항</p>
        </div>
      </div>
      <div className="admin-body">
        <Outlet />
      </div>
    </AdminContainer>
  );
};

export default Admin;
