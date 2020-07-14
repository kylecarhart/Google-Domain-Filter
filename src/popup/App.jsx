import React from 'react';
import { NavBar } from './components/nav';
import { DomainInputBar } from './components/input';
import styled from 'styled-components';

export default function App() {
  return (
    <>
      <NavBar />
      <Main>
        <DomainInputBar />
      </Main>
    </>
  );
}

const Main = styled.main`
  padding: 24px;
`;
