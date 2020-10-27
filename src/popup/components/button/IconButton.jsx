import React from 'react';
import styled from 'styled-components';

function IconButton({ children, ...props }, ref) {
  return (
    <Button ref={ref} {...props}>
      {children}
    </Button>
  );
}

const Button = styled.button`
  margin: 0;
  padding: 0 0.5em;
  border: 0;
  cursor: pointer;
  background: none;
  line-height: 0;
`;

export default React.forwardRef(IconButton);
