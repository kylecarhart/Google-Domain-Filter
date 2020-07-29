import React from 'react';
import styled from 'styled-components';
import useStorage from './hooks/useStorage';
import { NavBar } from './components/nav';
import { DomainInputBar } from './components/input';
import { List } from './components/list';
import validator from 'validator';

export default function App() {
  const [domains, setDomains] = useStorage('domains', []);

  const addDomain = (domain) => {
    if (!domains.includes(domain) && validator.isFQDN(domain)) {
      return setDomains([...domains, domain]);
    }
  };

  const deleteDomain = (domain) => {
    setDomains(domains.filter((_domain) => _domain !== domain));
  };

  const editDomain = (fromDomain, toDomain) => {
    setDomains(
      domains.map((domain) => {
        if (domain === fromDomain) {
          return toDomain;
        } else {
          return domain;
        }
      })
    );
  };

  return (
    <>
      <NavBar />
      <Main>
        <DomainInputBar addDomain={addDomain} />
        <List
          domains={domains}
          deleteDomain={deleteDomain}
          editDomain={editDomain}
        />
      </Main>
    </>
  );
}

const Main = styled.main`
  padding: 24px;
`;
