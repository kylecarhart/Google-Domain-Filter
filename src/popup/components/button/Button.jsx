import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Button({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
};

const StyledButton = styled.button`
  cursor: pointer;
  color: white;
  border: none;
  outline: none;
  background: #318bf5;
  padding: 6px 16px;
  border-radius: 2px;
  font-size: 14px;
  margin-left: 8px;

  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #0f75ec;
  }
`;

export default Button;
