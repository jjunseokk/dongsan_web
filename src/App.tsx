import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Login from "./Page/Login";
import Splash from "./Page/Login/Splash";
import Home from "./Page/Home";
import SignUp from "./Page/SignUp/SignUp";
import Meditation from "./Page/Meditation";
import Story from "./Page/Story";
import MyPage from "./Page/MyPage";
import MeditationPlay from "./Page/Meditation/MeditationPlay";
import Service from "./Page/MyPage/Service";
import Notice from "./Page/MyPage/Notice";
import EditPw from "./Page/MyPage/EditUserInfo";
import Admin from "./Page/Admin";
import AdminNotice from "./Page/Admin/Dashboard/AdminNotice";
import AdminMeditation from "./Page/Admin/Dashboard/AdminMeditation";
import AdminUserList from "./Page/Admin/Dashboard/AdminUserList";
import AdminUserDetail from "./Page/Admin/Dashboard/AdminUserDetail";
import AdminUserApprove from "./Page/Admin/Dashboard/AdminUserApprove";

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
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/main" element={<Home />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/meditation/:id" element={<MeditationPlay />} />
          <Route path="/story" element={<Story />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/myPage/service" element={<Service />} />
          <Route path="/myPage/notice" element={<Notice />} />
          <Route path="/myPage/edit-password" element={<EditPw />} />
          <Route path="/dongsan/admin" element={<Admin />}>
            <Route path="notice" element={<AdminNotice />} />
            <Route path="meditation" element={<AdminMeditation />} />
            <Route path="userList" element={<AdminUserList />} />
            <Route path="userList/:id/detail" element={<AdminUserDetail />} />
            <Route path="userList/approve" element={<AdminUserApprove />} />
          </Route>

          <Route path="/*" element={<Splash />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
