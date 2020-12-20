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
      <DomainList domains={domains} setDomains={setDomains} />
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

ListPage.propTypes = {
  storageKey: PropTypes.string.isRequired,
};

export default ListPage;
