import React from "react";
import PropTypes from "prop-types";
import { useStorage } from "../../hooks";
import { DomainInputBar } from "../../components/DomainInput";
import DomainList from "../../components/DomainList";
import styled from "styled-components";

function ListPage({ storageKey, isListAutoSorted }) {
  const [domains, setDomains] = useStorage(storageKey, []);

  return (
    <Page>
      <DomainInputBar
        domains={domains}
        setDomains={setDomains}
        isListAutoSorted={isListAutoSorted}
      />
      <DomainList
        domains={domains}
        setDomains={setDomains}
        isListAutoSorted={isListAutoSorted}
      />
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
  isListAutoSorted: PropTypes.bool.isRequired,
};

export default ListPage;
