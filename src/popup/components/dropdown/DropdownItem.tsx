import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function DropdownItem({ children }) {
  return <StyledDropdownItem>{children}</StyledDropdownItem>;
}

DropdownItem.propTypes = {
  children: PropTypes.any,
};

const StyledDropdownItem = styled.li`
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
  background: #ffffff;
  color: #333333;
  cursor: pointer;
  list-style: none;

  &:hover {
    background: #318bf5;
    color: #ffffff;
  }
`;

export default DropdownItem;
