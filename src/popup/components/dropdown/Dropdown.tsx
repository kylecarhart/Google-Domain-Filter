import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../button/Button';

function Dropdown({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  console.log(ref);

  return (
    <DropdownContainer>
      <Button
        primary={false}
        onClick={() => {
          setIsOpen(!isOpen);
        }}>
        Settings
      </Button>
      <DropdownList ref={ref} hidden={!isOpen}>
        {children}
      </DropdownList>
    </DropdownContainer>
  );
}

Dropdown.propTypes = {
  children: PropTypes.any,
};

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownList = styled.ul`
  margin: 0;
  padding: 0;
  box-shadow: 0rem 0.0625rem 1.25rem rgba(0, 0, 0, 0.1),
    0rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.06);
  display: inline-block;
  visibility: ${(props) => (props.hidden ? 'hidden' : '')};
  position: absolute;
`;

export default Dropdown;
