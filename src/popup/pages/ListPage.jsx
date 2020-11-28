import React from "react";
import PropTypes from "prop-types";
import { useStorage } from "../hooks";
import { DomainInputBar } from "../components/input";
import { List } from "../components/list";
import styled from "styled-components";
import DomainContext from "../context/DomainContext";

function ListPage({ storageKey, isListAutoSorted }) {
  const [domainList, setDomainList] = useStorage(storageKey, []);

  return (
    <DomainContext.Provider
      value={[domainList, setDomainList, isListAutoSorted]}
    >
      <Page>
        <DomainInputBar />
        <List isListAutoSorted={isListAutoSorted} />
      </Page>
    </DomainContext.Provider>
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
