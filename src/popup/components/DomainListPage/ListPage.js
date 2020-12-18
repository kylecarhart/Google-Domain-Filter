import React from "react";
import PropTypes from "prop-types";
import { useStorage } from "../../hooks";
import DomainInputBar from "./DomainInputBar";
import DomainList from "./DomainList";
import styled from "styled-components";

function ListPage({ storageKey }) {
  const [domains, setDomains] = useStorage(storageKey, []);

  return (
    <Page>
      <DomainInputBar domains={domains} setDomains={setDomains} />
      {domains.length > 0 ? (
        <DomainList domains={domains} setDomains={setDomains} />
      ) : (
        <EmptyList>Add a domain to get started...</EmptyList>
      )}
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const EmptyList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 14px;
  padding: 0;
  margin: 8px 0px 0px 0px;
  border-radius: 3px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);
  flex: 1 1 auto;
  height: 0px;
`;

ListPage.propTypes = {
  storageKey: PropTypes.string.isRequired,
};

export default ListPage;
