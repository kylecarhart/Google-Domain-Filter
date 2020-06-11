import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

interface Props {
  primary: boolean;
  children: any;
  onClick: Function;
}

function Button({ primary = true, children, onClick }) {
  return (
    <StyledButton
      primary={primary}
      onClick={() => {
        onClick();
      }}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  primary: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
};

const StyledButton = styled.button<Props>`
  font-size: 0.75rem;
  padding: 0.375rem 1rem;
  border: none;
  box-shadow: 0rem 0.0625rem 0.9375rem rgba(0, 0, 0, 0.05),
    0rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.1);
  border-radius: 0.125rem;
  background: #318bf5;
  background: ${(props) => (props.primary ? '#318bf5' : '#ffffff')};
  color: ${(props) => (props.primary ? '#ffffff' : '#616161')};
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.primary ? '#0767d8' : '#F6F6F6')};
  }
`;

export default Button;
