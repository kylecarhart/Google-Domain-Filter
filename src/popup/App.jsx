import React, { useState } from 'react';
import styled from 'styled-components';
import { NavBar } from './components/nav';
import { FilterListPage, PreferenceListPage } from './pages';

export default function App() {
  const [selected, setSelected] = useState('filterList');

  const currentPage = () => {
    switch (selected) {
      case 'filterList':
        return <FilterListPage />;
      case 'preferenceList':
        return <PreferenceListPage />;
      default:
        break;
    }
  };

  return (
    <>
      <NavBar selected={selected} setSelected={setSelected} />
      <Main>{currentPage()}</Main>
    </>
  );
}

const Main = styled.main`
  padding: 24px;
`;
