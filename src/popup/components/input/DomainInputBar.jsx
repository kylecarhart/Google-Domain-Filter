import React from 'react';
import PropTypes from 'prop-types';
import { DomainInput } from '.';
import styled from 'styled-components';
import InputSettingsDropdown from './InputSettingsDropdown';

function DomainInputBar() {
  return (
    <StyledDomainInputBar>
      <StyledDomainInput />
      <InputSettingsDropdown />
    </StyledDomainInputBar>
  );
}

DomainInputBar.propTypes = {
  addDomain: PropTypes.func.isRequired,
};

const StyledDomainInputBar = styled.div`
  display: flex;
`;

const StyledDomainInput = styled(DomainInput)`
  flex: 1;
`;

export default DomainInputBar;
