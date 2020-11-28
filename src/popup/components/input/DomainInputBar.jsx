import React from "react";
import PropTypes from "prop-types";
import { DomainInput } from ".";
import styled from "styled-components";
import InputSettingsDropdown from "./InputSettingsDropdown";

function DomainInputBar({ domains, setDomains, isListAutoSorted, ...props }) {
  return (
    <StyledDomainInputBar {...props}>
      <StyledDomainInput
        domains={domains}
        setDomains={setDomains}
        isListAutoSorted={isListAutoSorted}
      />
      <InputSettingsDropdown />
    </StyledDomainInputBar>
  );
}

DomainInputBar.propTypes = {
  domains: PropTypes.arrayOf(PropTypes.string).isRequired,
  setDomains: PropTypes.func.isRequired,
  isListAutoSorted: PropTypes.bool.isRequired,
};

const StyledDomainInputBar = styled.div`
  display: flex;
`;

const StyledDomainInput = styled(DomainInput)`
  flex: 1;
`;

export default DomainInputBar;
