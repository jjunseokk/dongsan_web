import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Login from "./Page/Login";
import Splash from "./Page/Login/Splash";
import Home from "./Page/Home";
import SignUp from "./Page/SignUp";
import Meditation from "./Page/Meditation";
import Community from "./Page/Community";
import EditUserInfo from "./Page/MyPage";
import MeditationPlay from "./Page/Meditation/MeditationPlay";
import Notice from "./Page/MyPage/Notice";
import Admin from "./Page/Admin";
import AdminNotice from "./Page/Admin/Dashboard/AdminNotice";
import AdminMeditation from "./Page/Admin/Dashboard/AdminMeditation";
import AdminUserList from "./Page/Admin/Dashboard/AdminUserList";
import AdminUserDetail from "./Page/Admin/Dashboard/AdminUserDetail";
import AdminUserApprove from "./Page/Admin/Dashboard/AdminUserApprove";
import Inquiries from "./Page/Inquiries";
import AdminFaq from "./Page/Admin/Dashboard/AdminFaq";
import Withdrawal from "./Page/MyPage/Withdrawal";
import FaQ from "./Page/MyPage/FaQ";
import CommunityDetail from "./Page/Community/CommunityDetail";

const userSize = window.innerWidth;

interface AppContainerStyle {
  $width: number;
}

const AppContainer = styled.div<AppContainerStyle>`
  @media screen and (max-width: 768px) {
    width: 430px;
    margin: 0 auto;
  }
  @media screen and (max-width: 430px) {
    width: ${({ $width }) => $width}px;
  }
`;

function App() {
  return (
    <AppContainer $width={userSize}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/main" element={<Home />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/meditation/:id" element={<MeditationPlay />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id/detail" element={<CommunityDetail />} />
          <Route path="/myPage" element={<EditUserInfo />} />
          <Route path="/myPage/notice" element={<Notice />} />
          <Route path="/myPage/withdrawal" element={<Withdrawal />} />
          <Route path="/myPage/FaQ" element={<FaQ />} />
          <Route path="/dongsan/admin" element={<Admin />}>
            <Route index element={<Navigate to="meditation" />} />
            <Route path="notice" element={<AdminNotice />} />
            <Route path="meditation" element={<AdminMeditation />} />
            <Route path="userList" element={<AdminUserList />} />
            <Route path="userList/:id/detail" element={<AdminUserDetail />} />
            <Route path="userList/approve" element={<AdminUserApprove />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="faq" element={<AdminFaq />} />
          </Route>
          <Route path="/*" element={<Splash />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
