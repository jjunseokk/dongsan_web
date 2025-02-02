import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import px2vwPc from "../../Util/px2vwPc";
import Button from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { showAdminLogin } from "../../Api/User";
import { useState } from "react";
import { adminLoginType } from "../../Type";
import { useCookies } from "react-cookie";

const AdminContainer = styled.div`
  background: #f8f8f8;
  display: flex;
  gap: ${px2vwPc(20)};

  .admin-login {
    width: 100%;
    height: 100%;
    background: #ffffff;
    position: absolute;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    > div {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: ${px2vwPc(40)};
      input {
        width: 200px;
        height: 30px;
        border: 1px solid #dddddd;
        border-radius: 5px;
        padding-left: ${px2vwPc(10)};
        &:last-of-type {
          margin-top: ${px2vwPc(10)};
        }
        &:focus {
          outline: none;
        }
      }
    }
    button {
      margin-top: ${px2vwPc(15)};
      cursor: pointer;
    }
  }
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
        width: 70%;
      }
    }
    .menu-unit {
      padding: ${px2vwPc(20)} ${px2vwPc(25)};
      margin-top: 20px;

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
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cookie, setCookie] = useCookies(["admin"]); // token 값

  const loginMutation = useMutation({
    mutationKey: ["adminLogin"],
    mutationFn: (data: adminLoginType) => showAdminLogin(data),
    onSuccess: (res) => {
      if (res.status === 200) {
        setCookie("admin", res?.data?.token);
        setPassword("");
        setUserId("");
      }
    },
  });

  const handleLogin = () => {
    loginMutation.mutate({
      userId,
      password,
    });
  };

  return (
    <AdminContainer>
      {!cookie.admin ? (
        <div className="admin-login">
          <img src="/assets/login-logo.png" alt="" />
          <div>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              type="text"
              placeholder="아이디"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="비밀번호"
            />
          </div>

          <Button
            color="#151515"
            context="로그인"
            borderColor="#427d4f"
            onClick={handleLogin}
            width={"200px"}
          />
        </div>
      ) : null}

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
          <p onClick={() => navigate("/dongsan/admin/inquiries")}>문의 내역</p>
          <p onClick={() => navigate("/dongsan/admin/notice")}>공지사항</p>
          <p onClick={() => navigate("/dongsan/admin/faq")}>FAQ</p>
        </div>
      </div>
      <div className="admin-body">
        <Outlet />
      </div>
    </AdminContainer>
  );
};

export default Admin;
