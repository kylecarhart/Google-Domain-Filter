import React from "react";
import PropTypes from "prop-types";
import DomainInputBar from "./DomainInputBar";
import DomainList from "./DomainList";
import styled from "styled-components";

function ListPage({ domains, setDomains }) {
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
  domains: PropTypes.arrayOf(PropTypes.string).isRequired,
  setDomains: PropTypes.func.isRequired,
};

export default ListPage;
