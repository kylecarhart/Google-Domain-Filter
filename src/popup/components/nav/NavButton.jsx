import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavTip from './NavTip';

function NavButton({ text, tipText, selected, onClick }) {
  return (
    <Button
      selected={selected}
      onClick={() => {
        onClick(text);
      }}>
      <Text>{text}</Text>
      <NavTip text={tipText} />
    </Button>
  );
}

NavButton.propTypes = {
  text: PropTypes.string.isRequired,
  tipText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  font-size: 0.875rem;
  padding: 0.75rem 0;
  cursor: pointer;
  border-radius: 0;
  border: none;
  outline: none;
  background: ${(props) => (props.selected ? '#fff' : '#eee')};
  color: ${(props) => (props.selected ? '#318BF5' : '#333')};
  box-shadow: ${(props) =>
    props.selected
      ? 'inset 0 -2px 0 0 #318BF5, 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);'
      : 'inset 0px 0px 0px 1px #DBDBDB'};
`;

const Text = styled.span`
  margin-right: 0.5rem;
`;

export default NavButton;
