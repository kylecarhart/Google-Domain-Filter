import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <AppWrapper>
      <Navbar />
      <Page>
        <Outlet />
      </Page>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Page = styled.div`
  padding: 24px;
  flex: 1;
`;

export default App;
