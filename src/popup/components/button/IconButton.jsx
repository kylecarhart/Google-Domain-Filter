import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function IconButton({ children, ...props }) {
  return <Button {...props}>{children}</Button>;
}

IconButton.propTypes = {
  children: PropTypes.any,
};

const Button = styled.button`
  margin: 0;
  padding: 0 0.5em;
  border: 0;
  cursor: pointer;
  background: none;
`;

export default IconButton;
