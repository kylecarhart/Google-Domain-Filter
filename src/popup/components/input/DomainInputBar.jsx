import React from 'react';
import PropTypes from 'prop-types';
import { DomainInput } from '.';
import styled from 'styled-components';
import { Button } from '../button';

function DomainInputBar({ addDomain }) {
  return (
    <StyledDomainInputBar>
      <StyledDomainInput addDomain={addDomain} />
      <Button
        onClick={() => {
          console.log('clicked');
        }}>
        Settings
      </Button>
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
