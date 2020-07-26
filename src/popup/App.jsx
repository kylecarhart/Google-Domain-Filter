import React from 'react';
import styled from 'styled-components';
import useStorage from './hooks/useStorage';
import { NavBar } from './components/nav';
import { DomainInputBar } from './components/input';
import { List } from './components/list';

export default function App() {
  const [domains, setDomains] = useStorage('domains', []);

  return (
    <>
      <NavBar />
      <Main>
        <DomainInputBar
          addDomain={(domain) => {
            if (!domains.includes(domain)) {
              setDomains([...domains, domain]);
            }
          }}
        />
        <List domains={domains} />
      </Main>
    </>
  );
}

const Main = styled.main`
  padding: 24px;
`;
