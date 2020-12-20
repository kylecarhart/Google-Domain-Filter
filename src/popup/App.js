import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import {
  FilterListPage,
  PreferenceListPage,
} from "./components/DomainListPage";
import { FILTER_LIST_NAV, PREFERENCE_LIST_NAV } from "./constants";

export default function App() {
  const [selected, setSelected] = useState(FILTER_LIST_NAV);

  const currentPage = () => {
    switch (selected) {
      case FILTER_LIST_NAV:
        return <FilterListPage />;
      case PREFERENCE_LIST_NAV:
        return <PreferenceListPage />;
      default:
        break;
    }
  };

  return (
    <AppWrapper>
      <Navbar selected={selected} setSelected={setSelected} />
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
