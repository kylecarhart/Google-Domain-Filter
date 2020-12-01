import React, { useState } from "react";
import styled from "styled-components";
import { NavBar } from "./components/nav";
import {
  FilterListPage,
  PreferenceListPage,
} from "./components/DomainListPage";

export default function App() {
  const [selected, setSelected] = useState("filterList");

  const currentPage = () => {
    switch (selected) {
      case "filterList":
        return <FilterListPage />;
      case "preferenceList":
        return <PreferenceListPage />;
      default:
        break;
    }
  };

  return (
    <AppWrapper>
      <NavBar selected={selected} setSelected={setSelected} />
      <Page>{currentPage()}</Page>
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
