import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled from "styled-components";
import Login from "./Page/Login/Login";
import Splash from "./Page/Login/Splash";
import Home from "./Page/Home/Home";
import SignUp from "./Page/SignUp/SignUp";

const userSize = window.innerWidth;

interface AppContainerStyle {
  $width: number;
}

const AppContainer = styled.div<AppContainerStyle>`
  width: 430px;
  margin: 0 auto;
  @media screen and (max-width: 430px) {
    width: ${({ $width }) => $width}px;
  }
`;

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Splash />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/main",
      element: <Home />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
  ]);

  return (
    <AppContainer $width={userSize}>
      <RouterProvider router={router} />
    </AppContainer>
  );
}

export default App;
