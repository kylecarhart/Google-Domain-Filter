import React from 'react';
import styled, { css } from 'styled-components';

function Button({ children, onClick, type = 'default', ...props }, ref) {
  return (
    <StyledButton ref={ref} onClick={onClick} type={type} {...props}>
      {children}
    </StyledButton>
  );
}

const primaryStyle = css`
  color: #fff;
  background: #318bf5;

  &:hover {
    background: #0f75ec;
  }
`;

const defaultStyle = css`
  color: #333;
  background: #fff;

  &:hover {
    background: #f0f0f0;
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 6px 16px;
  border-radius: 2px;
  font-size: 14px;
  margin-left: 8px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);

  ${({ type }) => (type === 'primary' ? primaryStyle : defaultStyle)}
`;

export default React.forwardRef(Button);
