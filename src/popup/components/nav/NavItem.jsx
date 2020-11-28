import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import NavTip from "./NavTip";

function NavItem({ text, navId, tipText, selected, setSelected }) {
  return (
    <Button
      selected={selected}
      onClick={() => {
        setSelected(navId);
      }}
    >
      <Text>{text}</Text>
      <NavTip text={tipText} />
    </Button>
  );
}

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  navId: PropTypes.string.isRequired,
  tipText: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  font-size: 1rem;
  padding: 0.75rem 0;
  cursor: pointer;
  border-radius: 0;
  border: none;
  background: ${(props) => (props.selected ? "#fff" : "#eee")};
  color: ${(props) => (props.selected ? "#318BF5" : "#333")};
  box-shadow: ${(props) =>
    props.selected
      ? "inset 0 -2px 0 0 #318BF5, 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);"
      : "inset 0px 0px 0px 1px #DBDBDB"};

  &:hover {
    background: ${(props) => (props.selected ? "" : "#f2f2f2")};
  }
`;

const Text = styled.span`
  margin-right: 0.5rem;
`;

export default NavItem;
