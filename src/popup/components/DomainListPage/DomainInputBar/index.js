import React from "react";
import PropTypes from "prop-types";
import DomainInput from "./DomainInput";
import styled from "styled-components";
import InputSettingsDropdown from "./InputSettingsDropdown";

function DomainInputBar({ domains, setDomains, ...props }) {
  return (
    <StyledDomainInputBar {...props}>
      <StyledDomainInput domains={domains} setDomains={setDomains} />
      {/* <InputSettingsDropdown /> */}
    </StyledDomainInputBar>
  );
}

DomainInputBar.propTypes = {
  domains: PropTypes.arrayOf(PropTypes.string).isRequired,
  setDomains: PropTypes.func.isRequired,
};

const StyledDomainInputBar = styled.div`
  display: flex;
`;

const StyledDomainInput = styled(DomainInput)`
  flex: 1;
`;

export default DomainInputBar;
