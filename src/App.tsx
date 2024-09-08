import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Page/Home/Home";
import styled from "styled-components";

const userSize = window.innerWidth;

interface AppContainerStyle {
  $width: number;
}

const AppContainer = styled.div<AppContainerStyle>`
  width: 430px;
  border: 1px solid red;
  margin: 0 auto;

  @media screen and (max-width: 430px) {
    width: ${({ $width }) => $width}px;
  }
`;

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <AppContainer $width={userSize}>
      <RouterProvider router={router} />
    </AppContainer>
  );
}

export default App;
